import { FaUser } from "react-icons/fa6";

export default function User() {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <FaUser className="w-10 h-10 text-gray-400 relative top-1" />
    </div>
  );
}
