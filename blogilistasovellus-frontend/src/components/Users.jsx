import { useEffect, useState } from "react";
import userService from "../services/users.js";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Blogs created</td>
          </tr>
          {users.map((u) => {
            return (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
