import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
// import "@blocknote/react/style.css";
import "@blocknote/mantine/style.css";
import "../../editor.css";
import useUpdatePage from "../../hooks/page/useUpdatePage";
import { useEffect, useRef } from "react";

const Editor = ({ id, content }) => {
  const { loading, update } = useUpdatePage();

  const editor = useCreateBlockNote({
    initialContent: content ? JSON.parse(content) : undefined,
  });

  // Ref to hold the debounce timer
  const debounceTimer = useRef(null);

  const handleUpdate = async () => {
    await update({ id, content: JSON.stringify(editor.document) });
  };

  const debouncedUpdate = () => {
    // Clear the previous timer if changes happen before the timeout
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set a new timer to trigger the update after 1 second (adjustable)
    debounceTimer.current = setTimeout(() => {
      handleUpdate();
    }, 1000);  // 1000 ms (1 second)
  };

  useEffect(() => {
    // Cleanup the timer when the component unmounts or editor changes
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="mt-10">
      <BlockNoteView 
        editor={editor} 
        editable={true} 
        theme={"dark"} 
        onChange={debouncedUpdate}  // Use the debounced version
      />
    </div>
  );
};

export default Editor;
