import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "../select/select";
import axios from "axios";
import SubmitButton from "../submitButton/submitButton";
import Modal from "../modal/modal";
import { MOCKUP_API_URL } from "../../constants/api/urls";

const Form: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      if (selectedPokemons.length === 4) {
        const response = await axios.post(`${MOCKUP_API_URL}`, {
          firstName: data.firstName,
          lastName: data.lastName,
          selectedPokemons: selectedPokemons,
        });
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-8">
      <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit(onSubmit)}>
        <label className="block mt-4 text-sm font-medium text-gray-700">
          First name:
          <input
            className={`my-2 p-2 w-full border-2 rounded-md focus:outline-none ${errors.firstName ? 'border-red-500' : 'focus:border-blue-500 hover:border-blue-400'}`}
            {...register("firstName", {
              required: "First name is required.",
              pattern: {
                value: /^[a-zA-Z]{2,12}$/,
                message: "First name must be between 2 and 12 characters long, and only alphabetic characters (A-Z, a-z) are allowed."
              }
            })}
            placeholder="Enter your first name"
          />
          {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
        </label>

        <label className="block mt-4 text-sm font-medium text-gray-700">
          Last name:
          <input
            className={`my-2 p-2 w-full border-2 rounded-md focus:outline-none ${errors.lastName ? 'border-red-500' : 'focus:border-blue-500 hover:border-blue-400'}`}
            {...register("lastName", {
              required: "Last name is required.",
              pattern: {
                value: /^[a-zA-Z]{2,12}$/,
                message: "Last name must be between 2 and 12 characters long, and only alphabetic characters (A-Z, a-z) are allowed."
              }
            })}
            placeholder="Enter your last name"
          />
          {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
        </label>

        <Select onSelect={(selectedPokemon) => setSelectedPokemons(selectedPokemon)}/>

        <div className="flex justify-center m-8">
          <SubmitButton onSubmit={handleSubmit(onSubmit)} />
        </div>
      </form>

      {isModalOpen && (
        <Modal selectedPokemons={selectedPokemons} onClose={closeModal} />
      )}
    </div>
  );
};

export default Form;
