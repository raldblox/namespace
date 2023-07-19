import React from "react";

const Community = () => {
  return (
    <section className="py-16 lg:py-28" id="community">
      <div className="relative px-4 py-8 mx-4 lg:py-16 bg-accent rounded-2xl md:px-8 md:mx-8">
        <div className="relative mx-auto sm:text-center">
          <div className="flex flex-col items-center justify-center space-y-8">
            <h1 className="font-bold text-center lg:text-left">
              Join the community on Discord
            </h1>
            <p className="max-w-xl leading-relaxed text-center lg:text-left">
              Stay updated on our progress, announcements, discounts, and
              connect with our community and developers on Discord.
            </p>
            <a
              href="https://discord.gg/gTDXTE4Y"
              target="_blank"
              className="px-8 py-4 font-medium duration-150 border border-black rounded-lg outline-none bg-dark hover:bg-transparent hover:text-black"
            >
              Join us on Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
