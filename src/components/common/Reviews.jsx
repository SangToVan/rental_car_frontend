export default function Reviews({ reviews = [] }) {
  return (
    <>
      {/* Reviews */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold">Đánh giá</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center">
                  <img
                    src={review.user.avatar}
                    alt={review.user.name}
                    className="object-cover w-10 h-10 rounded-full"
                  />
                  <div className="ml-3">
                    <h4 className="font-medium">{review.user.name}</h4>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span>{review.date}</span>
                      <div className="flex ml-2">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <svg
                            key={`star-${review.id}-${i}`}
                            viewBox="0 0 24 24"
                            className="h-3 w-3 fill-[#ffc107]"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Chưa có đánh giá nào.</p>
        )}
      </div>
    </>
  );
}
