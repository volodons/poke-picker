import React from "react";
import { StarIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export interface SubmitButtonProps {
  onSubmit: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit }) => {
  return (
    <button
      className="w-40 flex items-center justify-between bg-blue-500 font-bold text-white p-2 rounded-md transition duration-300 ease-in-out transform hover:bg-blue-400 focus:outline-none focus:ring focus:border-blue-500"
      type="button"
      onClick={onSubmit}
    >
      <StarIcon className="w-6 h-6" />
      Submit
      <ChevronDownIcon className="w-6 h-6" />
    </button>
  );
};

export default SubmitButton;