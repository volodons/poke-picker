import React from "react";
import { useForm } from "react-hook-form";

const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(`Hello, ${data}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">
          First name:
          <input
            id="firstName"
            {...register("firstName", {
              required: "First name is required",
              pattern: {
                value: /^[a-zA-Z]{2,12}$/,
                message: "First name must be between 2 and 12 characters long, and only alphabetic characters (A-Z, a-z) are allowed."
              }
            })}
          />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </label>

        <label htmlFor="lastName">
          Last name:
          <input
            id="lastName"
            {...register("lastName", {
              required: "Last name is required",
              pattern: {
                value: /^[a-zA-Z]{2,12}$/,
                message: "Last name must be between 2 and 12 characters long, and only alphabetic characters (A-Z, a-z) are allowed."
              }
            })}
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
