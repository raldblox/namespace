"use client";

import React from "react";

const Footer = () => {
  const footerNavs = [
    {
      label: "Company",
      items: [
        {
          href: "javascript:void()",
          name: "Partners",
        },
        {
          href: "javascript:void()",
          name: "Blog",
        },
        {
          href: "javascript:void()",
          name: "Team",
        },
        {
          href: "javascript:void()",
          name: "Careers",
        },
      ],
    },
    {
      label: "Resources",
      items: [
        {
          href: "javascript:void()",
          name: "contact",
        },
        {
          href: "javascript:void()",
          name: "Support",
        },
        {
          href: "javascript:void()",
          name: "Docs",
        },
        {
          href: "javascript:void()",
          name: "Pricing",
        },
      ],
    },
  ];
  return (
    <footer className="px-12 py-8">
      <div className="grid w-full grid-cols-4 gap-6">
        <div className="grid w-full grid-cols-2 col-span-4">
          <div className="col-span-1">
            <img src="/namespace-dark.svg" className="w-40" />
            <p className="leading-relaxed mt-4 text-[15px]">
              Namespace is a decentralized naming and identity system that
              revolutionizes the web3 landscape, empowering individuals and
              communities to claim their unique identities and foster growth.
              With Namespace, you can unlock new possibilities for recognition,
              visibility, and engagement on the blockchain of your choice.
            </p>
          </div>
          <div className="flex items-start justify-end col-span-1 text-black gap-x-6">
            <a href="javascript:void()">
              <svg
                className="w-10 h-10 p-2 duration-150 border border-black rounded-full hover:accent hover:bg-black"
                fill="none"
                viewBox="0 0 48 48"
              >
                <g clip-path="url(#clip0_17_80)">
                  <path
                    fill="currentColor"
                    d="M15.1 43.5c18.11 0 28.017-15.006 28.017-28.016 0-.422-.01-.853-.029-1.275A19.998 19.998 0 0048 9.11c-1.795.798-3.7 1.32-5.652 1.546a9.9 9.9 0 004.33-5.445 19.794 19.794 0 01-6.251 2.39 9.86 9.86 0 00-16.788 8.979A27.97 27.97 0 013.346 6.299 9.859 9.859 0 006.393 19.44a9.86 9.86 0 01-4.462-1.228v.122a9.844 9.844 0 007.901 9.656 9.788 9.788 0 01-4.442.169 9.867 9.867 0 009.195 6.843A19.75 19.75 0 010 39.078 27.937 27.937 0 0015.1 43.5z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_80">
                    <path fill="#fff" d="M0 0h48v48H0z" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a href="javascript:void()">
              <svg
                className="w-10 h-10 p-2 duration-150 border border-black rounded-full hover:accent hover:bg-black"
                fill="none"
                viewBox="0 0 48 48"
              >
                <g fill="currentColor" clip-path="url(#clip0_910_44)">
                  <path
                    fill-rule="evenodd"
                    d="M24 1A24.086 24.086 0 008.454 6.693 23.834 23.834 0 00.319 21.044a23.754 23.754 0 003.153 16.172 23.98 23.98 0 0012.938 10.29c1.192.221 1.641-.518 1.641-1.146 0-.628-.024-2.45-.032-4.442-6.676 1.443-8.087-2.817-8.087-2.817-1.089-2.766-2.663-3.493-2.663-3.493-2.178-1.478.163-1.45.163-1.45 2.413.17 3.68 2.461 3.68 2.461 2.138 3.648 5.616 2.593 6.983 1.976.215-1.545.838-2.596 1.526-3.193-5.333-.6-10.937-2.647-10.937-11.791a9.213 9.213 0 012.472-6.406c-.246-.6-1.069-3.026.234-6.322 0 0 2.015-.64 6.602 2.446a22.904 22.904 0 0112.017 0c4.583-3.086 6.594-2.446 6.594-2.446 1.307 3.288.484 5.714.238 6.322a9.194 9.194 0 012.476 6.414c0 9.163-5.615 11.183-10.957 11.772.859.742 1.626 2.193 1.626 4.421 0 3.193-.028 5.762-.028 6.548 0 .636.433 1.38 1.65 1.146a23.98 23.98 0 0012.938-10.291 23.754 23.754 0 003.151-16.175A23.834 23.834 0 0039.56 6.69 24.086 24.086 0 0024.009 1H24z"
                    clip-rule="evenodd"
                  />
                  <path d="M9.089 35.264c-.052.119-.243.154-.398.071-.155-.083-.27-.237-.214-.36.056-.122.242-.154.397-.07.155.082.274.24.215.359zM10.063 36.343a.4.4 0 01-.493-.11c-.155-.167-.187-.396-.068-.499.12-.102.334-.055.489.11.155.167.19.396.072.499zM11.008 37.714c-.147.103-.397 0-.536-.206a.395.395 0 010-.569c.147-.098.397 0 .537.202.139.202.143.47 0 .573zM12.292 39.042c-.131.146-.397.106-.616-.091-.219-.198-.27-.467-.139-.609.131-.142.397-.102.624.091.226.194.27.466.131.609zM14.092 39.816c-.06.186-.33.269-.6.19-.27-.08-.449-.3-.397-.49.051-.19.326-.277.6-.19.274.087.449.297.397.49zM16.056 39.95c0 .194-.223.36-.509.364-.286.004-.52-.154-.52-.348 0-.193.222-.36.508-.363.286-.004.52.15.52.347zM17.884 39.646c.036.194-.163.395-.45.443-.285.047-.536-.067-.572-.257-.035-.19.171-.395.45-.447.278-.05.536.068.572.261z" />
                </g>
                <defs>
                  <clipPath id="clip0_910_44">
                    <path fill="#fff" d="M0 0h48v48H0z" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
        <div className="flex items-center justify-between col-span-1">
          {footerNavs.map((item, idx) => (
            <ul className="space-y-4" key={idx}>
              <h4 className="font-medium text-gray-800">{item.label}</h4>
              {item.items.map((el, idx) => (
                <li key={idx}>
                  <a
                    href={el.href}
                    className="hover:underline hover:text-indigo-600"
                  >
                    {el.name}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="flex items-start justify-end col-span-3 space-y-6">
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
      <div className="items-center justify-between py-6 mt-8 border-t sm:flex">
        <div className="mt-4 sm:mt-0">
          &copy; 2022 Float UI All rights reserved.
        </div>
        <div className="mt-4 sm:mt-0">
          &copy; 2022 Float UI All rights reserved.
        </div>
      </div>
      <style jsx>{`
        .svg-icon path,
        .svg-icon polygon,
        .svg-icon rect {
          fill: currentColor;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
