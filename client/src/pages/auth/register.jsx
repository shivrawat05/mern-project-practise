import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    userName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

const AuthRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Data", data);

    dispatch(registerUser(data)).then((response) => {
      if (response?.payload?.success === true) {
        toast.success(response?.payload?.message);
        navigate("/auth/login");
      } else {
        toast.error(response.payload.message);
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tigth text-foreground">
          Register to your account
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium" htmlFor="email">
            UserName
          </label>
          <input
            {...register("userName")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.userName?.type === "required" && (
            <p role="alert" className="text-sm text-red-500">
              UserName is required
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            {...register("email")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.email?.type === "required" && (
            <p role="alert" className="text-sm text-red-500">
              Email is required
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Password</label>
          <input
            {...register("password")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.password && (
            <p role="alert" className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-2 rounded-md bg-black px-4 py-2 text-white font-medium hover:bg-gray-800 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};
export default AuthRegister;
