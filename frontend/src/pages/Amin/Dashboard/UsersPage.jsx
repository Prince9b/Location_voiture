import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Composants/Nav";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Erreur API :", err));
  }, []);

  return (
    <>
    <Nav />
    <div className="user-container">
      <style>{`
        .user-container {
          max-width: 900px;
          margin: 50px auto;
          padding: 30px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0,0,0,0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        h2 {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        thead {
          background-color:transparent;
          color: #333;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold
          color: white;
        }
        th, td {
          padding: 12px;
          text-align: center;
          border: 1px solid #ddd;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        tr:hover {
          background-color: #e9ecef;
        }
      `}</style>

      <h2>Liste des utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.tel}</td>
                <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
 