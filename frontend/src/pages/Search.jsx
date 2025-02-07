import { useState } from "react";
import searchIcon from "../assets/search.svg";
import useSearch from "../hooks/page/useSearch";
import { LoaderIcon } from "react-hot-toast";
import PageCard from "../components/page/PageCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const { loading, pages } = useSearch(query);

  return (
    <div className="px-5 py-16 sm:p-10">
      <form
        onSubmit={(e) => e.preventDefault()} // Prevent form submission
        className="flex items-center justify-center gap-2 border border-[#d4d4d4] rounded-md border-opacity-30 px-5 py-2"
      >
        <img src={searchIcon} className="opacity-50" />
        <input
          value={query}
          onChange={(ev) => setQuery(ev.target.value)}
          placeholder="Search..."
          className="outline-none bg-transparent w-full text-lg opacity-50 focus:opacity-100"
        />
      </form>

      {loading && <LoaderIcon />}
      {!loading && pages?.length === 0 && <p className="opacity-60 mt-2 text-sm">No results found.</p>}

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5 mt-3">
        {!loading &&
          pages?.map((page) => <PageCard key={page.id} page={page} />)}
      </div>
    </div>
  );
};

export default Search;
