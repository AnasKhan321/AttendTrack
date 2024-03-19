import React,{useState} from 'react'
import {  Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import user from '../../Images/user.jpg'
const Login = () => {
    const navigate = useNavigate();


    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const handleChange= (e)=>{
        if(e.target.name == 'email'){
            setemail(e.target.value)
        }
        else{
            setpassword(e.target.value)
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault(); 
        const data ={
            email : email,
            password : password
        }
        if(password.length < 8 ){
            toast.error("password must contain 8 character")
        }

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/auth/login` , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        const responsedata =  await response.json()
        if(responsedata.success){
            toast.success("Login Successfully")
            localStorage.setItem('track' , responsedata.token)
            localStorage.setItem('user' , JSON.stringify( responsedata.user))

            console.log(responsedata)
            navigate('/')
        }else{
            toast.error(responsedata.error)
        }
    }

  return (
    
  <div className="flex   flex-col justify-center px-6 py-12 lg:px-8  ">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm my-4 ">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in to your account</h2>
    </div>
    <img src={user} className="w-24  m-auto rounded-full  "/>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6"  onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 px-4 py-2  " value={email}  onChange={handleChange} />
          </div>
        </div>
  
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-pink-600 hover:text-pink-500">Forgot password?</a>
            </div>
          </div>
          <div className="mt-2">
            <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 px-4 py-2  " value={password} onChange={handleChange}  />
          </div>
        </div>
  
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-gradient-to-r from-purple-500 to-pink-500  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Sign in</button>
        </div>
      </form>
  
      <p className="mt-10 text-center text-sm text-gray-500">
        Not have an  account ?
        <Link to='/signup' className="font-semibold leading-6 text-pink-600 hover:text-pink-500">Create an Account </Link>
      </p>
    </div>
  </div>
  
  )
}

export default Login