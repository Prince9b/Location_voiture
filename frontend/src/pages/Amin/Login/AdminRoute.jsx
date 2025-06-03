import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        await axios.get('http://localhost:8000/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        setIsAuthorized(true);
      } catch {
        setIsAuthorized(false);
      }
    };

    checkAdmin();
  }, []);

  if (isAuthorized === null) return <p>Chargement...</p>;
  if (!isAuthorized) return <Navigate to="/admin/login" />;

  return children;
}
