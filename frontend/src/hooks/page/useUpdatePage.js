import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { usePageDetailsContext } from "../../context/PageDetailsContext";
import { usePageContext } from "../../context/PageContext";

const useUpdatePage = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();
  const { setPage } = usePageDetailsContext();
  const { setPages } = usePageContext();

  const update = async ({ id, title, icon, content, cover }) => {
    setLoading(true);

    const dataToUpdate = {};
    dataToUpdate.id = id;
    if (title !== null && title !== undefined) dataToUpdate.title = title;
    if (icon !== null && icon !== undefined) dataToUpdate.icon = icon;
    if (content !== null && content !== undefined)
      dataToUpdate.content = content;
    if (cover !== null && cover !== undefined) dataToUpdate.cover = cover;

    try {
      const response = await axios.put(`/api/page`, dataToUpdate, {
        headers: {
          Authorization: `Bearer ${authUser.jwt}`,
        },
      });
      if (response.status === 200) {
        setPage((prevPage) => ({
          ...prevPage,
          ...response.data,
        }));

        setPages((prevPages) =>
          prevPages.map((p) => (p.id === id ? { ...p, ...response.data } : p))
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, update };
};

export default useUpdatePage;
