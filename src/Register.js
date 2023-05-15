import axios from 'axios';
import React, { useContext, useState } from 'react'
import { UserContext } from './UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Joi from "joi-browser";
import Chat from './Chat';

function Register() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { name, setId, id, setName } = useContext(UserContext);
  const [isAlreadyUser, setAlreadyUser] = useState(false);


  if (name) {
    return (
      <Chat />
    )
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const result = Joi.validate({ username, password },
      {
        username: Joi.string().min(1).max(20).required(),
        password: Joi.string().required()
      }, { abortEarly: false });
    console.log(result.error);
    if (result?.error?.message) {
      toast.error(result.error.message);
    } else {
      const url = isAlreadyUser ? '/login' : '/register';
      console.log(url)
      const { data } = await axios.post(url, { username, password });
      console.log(data);
      setId(data.id);
      setName(username);
    }
  }

  return (
    <div className='bg-blue-50 h-screen mx-auto flex items-center'>
      <form className='w-64 mx-auto mb-12' onSubmit={(e) => { handleSubmit(e) }}>
        <input type='text'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='username'
          className='block w-full rounded-sm p-2 mb-2' />
        <input type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
          className='block w-full rounded-sm p-2 mb-2 border' />
        <button className='bg-blue-500 text-white block w-full rounded-sm p-2'>{isAlreadyUser ? "Login" : "Register"}</button>
        <div className='text-center mt-2'>
          {isAlreadyUser ?
            <div>
              Don't have an account?
              <button onClick={() => { setAlreadyUser(false) }}>Register here</button>
            </div> :
            <div>
              Already a member?
              <button onClick={() => { setAlreadyUser(true) }}>Login here</button>
            </div>}
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Register 