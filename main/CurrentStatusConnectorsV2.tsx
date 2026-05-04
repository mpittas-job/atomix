import { CURRENT_STATUS_GLOW_PATH_PROPS } from "@/components/current-status/glowConfig";

const STATIC_PATH_PROPS = {
  fill: "none",
  stroke: "#CDD2D7",
  strokeWidth: "2",
  strokeLinecap: "round" as const,
  strokeDasharray: "9999 9999",
  strokeDashoffset: "9999",
};

export default function CurrentStatusConnectorsV2() {
  return (
    <div className="flex min-h-[108px] w-full relative mx-auto bg-red-500/0">
      <div className="w-[440px] absolute left-[calc(50%+3px)] -translate-x-1/1">
        <svg
          viewBox="0 0 325 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            overflow: "visible",
          }}
        >
          <path
            data-cs-connector-1
            d="M323 2 V25 Q323 40 308 40 H17 Q2 40 2 55 V78"
            {...STATIC_PATH_PROPS}
          />
          <path
            data-cs-connector-glow-1
            className="status-connector-glow"
            d="M323 2 V25 Q323 40 308 40 H17 Q2 40 2 55 V78"
            {...CURRENT_STATUS_GLOW_PATH_PROPS}
          />
        </svg>
      </div>

      <div className="w-[167px] absolute left-[calc(50%+11px)] -translate-x-1/1 top-0 bottom-0">
        <svg
          viewBox="0 0 111 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            overflow: "visible",
          }}
        >
          <path
            data-cs-connector-2
            d="M109 2 V25 Q109 40 94 40 H17 Q2 40 2 55 V78"
            {...STATIC_PATH_PROPS}
          />
          <path
            data-cs-connector-glow-2
            className="status-connector-glow"
            d="M109 2 V25 Q109 40 94 40 H17 Q2 40 2 55 V78"
            {...CURRENT_STATUS_GLOW_PATH_PROPS}
          />
        </svg>
      </div>

      <div className="w-[440px] -ml-1 absolute right-[calc(50%+3px)] translate-x-1/1">
        <svg
          viewBox="0 0 325 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            overflow: "visible",
          }}
        >
          <path
            data-cs-connector-4
            d="M2 2 V25 Q2 40 17 40 H308 Q323 40 323 55 V78"
            {...STATIC_PATH_PROPS}
          />
          <path
            data-cs-connector-glow-4
            className="status-connector-glow"
            d="M2 2 V25 Q2 40 17 40 H308 Q323 40 323 55 V78"
            {...CURRENT_STATUS_GLOW_PATH_PROPS}
          />
        </svg>
      </div>

      <div className="w-[167px] absolute right-[calc(50%+11px)] translate-x-1/1 top-0 bottom-0">
        <svg
          viewBox="0 0 111 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            overflow: "visible",
          }}
        >
          <path
            data-cs-connector-3
            d="M2 2 V25 Q2 40 17 40 H94 Q109 40 109 55 V78"
            {...STATIC_PATH_PROPS}
          />
          <path
            data-cs-connector-glow-3
            className="status-connector-glow"
            d="M2 2 V25 Q2 40 17 40 H94 Q109 40 109 55 V78"
            {...CURRENT_STATUS_GLOW_PATH_PROPS}
          />
        </svg>
      </div>
    </div>
  );
}
