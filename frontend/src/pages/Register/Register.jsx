import React, { useState } from 'react'
import './Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const navigate= useNavigate();
  const [formData, setFormData]= useState({
    'name' :'',
    'email': '',
    'tel': '',
    'password': ''
  })
  const [errors, setErrors]= useState({})

  const handleChange= (e)=> {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleRegistration= async (e)=> {
    e.preventDefault();
    setErrors({})

    if(!formData.email.includes('@')){
       return alert('@ manquant')
    }

    try{
          await axios.get('/sanctum/csrf-cookie');
          await  axios.post('http://localhost:8000/api/register', formData);
          navigate('/login')
          
    } catch(err){
          if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.error('Erreur:', err);
      }

    }

  }

  return (
    <div className='register-container'>
        
        <div className='register-form'>
          <h2>REGISTER</h2>
            <form onSubmit={handleRegistration}>
                <input type="text" placeholder='Nom' name='name' onChange={handleChange} value={formData.name} />
                <input type="text" placeholder='Email' name='email' onChange={handleChange} value={formData.email}/>
                <input type="text" placeholder='Téléphone' name='tel' onChange={handleChange} value={formData.tel} />
                <input type="password" placeholder='Mot de passe'name='password' onChange={handleChange} value={formData.password}/>

                {errors.password && <div className="error">{errors.password}</div>}


                <button type='submit'>S'inscrire</button>
            </form>
        </div>
    </div>
  )
}
