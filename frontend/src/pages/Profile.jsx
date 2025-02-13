import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</h2>
      
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-semibold text-gray-700">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div className="text-lg">
          <p><span className="font-semibold">Name:</span> {user?.name}</p>
          <p><span className="font-semibold">Email:</span> {user?.email}</p>
        </div>

        {/* <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Edit Profile
        </button> */}
      </div>
    </div>
  );
};

export default Profile;
