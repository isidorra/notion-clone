import { useNavigate } from "react-router-dom";
import useCreatePage from "../../hooks/page/useCreatePage"

const AddPage = ({parentPageId}) => {
    const {createPage, createdId} = useCreatePage(parentPageId);
    const navigate = useNavigate();

    const handleClick = async() => {
        await createPage();
        console.log(createdId);
        if(createdId)
            return navigate(`/page/${createdId}`);
        
    }
  return (
    <button onClick={handleClick} className="text-lg hover:bg-neutral-700 rounded-md px-2">+</button>
  )
}

export default AddPage