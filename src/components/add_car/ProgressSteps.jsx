export default function ProgressSteps({ currentStep }) {
  return (
    <>
      {/* Progress Steps */}
      <div className="mb-6 overflow-hidden bg-white rounded-md shadow-sm">
        <div className="flex items-center justify-between">
          <div
            className={`w-1/3 text-center py-4 border-b-2 ${
              currentStep >= 1 ? "border-[#61c596]" : "border-gray-200"
            }`}
          >
            <div
              className={`${
                currentStep === 1 ? "bg-[#61c596]" : "bg-[#f8f9f9]"
              } mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2`}
            >
              <span
                className={`font-semibold ${
                  currentStep === 1 ? "text-white" : "text-gray-600"
                } `}
              >
                1
              </span>
            </div>
            <div className="text-sm text-gray-600">Thông tin</div>
          </div>

          <div
            className={`w-1/3 text-center py-4 border-b-2 ${
              currentStep >= 2 ? "border-[#61c596]" : "border-gray-200"
            }`}
          >
            <div
              className={`${
                currentStep === 2 ? "bg-[#61c596]" : "bg-[#f8f9f9]"
              } mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2`}
            >
              <span
                className={`font-semibold ${
                  currentStep === 2 ? "text-white" : "text-gray-600"
                } `}
              >
                2
              </span>
            </div>
            <div className="text-sm text-gray-600">Phí thuê</div>
          </div>

          <div
            className={`w-1/3 text-center py-4 border-b-2 ${
              currentStep >= 3 ? "border-[#61c596]" : "border-gray-200"
            }`}
          >
            <div
              className={`${
                currentStep === 3 ? "bg-[#61c596]" : "bg-[#f8f9f9]"
              } mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2`}
            >
              <span
                className={`font-semibold ${
                  currentStep === 3 ? "text-white" : "text-gray-600"
                } `}
              >
                3
              </span>
            </div>
            <div className="text-sm text-gray-600">Hình ảnh</div>
          </div>
        </div>
      </div>
    </>
  );
}
