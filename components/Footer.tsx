"use client";

import React from "react";
import Image from "next/image";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Globe } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white">
      {/* Top Footer */}
      <div className="py-16">
        <div className="max-w-[1260px] w-full mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            {/* Left Column - Logo & Contact */}
            <div className="flex flex-col gap-6 max-lg:items-start">
              <Image
                src="/logo/atomix-lending-reimagined-dark.svg"
                alt="Atomix - Lending Reimagined"
                width={140}
                height={40}
                className="h-10 w-auto max-lg:self-start max-lg:mb-3"
              />
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-gray-600 text-md">
                  <MdEmail className="w-4 h-4" />
                  <span>atomix@email.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-md">
                  <MdPhone className="w-4 h-4" />
                  <span>+0 00 000 0000</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-md">
                  <MdLocationOn className="w-4 h-4" />
                  <span>Street address 123</span>
                </div>
              </div>
            </div>

            {/* Right Column - Navigation Links */}
            <div className="flex gap-16 lg:gap-24">
              {/* Resources */}
              <div className="flex flex-col gap-4">
                <h3 className="text-md font-semibold text-gray-900">
                  Recources
                </h3>
                <div className="flex flex-col gap-3">
                  <a
                    href="#"
                    className="text-md text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="text-md text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Terms
                  </a>
                </div>
              </div>

              {/* Company */}
              <div className="flex flex-col gap-4">
                <h3 className="text-md font-semibold text-gray-900">Company</h3>
                <div className="flex flex-col gap-3">
                  <a
                    href="#"
                    className="text-md text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="text-md text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Careers
                  </a>
                  <a
                    href="#"
                    className="text-md text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Partners
                  </a>
                  <a
                    href="#"
                    className="text-md text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Contact us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 py-6">
        <div className="max-w-[1260px] w-full mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-md text-gray-500">
              © 2026 Atomix. All rights reserved
            </p>

            {/* Language & Social */}
            <div className="flex items-center gap-6">
              {/* Language Selector */}
              <div className="flex items-center gap-2 text-md text-gray-600">
                <Globe className="w-4 h-4" />
                <span>English</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
