import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; 
import { CircleLoader, ClipLoader } from 'react-spinners';

axios.defaults.withCredentials = true;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [loading, setLoading]= useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!formData.email.includes('@')) {
      return alert('@ manquant');
    }

    try {
      setLoading(true);
      await axios.get('http://localhost:8000/sanctum/csrf-cookie');
      const res = await axios.post('http://localhost:8000/api/login', formData);
      
      // ici on met à jour le contexte d'authentification
      login(res.data.user, res.data.token); // c’est ça qui déclenche le rendu conditionnel dans la navbar
      navigate('/');
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.message) {
        setGeneralError(err.response.data.message);
      } else {
        setGeneralError("Une erreur inattendue s'est produite.");
      }
    } finally{
      setLoading(false);
    }
  };


  return (
    <div className='login-container'>
      <div className='login-form'>
        {generalError && <div className="alert-error">{generalError}</div>}

        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          {errors.email && <div className="error">{errors.email}</div>}
          <input type="text" placeholder='Email' name='email' onChange={handleChange} value={formData.email} />

          <input type="password" placeholder='Mot de passe' name='password' onChange={handleChange} value={formData.password} id='password' />

          {errors.password && <div className="error">{errors.password}</div>}

          <button type='submit' disabled={loading}>
            {loading ? <ClipLoader size={20} color='#fff' /> : 'Login'}
          </button>
          <p>Vous n'avez pas de compte? <Link to="/register" className='pasdecompte' >SignUp</Link></p>
        </form>
      </div>
    </div>
  );
}
