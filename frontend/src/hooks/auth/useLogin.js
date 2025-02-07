import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (email, password) => {
    if (!validInputs(email, password)) return;

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setAuthUser(response.data);
        toast.success("You have successfully logged in!");
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

  return { loading, login };
};

const validInputs = (email, password) => {
  if (!email || !password) {
    toast.error("All fields are required.");
    return false;
  }

  return true;
};
export default useLogin;
