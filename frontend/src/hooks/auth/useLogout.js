import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const logout = () => {
    setLoading(true);
    try {
        localStorage.removeItem("user");
        setAuthUser(null);
    } catch(error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  }

  return {loading, logout};
}

export default useLogout