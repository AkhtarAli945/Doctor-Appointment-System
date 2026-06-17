import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address || {}));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } },
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (!userData) return null;

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm pb-10">
      {/* Profile Image */}
      {isEdit ? (
        <label
          htmlFor="image"
          className="inline-block w-36 cursor-pointer mt-4"
        >
          <div className="relative w-36 h-36">
            <img
              className="w-36 h-36 rounded object-cover opacity-75"
              src={
                image
                  ? URL.createObjectURL(image)
                  : userData.image || assets.profile_pic
              }
              alt="profile"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* ✅ Fixed: assets.upload_area not assets.upload_icon */}
              <img className="w-10" src={assets.upload_area} alt="upload" />
            </div>
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      ) : (
        <img
          className="w-36 h-36 rounded object-cover mt-4"
          src={userData.image || assets.profile_pic}
          alt="profile"
        />
      )}

      {/* Name */}
      {isEdit ? (
        <input
          className="bg-gray-200 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />

      {/* Contact Information */}
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-400">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-gray-700 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-1">
              <input
                className="border border-gray-300 rounded px-2 py-1 text-gray-700 bg-gray-50 w-full"
                type="text"
                placeholder="Address Line 1"
                value={userData.address?.line1 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                className="border border-gray-300 rounded px-2 py-1 text-gray-700 bg-gray-50 w-full"
                type="text"
                placeholder="Address Line 2"
                value={userData.address?.line2 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <p className="text-gray-500">
              {userData.address?.line1 || "—"}
              <br />
              {userData.address?.line2 || ""}
            </p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
      </div>

      <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
        <p className="font-medium">Gender:</p>
        {isEdit ? (
          <select
            className="max-w-28 bg-gray-100 border border-gray-300 rounded px-2 py-1 text-gray-700"
            value={userData.gender}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, gender: e.target.value }))
            }
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        ) : (
          <p className="text-gray-400">{userData.gender}</p>
        )}

        <p className="font-medium">Birthday:</p>
        {isEdit ? (
          <input
            className="max-w-40 bg-gray-100 border border-gray-300 rounded px-2 py-1 text-gray-700"
            type="date"
            value={
              userData.dob && userData.dob !== "Not Selected"
                ? userData.dob
                : ""
            }
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, dob: e.target.value }))
            }
          />
        ) : (
          <p className="text-gray-400">
            {userData.dob && userData.dob !== "Not Selected"
              ? userData.dob
              : "Not Selected"}
          </p>
        )}
      </div>

      {/* Save / Edit Button */}
      <div className="mt-10">
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary-500 hover:text-white transition-all"
            onClick={updateUserProfileData}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary-500 hover:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit Information
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
