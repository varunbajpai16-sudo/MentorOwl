import { Camera } from "lucide-react";

const AvatarBlock = ({ name, avatar, isEditing, onAvatarChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onAvatarChange(file);
    }
  };

  return (
    <div className="relative w-fit">
      <img
        src={
          avatar instanceof File
            ? URL.createObjectURL(avatar)
            : avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                name || "Teacher"
              )}&background=7C3AED&color=fff`
        }
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