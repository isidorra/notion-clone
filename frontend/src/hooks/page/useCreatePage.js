import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { usePageContext } from "../../context/PageContext";
import { useState } from "react";

const useCreatePage = (parentPageId) => {
    const {authUser} = useAuthContext();
    const {setPages} = usePageContext();
    const [createdId, setCreatedId] = useState("");

  const createPage = async() => {
    try{
        const response = await axios.post("/api/page", {parentPageId}, {
            headers: {
                Authorization: `Bearer ${authUser.jwt}`
            }
        });
        if(response.status === 201) {
            setPages((prevPages) => [...prevPages, response.data]);
            setCreatedId(response.data.id);
        }
            
    } catch(error) {
        console.log(error);
    }
  }

  return {createPage, createdId};
}

export default useCreatePage