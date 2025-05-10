import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Step1 from "../components/add_car/Step1";
import Step2 from "../components/add_car/Step2";
import Step3 from "../components/add_car/Step3";
import ProgressSteps from "../components/add_car/ProgressSteps";

export default function AddCar() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const [newCar, setNewCar] = useState({
    name: "",
    licensePlate: "",
    brand: "",
    model: "",
    color: "",
    numberOfSeats: "",
    productionYear: "",
    transmission: "AUTOMATIC",
    fuelType: "PETRO",
    mileage: "",
    fuelConsumption: "",
    address: "",
    description: "",
    additionalFunctions: "",
    termsOfUse: "",
    basePrice: "",
    quickRent: false,
    maxDeliveryDistance: "5",
    deliveryFee: "5",
    freeDeliveryDistance: "5",
    kmPerDay: "100",
    kmOverDayFee: "5",
    discountPerWeek: "",
    images: [],
  });

  const handleCancel = () => {
    if (currentStep === 1) navigate("/");
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <Step1
            newCar={newCar}
            setNewCar={setNewCar}
            nextStep={nextStep}
            onCancel={handleCancel}
          />
        );
      case 2:
        return (
          <Step2
            newCar={newCar}
            setNewCar={setNewCar}
            nextStep={nextStep}
            onCancel={handleCancel}
          />
        );
      case 3:
        return (
          <Step3
            newCar={newCar}
            setNewCar={setNewCar}
            nextStep={nextStep}
            onCancel={handleCancel}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#f8f9f9] min-h-screen">
      <div className="container py-6">
        {/* Back button */}
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center text-gray-700 hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Quay lại
          </Link>
        </div>

        {/* Title */}
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Đăng ký xe
        </h1>

        {/* Progress Steps */}
        <ProgressSteps currentStep={currentStep} />

        {/* Main content */}
        <>{renderStepContent(currentStep)}</>
      </div>
    </div>
  );
}
