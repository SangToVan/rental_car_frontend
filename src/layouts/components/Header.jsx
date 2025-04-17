import { Link } from "react-router-dom";
import logoImg from "/src/assets/logo.png";
export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoImg} alt="logo" className="h-10" />
          </Link>
          <nav className="items-center hidden space-x-6 md:flex">
            <Link
              to="/about"
              className="font-medium text-mioto-dark hover:text-primary"
            >
              Về chúng tôi
            </Link>
            <Link
              to="/cars"
              className="font-medium text-mioto-dark hover:text-primary"
            >
              Danh sách xe
            </Link>
            <Link
              to="/locations"
              className="font-medium text-mioto-dark hover:text-primary"
            >
              Địa điểm
            </Link>
            <Link
              to="/blog"
              className="font-medium text-mioto-dark hover:text-primary"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="font-medium text-mioto-dark hover:text-primary"
            >
              Liên hệ
            </Link>
            <button className="px-4 py-2 ml-4 text-white transition-colors rounded-md bg-primary hover:bg-primary/90">
              Đăng nhập
            </button>
            <button className="px-4 py-2 transition-colors bg-white border rounded-md border-primary text-primary hover:bg-primary/10">
              Đăng ký
            </button>
          </nav>
          <button className="block md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
