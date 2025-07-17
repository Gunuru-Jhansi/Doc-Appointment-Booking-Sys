import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { Eye,EyeOff } from "lucide-react";


const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShow = () => setShowPassword((prev) => !prev);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user._id);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user._id);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div>
      <div>
        <ThemeToggle />
      </div>
      <form
        onSubmit={onSubmitHandler}
        className="min-h-[80vh] flex items-center"
      >
        <div className="flex flex-col gap-3 m-auto bg-gray-300 dark:bg-gray-800 items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 dark:text-gray-100 text-sm:shadow-lg">
          <p className="text-2xl font-semibold">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </p>
          <p>
            Please {state === "Sign Up" ? "Sign Up" : "log In"} to book appointment{" "}
          </p>
          {state === "Sign Up" && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                className="border dark:bg-gray-500 border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}
          <div className="w-full">
            <p>Email</p>
            <input
              className="border dark:bg-gray-500 border-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <div className="relative mt-1">
            <input
              className="border dark:bg-gray-500 border-zinc-300 rounded w-full p-2 pr-10"
              type={showPassword?"text":"password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button
          type="button"
          onClick={toggleShow}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-white-500 hover:text-black focus:outline-none"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        </div>
          </div>
          <button
            type="submit"
            className="bg-primary dark:bg-secondary dark:text-black text-white w-full py-2 rounded-md text-base"
          >
            {state === "Sign Up" ? "Create Account" : "Login"}
          </button>
          {state === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-primary dark:text-secondary underlined cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-primary dark:text-secondary underlined cursor-pointer"
              >
                click here
              </span>{" "}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
