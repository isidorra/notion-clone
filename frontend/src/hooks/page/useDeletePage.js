import axios from "axios"
import { usePageContext } from "../../context/PageContext"
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
const useDeletePage = (id) => {
    const {setPages} = usePageContext();
    const {authUser} = useAuthContext();

  const deletePage = async() => {
    try {
        const response = await axios.delete("/api/page/" + id, {
            headers: {
              Authorization: `Bearer ${authUser.jwt}`
            }
          });
        if(response.status === 200) {
            setPages((prevPages) => prevPages.filter(page => !response.data.includes(page.id)));
            toast.success("Page(s) deleted successfully!");
        }
    } catch(error) {
        toast.error("Error deleting page(s): " + error.response.data.message);
    }
  }

  return {deletePage};
}

export default useDeletePage