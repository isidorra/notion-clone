import { createContext, useContext, useState } from "react";

export const PageDetailsContext = createContext();

export const usePageDetailsContext = () => {
    return useContext(PageDetailsContext);
}

export const PageDetailsContextProvider = ({children}) => {
    const [page, setPage] = useState(null);

    return <PageDetailsContext.Provider value={{page, setPage}}>
        {children}
    </PageDetailsContext.Provider>
}