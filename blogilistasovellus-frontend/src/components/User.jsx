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
    <div className="flex flex-col items-center">
      <h2 className="text-2xl">{user.name}</h2>
      <div className="bg-gray-400 p-2 mt-2 w-full">
        <h3 className="text-xl">Added blogs</h3>
        <ul className="list-disc p-4">
          {user.blogs && user.blogs.map((b) => <li className="list-item" key={b.id}>{b.title}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default User;
