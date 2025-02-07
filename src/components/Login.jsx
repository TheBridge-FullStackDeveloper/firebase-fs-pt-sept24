import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../config/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import  { Link } from "react-router";

const loginAuthGoogle = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Usuario logueado con éxito:", userCredential.user);
  } catch (error) {
    console.error("Error al loguear el usuario:", error);
  }
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: (payload) => {
      loginAuthGoogle(payload.email, payload.password);
    },
  });

  return (
    <div>
      <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
