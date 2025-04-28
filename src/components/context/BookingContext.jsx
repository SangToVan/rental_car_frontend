import React, { createContext, useContext, useState, useEffect } from "react";
import { mockBookings } from "../../utils/mockData";

// Sample initial reviews
const initialReviews = [
  {
    id: "r1",
    name: "Nguyễn Văn A",
    rating: 5,
    comment:
      "Dịch vụ rất tốt, xe sạch sẽ và chủ xe nhiệt tình. Sẽ thuê lại lần sau!",
    date: "26/04/2025",
    avatarUrl: "https://ext.same-assets.com/1283309287/1369451906.svg",
  },
  {
    id: "r2",
    name: "Trần Thị B",
    rating: 4,
    comment:
      "Xe chạy êm, tốt. Chỉ hơi muộn giờ một chút khi giao xe nhưng nhìn chung vẫn hài lòng.",
    date: "24/04/2025",
    avatarUrl: "https://ext.same-assets.com/1283309287/3335277324.svg",
  },
];

// Create the context
const BookingContext = createContext();

// Custom hook to use the booking context
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

// Provider component
export const BookingProvider = ({ children }) => {
  // State for booking status
  const [bookingStatus, setBookingStatus] = useState("pending");
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState(mockBookings[0]);
  const [selectedDocumentOption, setSelectedDocumentOption] =
    useState("option1");
  const [driverInfo, setDriverInfo] = useState({
    name: "",
    phone: "",
    idNumber: "",
    relationship: "family",
  });
  const [reviewList, setReviewList] = useState(initialReviews);
  const [averageRating, setAverageRating] = useState(
    calculateAverageRating(initialReviews)
  );

  // Calculate average rating
  function calculateAverageRating(reviews) {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }

  // Update current step based on booking status
  useEffect(() => {
    switch (bookingStatus) {
      case "pending":
        setCurrentStep(1);
        break;
      case "confirm":
        setCurrentStep(2);
        break;
      case "payment":
        setCurrentStep(3);
        break;
      case "progress":
        setCurrentStep(4);
        break;
      case "complete":
        setCurrentStep(5);
        break;
      default:
        setCurrentStep(1);
    }
  }, [bookingStatus]);

  // Function to update booking status
  const updateBookingStatus = (newStatus) => {
    setBookingStatus(newStatus);
  };

  // Function to update booking data
  const updateBookingData = (newData) => {
    setBookingData({
      ...bookingData,
      ...newData,
    });
  };

  // Function to update selected document option
  const updateSelectedDocumentOption = (optionId) => {
    setSelectedDocumentOption(optionId);
  };

  // Function to update driver information
  const updateDriverInfo = (newInfo) => {
    setDriverInfo({
      ...driverInfo,
      ...newInfo,
    });
  };

  // Function to add a new review
  const addReview = (newReview) => {
    const updatedReviews = [newReview, ...reviewList];
    setReviewList(updatedReviews);
    setAverageRating(calculateAverageRating(updatedReviews));
  };

  // Function to delete a review (useful for admin functionality)
  const deleteReview = (reviewId) => {
    const updatedReviews = reviewList.filter(
      (review) => review.id !== reviewId
    );
    setReviewList(updatedReviews);
    setAverageRating(calculateAverageRating(updatedReviews));
  };

  // Value to be provided by the context
  const value = {
    bookingStatus,
    currentStep,
    bookingData,
    selectedDocumentOption,
    driverInfo,
    reviewList,
    averageRating,
    updateBookingStatus,
    updateBookingData,
    updateSelectedDocumentOption,
    updateDriverInfo,
    addReview,
    deleteReview,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export default BookingContext;
