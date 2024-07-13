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
                <td><Link to={u.id}>{u.name}</Link></td>
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
