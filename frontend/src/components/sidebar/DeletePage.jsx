import { useNavigate, useParams } from "react-router-dom";
import trash from "../../assets/trash.svg";
import useDeletePage from "../../hooks/page/useDeletePage";

const DeletePage = ({deleteId}) => {
    const {deletePage} = useDeletePage(deleteId);
    const {id} = useParams();
    const navigate = useNavigate();


    const handleClick = async() => {
        await deletePage();
        if(deleteId === id)
          return navigate("/");
    }
  return (
    <button onClick={handleClick} className="hover:bg-neutral-700 rounded-md p-1 w-max">
        <img src={trash} alt="Delete"/>
    </button>
  )
}

export default DeletePage