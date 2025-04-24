import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useState } from "react";

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main
          id="main"
          className="flex-1"
          style={{
            marginTop: "var(--margin-top-header)",
            minHeight: "calc(100vh - var(--margin-top-header))",
          }}
        >
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
