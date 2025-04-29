import { useState } from "react";

export default function Reviews({ reviewList, addReview }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleRatingHover = (value) => {
    setHoverRating(value);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;

    setSubmitting(true);

    // Create new review object
    const newReview = {
      id: Date.now().toString(),
      name: name || "Khách hàng ẩn danh",
      rating,
      comment: reviewText,
      date: new Date().toLocaleDateString("vi-VN"),
      avatarUrl: "https://ext.same-assets.com/1283309287/1369451906.svg",
    };

    // Add the review using context function
    addReview(newReview);

    // Reset form
    setRating(0);
    setReviewText("");
    setName("");

    // Show success message
    setShowSuccess(true);
    setSubmitting(false);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="p-6 overflow-hidden bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-800">
        Đánh giá dịch vụ
      </h3>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Đánh giá của bạn
          </label>
          <div className="flex items-center mb-2 space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => handleRatingHover(star)}
                onMouseLeave={handleRatingLeave}
                className="focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={
                    (hoverRating || rating) >= star ? "currentColor" : "none"
                  }
                  stroke="currentColor"
                  className={`w-8 h-8 ${
                    (hoverRating || rating) >= star
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {rating > 0 ? `${rating}/5 sao` : "Chưa đánh giá"}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Tên của bạn (không bắt buộc)
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Nhập tên của bạn"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="reviewText"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Nhận xét của bạn
          </label>
          <textarea
            id="reviewText"
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full p-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Chia sẻ trải nghiệm của bạn..."
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={rating === 0 || submitting}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              rating === 0 || submitting
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {submitting ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </div>

        {showSuccess && (
          <div className="p-3 mt-4 text-green-700 border border-green-200 rounded-md bg-green-50">
            <div className="flex">
              <svg
                className="w-5 h-5 mr-2 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Cảm ơn bạn đã gửi đánh giá!</p>
            </div>
          </div>
        )}
      </form>

      {/* Reviews List */}
      <div>
        <h4 className="pb-2 mb-4 font-medium text-gray-700 border-b text-md">
          Đánh giá gần đây ({reviewList.length})
        </h4>

        {reviewList.length === 0 ? (
          <div className="py-6 text-center text-gray-500">
            Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!
          </div>
        ) : (
          <div className="space-y-4">
            {reviewList.map((review) => (
              <div key={review.id} className="pb-4 border-b border-gray-100">
                <div className="flex items-center mb-2">
                  <img
                    src={review.avatarUrl}
                    alt={review.name}
                    className="w-10 h-10 mr-3 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{review.name}</p>
                    <div className="flex items-center">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={`w-4 h-4 ${
                              index < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-xs text-gray-500">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 ml-13">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
