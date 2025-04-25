export default function About() {
  return (
    <>
      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="mb-2 text-2xl font-bold text-center text-mioto-dark md:text-3xl">
            Ưu Điểm Của Saoto
          </h2>
          <p className="mb-12 text-lg text-center text-gray-600">
            Những tính năng giúp bạn dễ dàng hơn khi thuê xe trên Saoto
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">
                Lái xe an toàn cùng Saoto
              </h3>
              <p className="text-gray-600">
                Chuyến đi trên Saoto được bảo vệ với Gói bảo hiểm thuê xe tự lái
                từ MIC & VNI. Khách thuê sẽ chỉ bồi thường tối đa 2.000.000 VNĐ
                trong trường hợp có sự cố ngoài ý muốn.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">An tâm đặt xe</h3>
              <p className="text-gray-600">
                Không tính phí huỷ chuyến trong vòng 1h sau khi thanh toán giữ
                chỗ. Hoàn tiền giữ chỗ và bồi thường 100% nếu chủ xe huỷ chuyến
                trong vòng 7 ngày trước chuyến đi.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Thủ tục đơn giản</h3>
              <p className="text-gray-600">
                Chỉ cần có CCCD gắn chip (Hoặc Passport) & Giấy phép lái xe là
                bạn đã đủ điều kiện thuê xe trên Saoto.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
