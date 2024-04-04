import "./Styles/_index.scss";
import "./Styles/_themes.scss";
import Home from "./Pages/Home/Home.jsx";
import Main from "./Pages/Main/Main.jsx";
import { RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Home />,
    },
    {
      path: "main",
      element: <Main />

    }
  ])



  return (
    <RouterProvider router={router} />
  )

}

export default App
