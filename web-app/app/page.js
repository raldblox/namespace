import Community from "@/components/sections/Community";
import Features from "@/components/sections/Features";
import Highlight from "@/components/sections/Highlight";
import Landing from "@/components/sections/Landing";
import Token from "@/components/sections/Token";

export default function Home() {
  return (
    <main className="flex flex-col items-start justify-start w-screen min-h-screen">
      <Landing />
      <Highlight />
      <Features />
      <Token />
      <Community />
    </main>
  );
}
