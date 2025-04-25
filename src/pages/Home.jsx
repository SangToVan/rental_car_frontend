import Hero from "../components/home/Hero";
import Promotion from "../components/home/Promotions/Promotion";
import Suggestion from "../components/home/Suggestion";
import Location from "../components/home/Locations/Location";
import About from "../components/home/About";
import Blog from "../components/home/Blogs/Blog";

export default function Home() {
  return (
    <>
      <div className="pb-16">
        <Hero />
        <Promotion />
        <Suggestion />
        <Location />
        <About />
        <Blog />
      </div>
    </>
  );
}
