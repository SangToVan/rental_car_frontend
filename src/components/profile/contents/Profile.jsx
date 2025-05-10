import { useEffect, useState } from "react";
import { FiCamera, FiEdit2, FiUpload, FiX } from "react-icons/fi";
import avatarImg from "../../../assets/img-profile.png";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  getMyProfileApi,
  updateMyProfileApi,
} from "../../../shared/apis/userApi";
import { setUpdatedUser } from "../../../shared/toolkits/authSlice";
import { convertToBase64 } from "../../../shared/utils/convertToBase64";
import { toast } from "react-toastify";

const Profile = () => {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isAvatarEditModalOpen, setIsAvatarEditModalOpen] = useState(false);
  const [currentUser] = useState({
    isEmailVerified: true,
    isPhoneVerified: true,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const watchOpenUpdateForm = watch("openUpdateForm", false);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  // STATE VARIABLES TO ADD TO YOUR COMPONENT
  const [isDriverLicenseEditMode, setIsDriverLicenseEditMode] = useState(false);
  const [licenseImage, setLicenseImage] = useState(null);
  const [tempLicenseImage, setTempLicenseImage] = useState(null);
  const [licenseFormData, setLicenseFormData] = useState({
    drivingLicense: "",
    licenseFullName: "",
    licenseBirthday: "",
  });

  useEffect(() => {
    getMyProfileApi().then((data) => {
      const info = data.data;
      setValue("username", info.username);
      setValue("email", info.email);
      setValue("phoneNumber", info.phoneNumber);
      setValue("citizenId", info.citizenId);
      setValue("birthday", info.birthday);
      setValue("gender", info.gender);
      setValue("drivingLicense", info.drivingLicense);
      setValue("userInfo", info);
      setAvatar(info.avatar || avatarImg);
      setLicenseImage(info.licenseImage || null);
    });
  }, [setValue]);

  const updateProfile = async (data) => {
    // Tách các trường không cần thiết ra khỏi data
    const { userInfo, openUpdateForm, ...cleanedData } = data;

    // cleanedData bây giờ chỉ còn các field thực sự cần gửi lên server
    const updatedUser = await updateMyProfileApi(cleanedData);

    setValue("userInfo", updatedUser.data);
    setValue("openUpdateForm", false);
    dispatch(setUpdatedUser(updatedUser.data));
    toast.success(updatedUser.message);
  };

  const updateAvatar = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      const curUserInfo = watch("userInfo");

      updateMyProfileApi({
        ...curUserInfo,
        avatar: base64,
      }).then((res) => {
        dispatch(setUpdatedUser(res.data));
        setAvatar(res.data.avatar);
        setIsAvatarEditModalOpen(false);
        toast.success(res.message);
        setValue("userInfo", res.data);
      });
    }
  };

  const userInfo = watch("userInfo");
  const openUpdateForm = watchOpenUpdateForm;

  // FUNCTIONS TO ADD TO YOUR COMPONENT
  const handleDriverLicenseChange = (e) => {
    const { name, value } = e.target;
    setLicenseFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLicenseImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setTempLicenseImage(base64);
    }
  };

  const updateDriverLicense = async () => {
    try {
      // Validate required fields
      if (
        !licenseFormData.drivingLicense ||
        !licenseFormData.licenseFullName ||
        !licenseFormData.licenseBirthday
      ) {
        toast.error("Vui lòng nhập đầy đủ thông tin GPLX");
        return;
      }

      // If no image is provided and no existing image, show error
      if (!tempLicenseImage && !licenseImage) {
        toast.error("Vui lòng tải lên ảnh GPLX");
        return;
      }

      const curUserInfo = watch("userInfo");
      const updatedData = {
        ...curUserInfo,
        drivingLicense: licenseFormData.drivingLicense,
        licenseFullName: licenseFormData.licenseFullName,
        licenseBirthday: licenseFormData.licenseBirthday,
        licenseImage: tempLicenseImage,
      };

      const response = await updateMyProfileApi(updatedData);

      if (response.data) {
        dispatch(setUpdatedUser(response.data));
        setValue("userInfo", response.data);
        setValue("drivingLicense", licenseFormData.drivingLicense);
        setIsDriverLicenseEditMode(false);
        // If we uploaded a new image, update the displayed image
        if (tempLicenseImage) {
          setLicenseImage(tempLicenseImage);
          setTempLicenseImage(null);
        }
        toast.success(
          "Cập nhật giấy phép lái xe thành công. Đang chờ xác thực."
        );
      }
    } catch (error) {
      toast.error("Cập nhật giấy phép lái xe thất bại");
      console.error("Update license error:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Thông tin tài khoản</h1>
      </div>

      <div className="max-w-4xl">
        {/* Integrated User Info and General Information */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-start">
            <div className="flex flex-col items-center mr-8">
              <div className="flex justify-center">
                <div className="relative">
                  <div
                    className="relative w-24 h-24 overflow-hidden rounded-full cursor-pointer"
                    onClick={() => setIsAvatarModalOpen(true)}
                  >
                    <img
                      src={avatar}
                      alt={userInfo?.username || "N/A"}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute top-0 right-0 z-10 p-2 bg-white rounded-full shadow-md cursor-pointer">
                    <FiEdit2
                      className="w-4 h-4 text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAvatarEditModalOpen(true);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mt-4 text-center">
                <h2 className="text-lg font-semibold">
                  {userInfo?.username || "N/A"}
                </h2>
                <p className="text-sm text-gray-500">
                  Tham gia: {userInfo?.createdAt || "N/A"}
                </p>

                <div className="mt-3">
                  <span className="flex items-center justify-center px-3 py-1 text-sm text-yellow-800 rounded-full bg-yellow-50">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {userInfo?.points || "0"} điểm
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Thông tin cá nhân</h3>
                <button
                  className="flex items-center text-green-500"
                  onClick={() => {
                    setValue("openUpdateForm", true);
                  }}
                >
                  <FiEdit2 className="mr-1" />
                  Chỉnh sửa
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-3">
                  <div className="text-sm text-gray-500">Ngày sinh</div>
                  <div className="font-medium md:col-span-2">
                    {userInfo?.birthday || "N/A"}
                  </div>
                </div>

                <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-3">
                  <div className="text-sm text-gray-500">Giới tính</div>
                  <div className="font-medium md:col-span-2">
                    {userInfo?.gender || "N/A"}
                  </div>
                </div>

                <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-3">
                  <div className="text-sm text-gray-500">Số điện thoại</div>
                  <div className="flex items-center font-medium md:col-span-2">
                    {userInfo?.phoneNumber || "N/A"}
                    {currentUser.isPhoneVerified && (
                      <span className="ml-2 rounded bg-green-100 px-2 py-0.5 text-xs text-green-600">
                        Đã xác thực
                      </span>
                    )}
                    <button
                      className="ml-2"
                      onClick={() => {
                        setIsPhoneModalOpen(true);
                      }}
                    >
                      <FiEdit2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-3">
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="flex items-center font-medium md:col-span-2">
                    {userInfo?.email || "N/A"}
                    {currentUser.isEmailVerified && (
                      <span className="ml-2 rounded bg-green-100 px-2 py-0.5 text-xs text-green-600">
                        Đã xác thực
                      </span>
                    )}
                    <button className="ml-2">
                      <FiEdit2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-3">
                  <div className="text-sm text-gray-500">Facebook</div>
                  <div className="flex items-center font-medium md:col-span-2">
                    {userInfo?.facebook || "Thêm liên kết"}
                    <button className="ml-2">
                      <FiEdit2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-3">
                  <div className="text-sm text-gray-500">Google</div>
                  <div className="flex items-center font-medium md:col-span-2">
                    {userInfo?.google || "Thêm liên kết"}
                    <button className="ml-2">
                      <FiEdit2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-3">
                  <div className="text-sm text-gray-500">Số CMND</div>
                  <div className="font-medium md:col-span-2">
                    {userInfo?.citizenId || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Driver License
        <div className="p-6 mt-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold">Giấy phép lái xe</h3>
              <span className="px-3 py-1 ml-3 text-sm text-green-600 bg-green-100 rounded-full">
                Đang chờ xác thực
              </span>
            </div>
            <button className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
              <span>Chỉnh sửa</span>
              <FiEdit2 className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="p-3 mt-3 rounded-md bg-red-50">
            <p className="text-sm text-red-600">
              Lưu ý: để tránh phát sinh vấn đề trong quá trình thuê xe, người
              đặt xe trên Mioto (đã xác thực GPLX)
              <span className="font-bold text-red-700"> ĐỒNG THỜI </span>
              phải là người nhận xe.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
            <div>
              <h4 className="mb-3 font-medium">Hình ảnh</h4>
              <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                <img
                  src="https://www.mioto.vn/static/media/gplx-sample.8412e228.png"
                  alt="Driver License"
                  className="object-cover w-full"
                />
              </div>
              <div className="mt-3">
                <button className="flex items-center text-sm text-blue-600">
                  <svg
                    className="w-5 h-5 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 8V16M8 12H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Vì sao tôi phải xác thực GPLX
                </button>
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-medium">Thông tin chung</h4>

              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-xs text-gray-500">Số GPLX</p>
                  <div className="px-4 py-3 rounded-lg bg-gray-50">
                    {userInfo?.drivingLicense || "000000000000"}
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-xs text-gray-500">Họ và tên</p>
                  <div className="px-4 py-3 uppercase rounded-lg bg-gray-50">
                    {userInfo?.username || "N/A"}
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-xs text-gray-500">Ngày sinh</p>
                  <div className="px-4 py-3 rounded-lg bg-gray-50">
                    {userInfo?.birthday}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Driver License */}
        <div className="p-6 mt-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold">Giấy phép lái xe</h3>
              {!isDriverLicenseEditMode && (
                <>
                  {userInfo?.verifiedLicense === "VERIFIED" && (
                    <span className="px-3 py-1 ml-3 text-sm text-green-600 bg-green-100 rounded-full">
                      Đã xác thực
                    </span>
                  )}
                  {userInfo?.verifiedLicense === "UNVERIFIED" && (
                    <span className="px-3 py-1 ml-3 text-sm text-red-600 bg-red-100 rounded-full">
                      Xác thực thất bại
                    </span>
                  )}
                  {userInfo?.verifiedLicense === "WAITING" &&
                    userInfo?.drivingLicense && (
                      <span className="px-3 py-1 ml-3 text-sm text-yellow-600 bg-yellow-100 rounded-full">
                        Đang chờ xác thực
                      </span>
                    )}
                </>
              )}
            </div>
            {!isDriverLicenseEditMode ? (
              <button
                className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setIsDriverLicenseEditMode(true)}
              >
                <span>Chỉnh sửa</span>
                <FiEdit2 className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => {
                    setIsDriverLicenseEditMode(false);
                    setTempLicenseImage(null);
                    // Reset form data to original values
                    const info = userInfo || {};
                    setLicenseFormData({
                      drivingLicense: info.drivingLicense || "",
                      licenseFullName: info.licenseFullName || "",
                      licenseBirthday: info.licenseBirthday || "",
                    });
                  }}
                >
                  <span>Huỷ</span>
                </button>
                <button
                  className="flex items-center px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                  onClick={updateDriverLicense}
                  disabled={
                    !licenseFormData.drivingLicense ||
                    !licenseFormData.licenseFullName ||
                    !licenseFormData.licenseBirthday ||
                    (!tempLicenseImage && !licenseImage)
                  }
                >
                  <span>Cập nhật</span>
                </button>
              </div>
            )}
          </div>

          <div className="p-3 mt-3 rounded-md bg-red-50">
            <p className="text-sm text-red-600">
              Lưu ý: để tránh phát sinh vấn đề trong quá trình thuê xe,{" "}
              <span className="underline">người đặt xe</span> trên Mioto (đã xác
              thực GPLX){" "}
              <span className="font-bold text-red-700">ĐỒNG THỜI</span> phải là{" "}
              <span className="underline">người nhận xe</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
            <div>
              <h4 className="mb-3 font-medium">Hình ảnh</h4>
              {isDriverLicenseEditMode ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center overflow-hidden bg-gray-200 border border-gray-300 rounded-lg h-60">
                    {tempLicenseImage ? (
                      <div className="relative w-full h-full">
                        <img
                          src={tempLicenseImage}
                          alt="Driver License"
                          className="object-cover w-full h-full"
                        />
                        <button
                          className="absolute p-1 bg-white rounded-full shadow-md top-2 right-2"
                          onClick={() => setTempLicenseImage(null)}
                        >
                          <FiX className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ) : licenseImage ? (
                      <div className="relative w-full h-full">
                        <img
                          src={licenseImage}
                          alt="Driver License"
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                          <FiCamera className="w-16 h-16 mb-2 text-white" />
                          <p className="text-sm font-medium text-white">
                            Nhấp để thay đổi hình ảnh
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center">
                        <FiCamera className="w-16 h-16 mb-2 text-green-500" />
                        <p className="text-sm font-medium text-gray-700">
                          Tải ảnh GPLX lên
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Nhấp để tải lên ảnh giấy phép lái xe
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="license-image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleLicenseImageUpload}
                  />
                  <label
                    htmlFor="license-image-upload"
                    className="block w-full px-4 py-2 text-sm text-center text-white bg-green-500 rounded-md cursor-pointer hover:bg-green-600"
                  >
                    Tải ảnh lên
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-center overflow-hidden bg-gray-200 border border-gray-300 rounded-lg h-60">
                  {licenseImage ? (
                    <img
                      src={licenseImage}
                      alt="Driver License"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <FiCamera className="w-16 h-16 mb-2 text-gray-400" />
                      <p className="text-sm font-medium text-gray-500">
                        Chưa có hình ảnh GPLX
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Nhấp chỉnh sửa để tải lên
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-3">
                <button className="flex items-center text-sm text-blue-600">
                  <svg
                    className="w-5 h-5 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 8V16M8 12H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Vì sao tôi phải xác thực GPLX
                </button>
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-medium">Thông tin chung</h4>

              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-xs text-gray-500">Số GPLX</p>
                  {isDriverLicenseEditMode ? (
                    <input
                      type="text"
                      name="drivingLicense"
                      value={licenseFormData.drivingLicense}
                      onChange={handleDriverLicenseChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Nhập số GPLX đã cấp"
                    />
                  ) : (
                    <div className="px-4 py-3 rounded-lg bg-gray-50">
                      {userInfo?.drivingLicense || "Nhập số GPLX đã cấp"}
                    </div>
                  )}
                </div>

                <div>
                  <p className="mb-1 text-xs text-gray-500">Họ và tên</p>
                  {isDriverLicenseEditMode ? (
                    <input
                      type="text"
                      name="licenseFullName"
                      value={licenseFormData.licenseFullName}
                      onChange={handleDriverLicenseChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Nhập đầy đủ họ tên"
                    />
                  ) : (
                    <div className="px-4 py-3 uppercase rounded-lg bg-gray-50">
                      {userInfo?.licenseFullName || "Nhập đầy đủ họ tên"}
                    </div>
                  )}
                </div>

                <div>
                  <p className="mb-1 text-xs text-gray-500">Ngày sinh</p>
                  {isDriverLicenseEditMode ? (
                    <input
                      type="text"
                      name="licenseBirthday"
                      value={licenseFormData.licenseBirthday}
                      onChange={handleDriverLicenseChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="DD/MM/YYYY"
                    />
                  ) : (
                    <div className="px-4 py-3 rounded-lg bg-gray-50">
                      {userInfo?.licenseBirthday || "DD/MM/YYYY"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="p-6 mt-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Thẻ của tôi</h3>
            <button className="text-sm text-blue-500">Thêm thẻ</button>
          </div>
          <div className="flex justify-center mt-4">
            <div className="max-w-xs py-12">
              <img
                src="https://www.mioto.vn/static/media/empty-card.b1670571.svg"
                alt="No Card"
                className="h-32 mx-auto"
              />
              <p className="mt-4 text-center text-gray-500">
                Bạn chưa có thẻ nào
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar View Modal */}
      {isAvatarModalOpen && avatar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl max-h-[90vh] p-2 bg-white rounded-lg"
          >
            <button
              onClick={() => setIsAvatarModalOpen(false)}
              className="absolute p-1 text-gray-500 bg-white rounded-full top-2 right-2 hover:text-gray-700"
            >
              <FiX className="w-6 h-6" />
            </button>
            <img
              src={avatar}
              alt={userInfo.username}
              className="w-[600px] h-auto object-contain"
            />
          </div>
        </div>
      )}

      {/* Avatar Edit Modal */}
      {isAvatarEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Cập nhật ảnh đại diện</h2>
              <button
                onClick={() => setIsAvatarEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-center">
                <div className="w-32 h-32 overflow-hidden bg-gray-100 rounded-full">
                  <img
                    src={avatar}
                    alt={userInfo.username}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Tải lên ảnh đại diện mới
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 px-4 py-6 transition bg-white border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Nhấp để tải lên</span> hoặc
                    kéo và thả
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF tối đa 2MB
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={updateAvatar}
                />
              </label>
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setIsAvatarEditModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Hủy
              </button>
              {/* <button
                onClick={() => {
                  setIsAvatarEditModalOpen(false);
                }}
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Xóa ảnh
              </button> */}
            </div>
          </div>
        </div>
      )}

      {/* Edit Information Modal */}
      {openUpdateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Cập nhật thông tin</h2>
              <button
                onClick={() => setValue("openUpdateForm", false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(updateProfile)}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm text-gray-700">
                    Tên tài khoản
                  </label>
                  <input
                    type="text"
                    // onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={userInfo.username}
                    {...register("username", { required: true })}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm text-gray-700">
                    Ngày sinh
                  </label>
                  <input
                    type="text"
                    // onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={userInfo.birthday}
                    {...register("birthday", { required: true })}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm text-gray-700">
                    Giới tính
                  </label>
                  <select
                    name="gender"
                    // onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    {...register("gender", { required: true })}
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-sm text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    // onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={userInfo.phoneNumber}
                    {...register("phoneNumber", { required: true })}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    // onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={userInfo.email}
                    {...register("email", { required: true })}
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Phone Update Modal */}
      {isPhoneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Cập nhật số điện thoại</h2>
              <button
                onClick={() => setIsPhoneModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handlePhoneSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="+84xxxxxxxxx"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
