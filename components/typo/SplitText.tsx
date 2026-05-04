import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const DEFAULT_ACCENT_COLOR = "#00BBFF";
const ACCENT_TOKEN_REGEX = /\[\[accent:(.*?)\]\]/g;

const renderTextWithAccent = (
  text: string,
  accentColor = DEFAULT_ACCENT_COLOR,
) => {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = ACCENT_TOKEN_REGEX.exec(text)) !== null) {
    const [token, accentContent] = match;
    const tokenStart = match.index;

    if (tokenStart > cursor) {
      nodes.push(text.slice(cursor, tokenStart));
    }

    nodes.push(
      <span
        key={`accent-${tokenStart}`}
        style={{
          color: accentColor,
          display: "inline",
          whiteSpace: "inherit",
        }}
      >
        {accentContent}
      </span>,
    );

    cursor = tokenStart + token.length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes.length ? nodes : [text];
};

export interface SplitTextHandle {
  play: () => void;
  getTargets: () => Element[];
  getFrom: () => gsap.TweenVars;
}

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
  startPaused?: boolean;
  accentColor?: string;
}

export interface HeroSplitTextLoopProps {
  textClassName?: string;
  rotateTitles?: boolean;
  fixedText?: string;
}

const SplitText = forwardRef<SplitTextHandle, SplitTextProps>(
  (
    {
      text,
      className = "text-3xl md:text-4xl lg:text-5xl leading-[1.2em] font-semibold",
      delay = 20,
      duration = 0.6,
      ease = "power3.out",
      splitType = "chars",
      from = { opacity: 0, y: 26 },
      to = { opacity: 1, y: 0 },
      threshold = 0.1,
      rootMargin = "-100px",
      textAlign = "center",
      tag = "p",
      onLetterAnimationComplete,
      startPaused = false,
      accentColor,
    },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLParagraphElement>(null);
    const animationCompletedRef = useRef(false);
    const onCompleteRef = useRef(onLetterAnimationComplete);
    const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
    const renderedText = useMemo(
      () => renderTextWithAccent(text, accentColor),
      [text, accentColor],
    );
    const tweenRef = useRef<gsap.core.Tween | null>(null);
    const shouldPlayRef = useRef(false);
    const splitInstanceRef = useRef<GSAPSplitText | null>(null);
    const targetsRef = useRef<Element[]>([]);
    const styleRef = useRef<HTMLStyleElement | null>(null);

    useImperativeHandle(forwardedRef, () => ({
      play: () => {
        if (tweenRef.current && !animationCompletedRef.current) {
          tweenRef.current.play();
        } else if (!tweenRef.current) {
          shouldPlayRef.current = true;
        }
      },
      getTargets: () => targetsRef.current,
      getFrom: () => from,
    }));

    // Keep callback ref updated
    useEffect(() => {
      onCompleteRef.current = onLetterAnimationComplete;
    }, [onLetterAnimationComplete]);

    useEffect(() => {
      if (document.fonts.status === "loaded") {
        setFontsLoaded(true);
      } else {
        document.fonts.ready.then(() => {
          setFontsLoaded(true);
        });
      }
    }, []);

    useGSAP(
      () => {
        if (!ref.current || !text || !fontsLoaded) return;
        // Prevent re-animation if already completed
        if (animationCompletedRef.current) return;

        const el = ref.current as HTMLElement & {
          _rbsplitInstance?: GSAPSplitText;
        };

        // Add CSS to prevent character breaks within words
        const style = document.createElement("style");
        style.textContent = `
          .split-char {
            white-space: nowrap !important;
            display: inline-block !important;
          }
        `;
        document.head.appendChild(style);
        styleRef.current = style;

        if (el._rbsplitInstance) {
          try {
            el._rbsplitInstance.revert();
          } catch (_) {}
          el._rbsplitInstance = undefined;
        }

        const startPct = (1 - threshold) * 100;
        const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(
          rootMargin,
        );
        const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
        const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
        const sign =
          marginValue === 0
            ? ""
            : marginValue < 0
              ? `-=${Math.abs(marginValue)}${marginUnit}`
              : `+=${marginValue}${marginUnit}`;
        const start = `top ${startPct}%${sign}`;
        let targets: Element[] = [];
        const assignTargets = (self: GSAPSplitText) => {
          if (splitType.includes("chars") && self.chars.length)
            targets = self.chars;
          if (
            !targets.length &&
            splitType.includes("words") &&
            self.words.length
          )
            targets = self.words;
          if (
            !targets.length &&
            splitType.includes("lines") &&
            self.lines.length
          )
            targets = self.lines;
          if (!targets.length) targets = self.chars || self.words || self.lines;
        };
        const splitInstance = new GSAPSplitText(el, {
          type: splitType,
          smartWrap: true,
          autoSplit: splitType === "lines",
          linesClass: "split-line",
          wordsClass: "split-word",
          charsClass: "split-char",
          reduceWhiteSpace: false,
          onSplit: (self: GSAPSplitText) => {
            // Store the split instance for shine effect
            splitInstanceRef.current = self;

            assignTargets(self);
            targetsRef.current = targets;

            const tweenVars: gsap.TweenVars = {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              onComplete: () => {
                animationCompletedRef.current = true;
                onCompleteRef.current?.();
              },
              willChange: "transform, opacity",
              force3D: true,
            };

            if (startPaused) {
              tweenVars.paused = true;
            } else {
              tweenVars.scrollTrigger = {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4,
              };
            }

            const tween = gsap.fromTo(targets, { ...from }, tweenVars);

            if (startPaused) {
              tweenRef.current = tween;
              if (shouldPlayRef.current) {
                tween.play();
                shouldPlayRef.current = false;
              }
            }

            return tween;
          },
        });
        el._rbsplitInstance = splitInstance;
        return () => {
          ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === el) st.kill();
          });
          if (styleRef.current) {
            document.head.removeChild(styleRef.current);
            styleRef.current = null;
          }
          try {
            splitInstance.revert();
          } catch (_) {}
          el._rbsplitInstance = undefined;
          splitInstanceRef.current = null;
        };
      },
      {
        dependencies: [
          text,
          delay,
          duration,
          ease,
          splitType,
          JSON.stringify(from),
          JSON.stringify(to),
          threshold,
          rootMargin,
          fontsLoaded,
          startPaused,
        ],
        scope: ref,
      },
    );

    const renderTag = () => {
      const style: React.CSSProperties = {
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
        willChange: "transform, opacity",
      };
      const classes = `split-parent ${className}`;
      const Tag = (tag || "p") as React.ElementType;

      return (
        <Tag ref={ref} style={style} className={classes}>
          {renderedText}
        </Tag>
      );
    };
    return renderTag();
  },
);

SplitText.displayName = "SplitText";

export function HeroSplitTextLoop({
  textClassName = "max-w-[1000px] text-4xl md:text-5xl lg:text-6xl leading-[1.2] font-semibold tracking-[-0.04em] text-white",
  rotateTitles = true,
  fixedText,
}: HeroSplitTextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const texts = fixedText
    ? [fixedText]
    : [
        "Platform-as-a-Service [[accent:Automating Lending End-to-End]]",
        "[[accent:Mission:]] Atomix offers a toolkit to structure loan and investment products which are fast, flexible, and secure.",
        "[[accent:Vision:]] Atomix will be the leading automated loan-processing platform & marketplace for asset-backed lending worldwide.",
      ];

  const handleAnimationComplete = useCallback(() => {
    if (!rotateTitles) {
      return;
    }

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 2000);
  }, [rotateTitles, texts.length]);

  return (
    <SplitText
      key={currentIndex}
      text={texts[currentIndex]}
      tag="h1"
      className={textClassName}
      splitType="words, chars"
      delay={20}
      duration={0.6}
      from={{ opacity: 0, y: 26 }}
      to={{ opacity: 1, y: 0 }}
      onLetterAnimationComplete={
        rotateTitles ? handleAnimationComplete : undefined
      }
    />
  );
}

export default SplitText;
