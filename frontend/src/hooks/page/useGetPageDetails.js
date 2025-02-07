import axios from "axios";
import { useEffect, useState } from "react"
import { useAuthContext } from "../../context/AuthContext";
import { usePageDetailsContext } from "../../context/PageDetailsContext";

const useGetPageDetails = (id) => {
    const [loading, setLoading] = useState(false);
    const {authUser} = useAuthContext();
    const {setPage} = usePageDetailsContext();
    
    useEffect(() => {
        const getPageDetails = async() => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/page?pageId=${id}`, {
                    headers: {
                        Authorization: `Bearer ${authUser.jwt}`
                    }
                });
                if(response.status === 200) {
                    setPage(response.data);
                    console.log(response.data);
                }
                    
            } catch(error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getPageDetails();
    }, [id, authUser, setPage])

    return {loading};
  
}

export default useGetPageDetails