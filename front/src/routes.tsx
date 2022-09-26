import { useRoutes } from "react-router-dom";

import MainLayout from "./layouts/main";
import MainPage from "./pages/mainpage/MainPage";
import ItemDraw from "./pages/market/ItemDraw";
import Profile from "./pages/profile/Profile";
import Items from "./pages/market/Items";
import SaleRegistration from "./pages/market/SaleRegistration";

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
        { path: "register", element: <SaleRegistration /> },
      ],
    },
    {
      path: "/user",
      element: <MainLayout />,
      children: [{ path: ":account", element: <Profile /> }],
    },
  ]);
}
