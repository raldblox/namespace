import Highlight from "@/components/sections/Highlight";
import Landing from "@/components/sections/Landing";

export default function Home() {
  return (
    <main className="flex flex-col items-start justify-start w-screen min-h-screen">
      <Landing />
      <Highlight />
    </main>
  );
}
