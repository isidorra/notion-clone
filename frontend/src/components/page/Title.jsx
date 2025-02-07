import { useState } from "react";
import useUpdatePage from "../../hooks/page/useUpdatePage";

const Title = ({ id, title }) => {
  const [input, setInput] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const { loading, update } = useUpdatePage();

  const handleUpdate = async () => {
    await update({ id, title: input });
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsEditing(false); 
    }, 100); 
  };

  return (
    <div className="mt-5">
      <input
        value={input}
        onChange={(ev) => setInput(ev.target.value)}
        onFocus={() => setIsEditing(true)}
        onBlur={handleBlur}
        placeholder="Untitled"
        className="text-4xl font-semibold bg-transparent border-0 outline-none w-full"
      />
      {isEditing && (
        <button
        onClick={handleUpdate}
        className="text-sm rounded-md p-2 text-neutral-500 hover:bg-neutral-700 hover:text-[#d4d4d4] duration-200"
      >
        Save Title
      </button>
      )}
      
      {loading && <span className="light-loader"></span>}
    </div>
  );
};

export default Title;
