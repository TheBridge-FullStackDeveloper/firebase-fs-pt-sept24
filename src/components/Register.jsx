import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../config/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router";

const registerAuthGoogle = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Usuario registrado con éxito:", userCredential.user);
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: (payload) => {
      registerAuthGoogle(payload.email, payload.password);
    },
  });

  return (
    <div>
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="email"
          placeholder="email@test.com"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;
