import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex flex-col items-start justify-end gap-5 p-10">
      <h1 className="w-full pb-5 text-center border-b border-gray-700 lg:text-6xl lg:text-left">
        Hello? <br />
        <span className="text-2xl lg:text-5xl">Is somebody there???</span>
      </h1>
      <h3 className="text-xl lg:text-2xl lg:w-[45%] font-semibold text-center lg:text-left">
        We know it’s scary, but the page you’re trying to reach can’t be found
        or unauthorized. Perhaps it was just a bad link dream?
      </h3>
      <Link
        href="/"
        className="w-full px-4 py-2 font-bold text-center text-black bg-white border border-black rounded-full lg:w-fit invert hover:invert-0"
      >
        Let's go home.
      </Link>
    </section>
  );
}
