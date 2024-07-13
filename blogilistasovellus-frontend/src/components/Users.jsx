import { useEffect, useState } from "react";
import userService from "../services/users.js";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h2 className="p-2 text-2xl">Users</h2>
      <table className="border-collapse bg-gray-400 border-black border-2">
        <tbody >
          <tr className="">
            <td className="p-2 text-left bg-white">Name</td>
            <td className="p-2 text-left bg-white">Blogs created</td>
          </tr>
          {users.map((u) => {
            return (
              <tr key={u.id}>
                <td className="p-2 underline"><Link to={u.id}>{u.name}</Link></td>
                <td className="p-2">{u.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
