import { useRoutes, Navigate } from "react-router-dom";

import MainLayout from "./layouts/main";

import MainPage from "./pages/mainPage/MainPage";
import ItemDraw from "./pages/market/ItemDraw";
import Items from "./pages/market/Items";

export default function Router() {
  return useRoutes([
    {
      // 추후에 "/main" 으로 변경할 예정
      path: "/",
      element: <MainLayout />,
      children: [
        // { element: <Navigate to="/" replace />},
        { path: "/", element: <MainPage /> },
      ],
    },
    {
      path: "/market",
      element: <MainLayout />,
      children: [
        { path: "", element: <Items /> },
        { path: "draw", element: <ItemDraw /> },
      ],
    },
  ]);
}
