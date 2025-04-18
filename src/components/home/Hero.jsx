import SearchForm from "./SearchForm";

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative py-24 bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://ext.same-assets.com/1283309287/3954712994.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Saoto - Cùng Bạn Đến Mọi Hành Trình
            </h1>
            <p className="mb-8 text-xl text-white">
              Trải nghiệm sự khác biệt từ hơn 10.000 xe đa dạng toàn Việt Nam
            </p>
            <div className="w-full max-w-2xl mx-auto">
              <SearchForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
