import SearchBar from "../components/searchs/SearchBar";
import CarGrid from "../components/searchs/CarGrid";
import { mockCarData } from "../utils/mockData";

export default function SearchCar() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SearchBar />
      <div className="flex-1">
        <CarGrid cars={mockCarData} />
      </div>
    </div>
  );
}
