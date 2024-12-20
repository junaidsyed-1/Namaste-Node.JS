import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <div>
        {/* <BrowserRouter basename="/">
        <Routes>
        <Route path="/" element={<Body />}>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        </Route>
        </Routes>
        </BrowserRouter> */}
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
