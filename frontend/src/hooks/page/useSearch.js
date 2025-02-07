import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

const useSearch = (query) => {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(null);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!query.trim()) {
      setPages(null);
      return;
    }

    const controller = new AbortController();
    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/page/search?query=${query}`, {
          headers: {
            Authorization: `Bearer ${authUser.jwt}`,
          },
          signal: controller.signal,
        });

        if (response.status === 200) {
          setPages(response.data);
        }
      } catch (error) {
        if (error.name !== "CanceledError") console.log(error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(delayDebounceFn);
      controller.abort();
    };
  }, [query, authUser]);

  return { loading, pages };
};

export default useSearch;
