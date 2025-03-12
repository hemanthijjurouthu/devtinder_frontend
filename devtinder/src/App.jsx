import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import Body from "../Components/Body";
import Login from "../Components/Login";
import Profile from "../Components/Profile";
import {Provider} from 'react-redux';
import appStore from "../utils/appStore";
import Feed from "../Components/Feed";
import Connections from "../Components/Connections";
import Requests from "../Components/Requests";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path : "/",
        element : <Feed/>
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path : 'connections',
        element : <Connections/>
      },
      {
        path : 'requests',
        element : <Requests/>
      },
    ],
  },
]);

function App() {
  return (
    <div>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
    </div>
  );
}

export default App;
