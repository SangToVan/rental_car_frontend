import { PromotionCard } from "./PromotionCard";
import { mockPromotions } from "/src/utils/mockData.js";

export default function Promotion() {
  return (
    <>
      {/* Promotions Section */}
      <section className="py-12">
        <div className="container">
          <h2 className="mb-6 text-2xl font-bold text-mioto-dark md:text-3xl">
            Chương Trình Khuyến Mãi
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Nhận nhiều ưu đãi hấp dẫn từ Saoto
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {mockPromotions.map((promotion) => (
              <PromotionCard
                key={promotion.id}
                id={promotion.id}
                imageUrl={promotion.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
