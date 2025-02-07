import { useEffect, useState } from "react"
import { useAuthContext } from "../../context/AuthContext";
import { usePageContext } from "../../context/PageContext";
import axios from "axios";

const useGetPages = () => {
  const [loading, setLoading] = useState(false);
  const {authUser} = useAuthContext();
  const {setPages} = usePageContext();

  useEffect(() => {
    const getPages = async() => {
      setLoading(true);
      try{
        const response = await axios.get("/api/page/user-pages", {
          headers: {
            Authorization: `Bearer ${authUser.jwt}`
          }
        });
        if(response.status === 200)
          setPages(response.data);

      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getPages();

  }, [setPages, authUser])

  return {loading};
}

export default useGetPages