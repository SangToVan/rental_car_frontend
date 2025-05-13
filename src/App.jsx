import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import CarDetail from "./pages/CarDetail";
import SearchCar from "./pages/SearchCar";
import Sidebar from "./components/profile/Sidebar";
import Profile from "./components/profile/contents/Profile";
import Favorite from "./components/profile/contents/Favorite";
import MyBooking from "./components/profile/contents/MyBooking";
import MyCar from "./components/profile/contents/MyCar";
import ChangePassword from "./components/profile/contents/ChangePassword";
import OwnerBookingDetail from "./pages/OwnerBookingDetail";
import Wallet from "./components/profile/contents/Wallet";
import CarSetting from "./components/profile/my-car/CarSetting";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import AddCar from "./pages/AddCar";
import Booking from "./pages/Booking";
import MyBookingDetail from "./pages/MyBookingDetail";
import PaymentStatus from "./pages/PaymentStatus";
import AdminPage from "./pages/AdminPage";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }
  return <Outlet />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchCar />} />
            <Route path="car/:carId" element={<CarDetail />} />
            <Route path="add-car" element={<AddCar />} />
            <Route element={<Sidebar />}>
              <Route path="user/profile" element={<Profile />} />
              <Route path="user/favorites" element={<Favorite />} />
              <Route path="user/bookings/" element={<MyBooking />} />
              <Route path="user/cars" element={<MyCar />} />
              <Route path="user/car-setting/:carId" element={<CarSetting />} />
              <Route path="user/wallet" element={<Wallet />} />
              <Route path="user/change-password" element={<ChangePassword />} />
            </Route>
            <Route path="rent-car" element={<Booking />} />
            <Route
              path="user/bookings/:bookingId"
              element={<MyBookingDetail />}
            ></Route>
            <Route
              path="owner/booking/:bookingId"
              element={<OwnerBookingDetail />}
            />
            <Route path="/payment-status" element={<PaymentStatus />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;

