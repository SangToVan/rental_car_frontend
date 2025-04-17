import { Link } from "react-router-dom";
import logoImg from "/src/assets/logo.png";

export default function Footer() {
  return (
    <>
      <footer className="py-12 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <img src={logoImg} alt="logo" className="h-12 mb-4" />
              <p className="text-sm text-gray-600">
                1900 9217
                <br />
                Tổng đài hỗ trợ: 7AM - 10PM
                <br />
                contact@saoto.com
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Chính Sách</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Chính sách và quy định
                  </Link>
                </li>
                <li>
                  <Link
                    to="/regu"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Quy chế hoạt động
                  </Link>
                </li>
                <li>
                  <Link
                    to="/personalinfo"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Bảo mật thông tin
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resolveconflic"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Giải quyết tranh chấp
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Tìm Hiểu Thêm</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/howitwork"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Hướng dẫn chung
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bookinghowto"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Hướng dẫn đặt xe
                  </Link>
                </li>
                <li>
                  <Link
                    to="/paymenthowto"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Hướng dẫn thanh toán
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faqs"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Hỏi và trả lời
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Đối Tác</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/owners"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Đăng ký chủ xe SAOTO
                  </Link>
                </li>
                <li>
                  <Link
                    to="/partners"
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Đối tác của chúng tôi
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="pt-8 mt-12 text-sm text-gray-600 border-t border-gray-200">
            <p>© SAOTO Car Rental - All Rights Reserved 2025</p>
            <div className="flex items-center mt-4 space-x-4">
              <span>Phương thức thanh toán</span>
              <img
                src="https://ext.same-assets.com/0/1525334153.png"
                alt="Payment Method"
                className="h-6"
              />
              <img
                src="https://ext.same-assets.com/1283309287/1475809315.png"
                alt="Payment Method"
                className="h-6"
              />
              <img
                src="https://ext.same-assets.com/1283309287/2326591762.png"
                alt="Payment Method"
                className="h-6"
              />
              <img
                src="https://ext.same-assets.com/0/468849430.png"
                alt="Payment Method"
                className="h-6"
              />
              <img
                src="https://ext.same-assets.com/0/4011642834.png"
                alt="Payment Method"
                className="h-6"
              />
            </div>
          </div> */}
        </div>
      </footer>
    </>
  );
}
