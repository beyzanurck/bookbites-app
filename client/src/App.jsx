import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Root from "./pages/Root.jsx";
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        }
      ],
    },
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
