/* eslint-disable @typescript-eslint/no-explicit-any */

// import libray used
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import { createContext, useEffect, useState } from "react";

// import components
import Layout from "@/page/Layout";
import Dashboard from "@/page/Dashboard";
import CategoryPage from "@/page/Category";
import DetailCategory from "@/page/Category/page/detail";
import TodayPage from "@/page/Today";
import NotFoundPage from "@/page/NotFoundPage";

// create context theme
export const ThemeContext: any = createContext(null);

const AppRouter = () => {
  const [currentTheme, setCurrentTheme] = useState(false);
  const switchTheme = () => {
    setCurrentTheme(!currentTheme);
    localStorage.currentTheme = !currentTheme;
  };

  // get currentTheme from localStorage
  useEffect(() => {
    try {
      setCurrentTheme(JSON.parse(localStorage.currentTheme));
    } catch (error) {
      setCurrentTheme(true);
      localStorage.currentTheme = true;
    }
  }, []);

  // create router function
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="today" element={<TodayPage />} />
          <Route path="category">
            <Route index element={<CategoryPage />} />
            <Route path=":category" element={<DetailCategory />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </>
    )
  );

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme }}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default AppRouter;
