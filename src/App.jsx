import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import CarDetail from "./pages/CarDetail";
import Step1 from "./components/add_car/Step1";
import Step2 from "./components/add_car/Step2";
import Step3 from "./components/add_car/Step3";
import SearchCar from "./pages/SearchCar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchCar />} />
            <Route path="car/:id" element={<CarDetail />} />
            <Route path="add-car/step1" element={<Step1 />} />
            <Route path="add-car/step2" element={<Step2 />} />
            <Route path="add-car/step3" element={<Step3 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

