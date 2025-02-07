import { Navigate, Route, Routes } from "react-router-dom";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NonAuthenticatedLayout from "./components/layout/NonAuthenticatedLayout";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import Page from "./pages/Page";
import Search from "./pages/Search";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <ProtectedLayout/> : <NonAuthenticatedLayout />}>
          <Route index element={!authUser ? <Hero /> : <Home/>} />
          <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"}/>} />
          <Route path="/sign-up" element={!authUser ? <Register /> : <Navigate to={"/"}/>} />
          <Route path="/page/:id" element={authUser ? <Page/> : <Navigate to={"/"}/>}/>
          <Route path="/search" element={authUser ? <Search/> : <Navigate to={"/"}/>}/>
        </Route>
       
      </Routes>

      <Toaster
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "white",
          },
        }}
      />
    </>
  );
}

export default App;
