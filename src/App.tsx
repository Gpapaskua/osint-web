import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {
  return (
    <div className="min-h-[100vh] bg-slate-200 px-8">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
