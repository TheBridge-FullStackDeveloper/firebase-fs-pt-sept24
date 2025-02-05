import { useForm } from "react-hook-form";

/* eslint-disable react/prop-types */
const UserForm = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <label htmlFor="">
        First Name
        <input {...register("first")} />
      </label>
      <label htmlFor="">
        LastName
        <input {...register("last")} />
      </label>
      <label htmlFor="">
        Born
        <input {...register("born")} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
