import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export default function useAuthToken() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const decoded = jwt_decode(token);
      setUser(decoded);
    } catch {
      setUser(null);
    }
  }, []);

  return user;
}
