import { useState } from "react";

export default function Favorite() {
  const [activeTab, setActiveTab] = useState("self-drive");

  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold">Xe yêu thích của tôi</h1>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex">
          <button
            className={`relative pb-4 pt-2 ${
              activeTab === "self-drive"
                ? "text-green-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-green-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("self-drive")}
          >
            Xe tự lái
          </button>
          <button
            className={`ml-8 relative pb-4 pt-2 ${
              activeTab === "with-driver"
                ? "text-green-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-green-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("with-driver")}
          >
            Xe có tài xế
          </button>
        </div>
      </div>

      {/* Car listings */}
      <div className="space-y-6">
        {/* Car Card 1 */}
        <div className="overflow-hidden bg-white rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-2/5">
              <img
                src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/kia/sedona/p/cho_thue_xe_kia_sedona_2019_tp_hcm_quang_binh-2022-05-06-10-45-57.jpg"
                alt="KIA SEDONA PREMIUM 2019"
                className="object-cover w-full h-64 md:h-full"
              />
              <button className="absolute p-2 bg-white rounded-full right-4 top-4 bg-opacity-80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-green-500"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
              <span className="absolute px-3 py-1 text-xs font-medium text-green-600 bg-white rounded-full left-4 top-4">
                Miễn thế chấp
              </span>
              <div className="absolute bottom-0 left-0 w-full p-4 text-white bg-gradient-to-t from-black to-transparent">
                <div className="flex items-center">
                  <img
                    src="https://n1-cstg.mioto.vn/m/avatars/XGJPOq8ZRt_AQHG4yXb1-c9nz_FuXP0OMrTCdYY.jpg"
                    alt="User"
                    className="object-cover w-8 h-8 mr-2 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      Quận 1, TP Hồ Chí Minh
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">KIA SEDONA PREMIUM 2019</h2>
                  <div className="flex items-center">
                    <span className="mr-2 line-through">1.300K</span>
                    <span className="font-bold text-green-600">
                      1.180K/ngày
                    </span>
                  </div>
                </div>
                <div className="flex items-center mt-2 text-gray-600">
                  <span className="flex items-center mr-4">
                    <svg
                      className="w-4 h-4 mr-1 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    5.0
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    <span>60 chuyến</span>
                  </span>
                </div>
                <div className="flex flex-wrap items-center mt-4 text-sm text-gray-600">
                  <div className="flex items-center mr-4">
                    <svg
                      className="w-5 h-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-1h6a1 1 0 001-1v-3a1 1 0 00-.55-.89l-6-3A1.001 1.001 0 0012 6H4a1 1 0 00-1-1H3zm0 1h1v9h-1V5zm6 10a1 1 0 00-1 1 1 1 0 10-2 0 1 1 0 001-1h2zm-2.95 0a2.5 2.5 0 014.9 0h-4.9zM17 14h-5v-4h.06l4.94 2.47V14z" />
                    </svg>
                    Số tự động
                  </div>
                  <div className="flex items-center mr-4">
                    <svg
                      className="w-5 h-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z"
                        clipRule="evenodd"
                      />
                      <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3z" />
                    </svg>
                    7 chỗ
                  </div>
                  <div className="flex items-center mr-4">
                    <svg
                      className="w-5 h-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Xăng
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button className="px-5 py-2 font-medium text-green-500 transition bg-white border border-green-500 rounded-md hover:bg-green-50">
                  Bỏ thích
                </button>
                <button className="px-5 py-2 font-medium text-white transition bg-green-500 rounded-md hover:bg-green-600">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Car Card 2 */}
        <div className="overflow-hidden bg-white rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-2/5">
              <img
                src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/honda/civic/p/cho_thue_xe_honda_civic_rs_2021_tai_tp.hcm-2023-01-20-10-49-19.jpg"
                alt="HONDA CIVIC RS 2020"
                className="object-cover w-full h-64 md:h-full"
              />
              <button className="absolute p-2 bg-white rounded-full right-4 top-4 bg-opacity-80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-green-500"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
              <span className="absolute px-3 py-1 text-xs font-medium text-green-600 bg-white rounded-full left-4 top-4">
                Miễn thế chấp
              </span>
              <span className="absolute px-3 py-1 text-xs font-medium text-white bg-orange-500 rounded-full left-4 top-12">
                Giao xe tận nơi
              </span>
              <div className="absolute bottom-0 left-0 w-full p-4 text-white bg-gradient-to-t from-black to-transparent">
                <div className="flex items-center">
                  <img
                    src="https://n1-cstg.mioto.vn/m/avatars/XGJPOq8ZRt_AQHG4yXb1-c9nz_FuXP0OMrTCdYY.jpg"
                    alt="User"
                    className="object-cover w-8 h-8 mr-2 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      Quận 1, TP Hồ Chí Minh
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">HONDA CIVIC RS 2020</h2>
                  <div className="flex items-center">
                    <span className="mr-2 line-through">1.089K</span>
                    <span className="font-bold text-green-600">989K/ngày</span>
                  </div>
                </div>
                <div className="flex items-center mt-2 text-gray-600">
                  <span className="flex items-center mr-4">
                    <svg
                      className="w-4 h-4 mr-1 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    5.0
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    <span>33 chuyến</span>
                  </span>
                </div>
                <div className="flex flex-wrap items-center mt-4 text-sm text-gray-600">
                  <div className="flex items-center mr-4">
                    <svg
                      className="w-5 h-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-1h6a1 1 0 001-1v-3a1 1 0 00-.55-.89l-6-3A1.001 1.001 0 0012 6H4a1 1 0 00-1-1H3zm0 1h1v9h-1V5zm6 10a1 1 0 00-1 1 1 1 0 10-2 0 1 1 0 001-1h2zm-2.95 0a2.5 2.5 0 014.9 0h-4.9zM17 14h-5v-4h.06l4.94 2.47V14z" />
                    </svg>
                    Số tự động
                  </div>
                  <div className="flex items-center mr-4">
                    <svg
                      className="w-5 h-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z"
                        clipRule="evenodd"
                      />
                      <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3z" />
                    </svg>
                    4 chỗ
                  </div>
                  <div className="flex items-center mr-4">
                    <svg
                      className="w-5 h-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Xăng
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button className="px-5 py-2 font-medium text-green-500 transition bg-white border border-green-500 rounded-md hover:bg-green-50">
                  Bỏ thích
                </button>
                <button className="px-5 py-2 font-medium text-white transition bg-green-500 rounded-md hover:bg-green-600">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
