import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 h-3/6">
          <span>Main page</span>
        </main>
        <Footer />
      </div>
    </>
  );
}
