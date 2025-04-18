import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../buttons/Button";

export default function SearchForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("self");
  const [location, setLocation] = useState("TP. Hà Nội");
  const [startDate, setStartDate] = useState("21:00, 04/04/2025");
  const [endDate, setEndDate] = useState("20:00, 05/04/2025");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search logic
    navigate(
      `/find/filter?address=${encodeURIComponent(
        location
      )}&startDate=${encodeURIComponent(
        startDate
      )}&endDate=${encodeURIComponent(endDate)}`
    );
  };
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex mb-4 border-b">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "self"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("self")}
        >
          Xe tự lái
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "withDriver"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("withDriver")}
        >
          Xe có tài xế
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "longTerm"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("longTerm")}
        >
          Thuê xe dài hạn
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="location"
              className="block mb-1 text-xs text-gray-500"
            >
              Địa điểm
            </label>
            <div className="relative bg-white border rounded-md focus-within:ring-1 focus-within:ring-primary">
              <input
                type="text"
                id="location"
                className="w-full px-3 py-2 rounded-md outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="block mb-1 text-xs text-gray-500"
            >
              Thời gian thuê
            </label>
            <div className="relative bg-white border rounded-md focus-within:ring-1 focus-within:ring-primary">
              <input
                type="text"
                id="startDate"
                className="w-full px-3 py-2 rounded-md outline-none"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block mb-1 text-xs text-gray-500"
            >
              Thời gian trả
            </label>
            <div className="relative bg-white border rounded-md focus-within:ring-1 focus-within:ring-primary">
              <input
                type="text"
                id="endDate"
                className="w-full px-3 py-2 rounded-md outline-none"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Button type="submit" size="lg" className="w-full md:w-auto">
            Tìm Xe
          </Button>
        </div>
      </form>
    </div>
  );
}
