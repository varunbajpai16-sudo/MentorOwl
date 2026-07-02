import { Camera } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../services/axios";
import { useEffect } from "react";
const AvatarBlock = ({ name, avatar, isEditing }) => {
  const onAvatarChange = async (file) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await api.post("/user/changeavatar", formData);

      const user = JSON.parse(localStorage.getItem("user"));

      user.avatar = response.data.user.avatar;

      localStorage.setItem("user", JSON.stringify(user));

      console.log("Avatar updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to change avatar. Please try again.");
    }
  };
  const user = useSelector((state) => state.auth.user);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        onAvatarChange(file);
    }
  };
  const avatarUrl =
    user?.avatar ||
    avatar ||
    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`;

  console.log("user.avatar:", user?.avatar);
  console.log("avatar prop:", avatar);
  console.log("final:", avatarUrl);

  return (
    <div className="relative w-fit">
      <img
        src={avatarUrl}
        alt={name}
        className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
      />

      {isEditing && (
        <>
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-purple-600 text-white shadow-md hover:bg-purple-700"
          >
            <Camera size={16} />
          </label>

          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
};

export default AvatarBlock;
