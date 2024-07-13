import { useEffect, useState } from "react";
import userService from "../services/users.js";
import { useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    userService.getUser(id).then((res) => {
      setUser(res);
      console.log(res);
    });
  }, []);

  if (user === null || user === undefined) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs && user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
