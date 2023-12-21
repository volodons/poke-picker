import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "../select/select";
import axios from "axios";

const Form: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);

  const onSubmit = async (data: any) => {
    try {
      if (selectedPokemons.length === 4) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
          firstName: data.firstName,
          lastName: data.lastName,
          selectedPokemons: selectedPokemons,
        });
        reset();
        setSelectedPokemons([]);
      } else {
        alert('Please choose exactly 4 pokemons.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  useEffect(() => {
    console.log("Selected Pokemon state changed:", selectedPokemons);
  }, [selectedPokemons]);

  return (
    <div className="container mx-auto mt-8">
      <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-4">
          First name:
          <input
            className="mt-1 p-2 w-full border rounded-md"
            {...register("firstName", {
              required: "First name is required",
              pattern: {
                value: /^[a-zA-Z]{2,12}$/,
                message: "First name must be between 2 and 12 characters long, and only alphabetic characters (A-Z, a-z) are allowed."
              }
            })}
          />
          {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
        </label>

        <label className="block mb-4">
          Last name:
          <input
            className="mt-1 p-2 w-full border rounded-md"
            {...register("lastName", {
              required: "Last name is required",
              pattern: {
                value: /^[a-zA-Z]{2,12}$/,
                message: "Last name must be between 2 and 12 characters long, and only alphabetic characters (A-Z, a-z) are allowed."
              }
            })}
          />
          {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
        </label>

        <Select onSelect={(selectedPokemon) => setSelectedPokemons(selectedPokemon)}/>

        <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
