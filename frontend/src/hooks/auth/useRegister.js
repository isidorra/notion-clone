import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const register = async (name, email, password, confirmPassword) => {
    if (!validInputs(name, email, password, confirmPassword)) return;

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setAuthUser(response.data);
        toast.success("You have successfully signed up!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, register };
};

const validInputs = (name, email, password, confirmPassword) => {
  if (!name || !email || !password || !confirmPassword) {
    toast.error("All fields are required.");
    return false;
  }

  const emailRegex =
    /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    toast.error("Invalid email format.");
    return false;
  }

  if (password.length < 7) {
    toast.error("Password must be at least 7 characters long.");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords must match.");
    return false;
  }

  return true;
};

export default useRegister;
