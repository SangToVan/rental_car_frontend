import Hero from "../components/home/Hero";
import Promotion from "../components/home/Promotion";
import Suggestion from "../components/home/Suggestion";
import Location from "../components/home/Location";
import Features from "../components/home/Features";
import Blog from "../components/home/Blog";

export default function Home() {
  return (
    <>
      <div className="pb-16">
        <Hero />
        <Promotion />
        <Suggestion />
        <Location />
        <Features />
        <Blog />
      </div>
    </>
  );
}
