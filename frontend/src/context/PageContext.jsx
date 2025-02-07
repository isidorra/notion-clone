import { createContext, useContext, useState } from "react";

export const PageContext = createContext();

export const usePageContext = () => {
    return useContext(PageContext);
}

export const PageContextProvider = ({children}) => {
    const [pages, setPages] = useState([]);

    return <PageContext.Provider value={{pages, setPages}}>
        {children}
    </PageContext.Provider>
}