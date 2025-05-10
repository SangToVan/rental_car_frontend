import Hero from "../components/home/Hero";
import Promotion from "../components/home/Promotions/Promotion";
import Suggestion from "../components/home/Suggestion";
import Location from "../components/home/Locations/Location";
import About from "../components/home/About";
import Blog from "../components/home/Blogs/Blog";
import { useEffect, useState } from "react";
import { getListCarApi } from "../shared/apis/homeApi";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getListCarApi()
      .then((data) => {
        setCars(data?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="pb-16">
        <Hero />
        {/* <Promotion /> */}
        <Suggestion cars={cars} />
        <Location />
        <About />
        <Blog />
      </div>
    </>
  );
}
