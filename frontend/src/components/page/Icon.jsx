import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import useUpdatePage from "../../hooks/page/useUpdatePage";

const Icon = ({ id, icon }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(icon ? icon : "📄");
  const [isEmojiPicked, setIsEmojiPicked] = useState(false);
  const {loading, update} = useUpdatePage();

  const handleEmoji = (ev) => {
    setIsEmojiPicked(true);
    setPickedEmoji(ev.emoji)
  }

  const handleUpdate = async() => {
    await update({id, icon: pickedEmoji});
    setIsEmojiPicked(false);
  }

  return (
    <div>
      <div
        className="flex items-end gap-5 pt-10"
        onMouseOver={() => setShowEditBtn(true)}
        onMouseLeave={() => setShowEditBtn(false)}
      >
        <div className="text-7xl -mt-10">
          {}
          {pickedEmoji ? <span>{pickedEmoji}</span> : (icon ? <span>{icon}</span> : <span>📄</span>)}
        </div>
        {showEditBtn && (
          <button onClick={() => setShowPicker(!showPicker)} className="text-sm rounded-md p-2 text-neutral-500 hover:bg-neutral-700 hover:text-[#d4d4d4] duration-200">
            {showPicker ? <span>Close</span> : <span>Edit Icon</span>}
          </button>
        )}
        {isEmojiPicked && (
          <button onClick={handleUpdate} className="text-sm rounded-md p-2 text-neutral-500 hover:bg-neutral-700 hover:text-[#d4d4d4] duration-200">
            Save
          </button>
        )}
      </div>
      <EmojiPicker onEmojiClick={handleEmoji}  open={showPicker} theme="dark" />

      {loading && <span className="light-loader"></span>}
    </div>
  );
};

export default Icon;
