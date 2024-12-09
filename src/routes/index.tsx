import HomePage from "@/pages/HomePage";
import Scan from "@/pages/Scan";
import { createBrowserRouter, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: ":scanId",
    element: <Scan />,
  },
];

const router = createBrowserRouter(routes);

export default router;
