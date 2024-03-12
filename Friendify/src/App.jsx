import { useContext, useState } from "react";
import Login from "./pages/login/Login";
import "./app.scss";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { DarkModeContext } from "./context/DarkModeContext";
import { AuthContext } from "./context/authContext";
import Stories from "./components/stories/Stories";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

function App() {
  // const currentUser = true;
  const { currentUser, login } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);
  console.log(darkMode);

  const queryClient = new QueryClient();


  const Layout = () => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <div className={`theme-${darkMode ? "dark" : "light"}`}>             
            <NavBar />
            <div style={{ display: "flex" }}>
              <LeftBar />
              <div style={{ flex: "6" }}>
                <Outlet />
              </div>
              <RightBar />
            </div>
          </div>
        </QueryClientProvider>
      </>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/stories",
          element: <Stories />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
