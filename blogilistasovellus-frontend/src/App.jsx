import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import BlogView from "./components/BlogView";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser, loginUser } from "./reducers/userReducer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

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
      <div>
        <Notification></Notification>
        <h2>Login to app</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <p>{user.name} logged in!</p>
        <button onClick={handleLogout}>Logout...</button>
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
          <Outlet></Outlet>
        </div>
      ),
      children: [
        {
          path: "/",
          element: user === null ? null : <BlogView></BlogView>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
