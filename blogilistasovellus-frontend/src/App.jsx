import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import BlogView from "./components/BlogView";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser, loginUser } from "./reducers/userReducer";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import SingleBlog from "./components/SingleBlog";

const Header = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(loginUser(username, password));

    setUsername("");
    setPassword("");
  };

  if (user === undefined || user === null) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <Notification></Notification>
        <h2 className="p-2 text-2xl">Login to app</h2>
        <form className="p-2 bg-slate-500 rounded text-white flex flex-col justify-center gap-2" onSubmit={handleLogin}>
          <div>
            Username
            <input
              className="p-2 rounded-lg grow flex text-black"
              data-testid="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              className="p-2 rounded-lg grow flex text-black"
              data-testid="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button className="p-1 pl-4 pr-4 rounded-full bg-white hover:bg-slate-200 active:bg-slate-300 self-center text-black" type="submit">Login</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center gap-2 p-2 w-full bg-slate-200">
          <Link className="text-xl underline" to={"/users"}>Users</Link>
          <Link className="text-xl underline" to={"/"}>Blogs</Link>
        </div>
        <p className="p-2 text-2xl" >{user.name} Logged in!</p>

        <button className="p-1 pl-4 pr-4 rounded-full bg-slate-50 hover:bg-slate-200 active:bg-slate-300 self-center text-black" onClick={handleLogout}>Logout...</button>
        <Notification></Notification>
      </div>
    );
  }
};

const App = () => {
  const user = useSelector((state) => state.users);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Header></Header>
          <div className="h-1 w-full bg-black rounded-full mt-4 mb-4"></div>
          <Outlet></Outlet>
        </div>
      ),
      children: [
        {
          path: "/",
          element: user === null ? null : <BlogView></BlogView>,
        },
        {
          path: "/blogs/:id",
          element: user === null ? null : <SingleBlog></SingleBlog>,
        },
        {
          path: "/users",
          element: user === null ? null : <Users></Users>,
        },
        {
          path: "/users/:id",
          element: user === null ? null : <User></User>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
