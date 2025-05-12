import { Eye } from "lucide-react";
import "./EyeBlink.css"; // Import custom CSS

export default function EyeBlinkButton() {
  return (
    <button className="absolute top-2 right-2 bg-teal-400 p-2 w-12  h-8 rounded-t-[60%] rounded-b-[60%] shadow-md overflow-hidden eye-container flex items-center justify-center ">
      <Eye size={24} className="text-gray-100 eye-icon" />
      <div className="eyelid"></div>
    </button>
  );
}
