import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import CarDetail from "./pages/CarDetail";
import Step1 from "./components/add_car/Step1";
import Step2 from "./components/add_car/Step2";
import Step3 from "./components/add_car/Step3";
import SearchCar from "./pages/SearchCar";
import Sidebar from "./components/profile/Sidebar";
import Profile from "./components/profile/contents/Profile";
import Favorite from "./components/profile/contents/Favorite";
import MyBooking from "./components/profile/contents/MyBooking";
import MyCar from "./components/profile/contents/MyCar";
import ChangePassword from "./components/profile/contents/ChangePassword";
import BookingDetail from "./pages/BookingDetail";
import OwnerBookingDetail from "./pages/OwnerBookingDetail";
import Wallet from "./components/profile/contents/Wallet";
import CarSetting from "./components/profile/my-car/CarSetting";

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
            <Route element={<Sidebar />}>
              <Route path="user/profile" element={<Profile />} />
              <Route path="user/favorites" element={<Favorite />} />
              <Route path="user/bookings" element={<MyBooking />} />
              <Route path="user/cars" element={<MyCar />} />
              <Route path="user/car-setting/:carId" element={<CarSetting />} />
              <Route path="user/wallet" element={<Wallet />} />
              <Route path="user/change-password" element={<ChangePassword />} />
            </Route>
            <Route path="booking" element={<BookingDetail />} />
            <Route path="booking/owner" element={<OwnerBookingDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

