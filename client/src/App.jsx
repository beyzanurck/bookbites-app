import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Root from "./pages/Root.jsx";
import Profile from "./pages/Profile.jsx";
import About from "./pages/About.jsx";
import Book from "./pages/Book.jsx";
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
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'profile',
          element: <Profile />,
        },
        {
          path: 'book',
          element: <Book />,
        }
      ],
    },
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
