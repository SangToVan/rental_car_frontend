import { Button } from "../../buttons/Button";
import hanoi from "/src/assets/ha-noi.jpg";

export default function Blog() {
  return (
    <>
      {/* Blog Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="mb-8 text-2xl font-bold text-mioto-dark md:text-3xl">
            SAOTO Blog
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="overflow-hidden bg-white rounded-lg shadow">
              <img
                src={hanoi}
                alt="Blog post"
                className="object-cover w-full h-48"
              />
              <div className="p-6">
                <div className="mb-2 text-sm text-gray-500">12-02-2025</div>
                <h3 className="mb-4 text-lg font-bold text-mioto-dark">
                  Xu hướng du xuân sau Tết - Tự do khám phá cùng xe tự lái
                </h3>
                <Button variant="outline" size="sm">
                  Đọc thêm
                </Button>
              </div>
            </div>
            <div className="overflow-hidden bg-white rounded-lg shadow">
              <img
                src={hanoi}
                alt="Blog post"
                className="object-cover w-full h-48"
              />
              <div className="p-6">
                <div className="mb-2 text-sm text-gray-500">05-10-2024</div>
                <h3 className="mb-4 text-lg font-bold text-mioto-dark">
                  Kinh nghiệm thuê xe tự lái tiết kiệm chi phí
                </h3>
                <Button variant="outline" size="sm">
                  Đọc thêm
                </Button>
              </div>
            </div>
            <div className="overflow-hidden bg-white rounded-lg shadow">
              <img
                src={hanoi}
                alt="Blog post"
                className="object-cover w-full h-48"
              />
              <div className="p-6">
                <div className="mb-2 text-sm text-gray-500">13-08-2024</div>
                <h3 className="mb-4 text-lg font-bold text-mioto-dark">
                  Thuê xe tự lái: Giải pháp hoàn hảo cho chuyến du lịch dịp lễ
                  2/9
                </h3>
                <Button variant="outline" size="sm">
                  Đọc thêm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
