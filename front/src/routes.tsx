import { useRoutes } from "react-router-dom";

import MainLayout from "./layouts/main";
import MainPage from "./pages/mainpage/MainPage";
import ItemDraw from "./pages/market/ItemDraw";
import ItemCombine from "./pages/market/ItemCombine";
import Profile from "./pages/profile/Profile";
import SaleRegistration from "./pages/market/SaleRegistration";
import ItemPurchase from "./pages/market/ItemPurchase";
import MarketMain from "./pages/market/MarketMain";

import Test from "./pages/soliditytest"

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
        { path: "", element: <MarketMain /> },
        { path: "draw", element: <ItemDraw /> },
        { path:'combine', element: <ItemCombine /> },
        { path: "buy/:saleId", element: <ItemPurchase /> },
      ],
    },
    {
      path: "/user",
      element: <MainLayout />,
      children: [{ path: ":account", element: <Profile /> }],
    },

    {
      path: "/test",
      element: <Test />
    },

  ]);
}
