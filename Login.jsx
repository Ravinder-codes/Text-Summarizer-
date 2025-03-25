import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom' 
import { UserContext } from '../context/context'
import { useContext } from 'react'
const Login = () => {
  const navigate=useNavigate()
  const {user,setuser,userid,setuserid,allquery,setallquery}=useContext(UserContext)
  const saveinfo=async()=>{
    let userdetails={username:userinfo.username,password:userinfo.password}
    setuserinfo({username:"",password:""})
    let result =await fetch("http://localhost:3000/saveinfo",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({Username:userdetails.username,Password:userdetails.password})})
      let userdata=await result.json() 
      setuserid(userdata.data)
      setuser(true)
      navigate("/")
    }
    
    const checkinfo=async()=>{
      let userdata={name:userinfo.username,password:userinfo.password}
      setuserinfo({username:"",password:""})
      let data=await fetch("http://localhost:3000/checkinfo",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({Username:userdata.name,Password:userdata.password})})
      let main_content=await data.json()
      if (main_content.var){
        setallquery(main_content.All_query)
        setuser(true)
        setTimeout(() => {
          setuserid(main_content.id);
          navigate("/");
        }, 0);
      }
      else{
        alert("Invalid login details")
      }
      
      

  }
  const changevar=()=>{
    setuserinfo({username:"",password:""})
    setvariable(!variable)
  }
  const [variable, setvariable] = useState(true)
  const [userinfo, setuserinfo] = useState({username:"",password:""})
  const handlechange=(e)=>{
      setuserinfo({...userinfo,[e.target.name]:e.target.value})
  }
  return (
    <>
    <div className='bg-[#E0E0E0] flex justify-center items-center h-screen w-full'>
    <div className='bg-white Login_page w-[400px] h-[600px] rounded-2xl'>
      <div className='font-bold text-3xl my-6 text-center'>
        {variable?"Login":"Sign in"}
      </div>
      <div className='details mx-8 my-2'> 
        <div className=''>
          Username
        </div>
        <div className='my-1 flex items-center gap-2'>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" stroke="black" strokeWidth="2" fill="none"/>
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="black" strokeWidth="2" fill="none"/>
          </svg>

          <input name='username' onChange={handlechange} value={userinfo.username} className='outline-none py-3 w-[300px]' placeholder='Enter the Username' type="text" />
        </div>
        <hr className='h-full border-2 ' />
        <div className='my-3'>
          Password
        </div>
        <div className='my-1 flex items-center gap-2'>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="10" width="12" height="10" stroke="black" strokeWidth="2" fill="none"/>
            <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="black" strokeWidth="2" fill="none"/>
            <circle cx="12" cy="15" r="1" fill="black"/>
          </svg>
          <input name='password' value={userinfo.password} onChange={handlechange} className='outline-none py-3 w-[300px]' placeholder='Enter the Password' type="text" />
        </div>
        <hr className='h-full border-2 '/>
      </div>
      {variable?(
        <>
      <div onClick={()=>checkinfo()} className='login my-10 flex justify-center'>
          <button className='text-xl w-[250px] bg-slate-700 text-white py-2 px-20 rounded-full' type="button">
            Login
          </button>
      </div>
      <div className='question flex flex-col items-center gap-2'>
        <div >
          Don't have an account?
        </div>
        <div onClick={changevar} className='hover:underline text-slate-600 cursor-pointer'>
          Create account
        </div>
        <div></div>
      </div>
        </>
      ):(
        <>
        <div onClick={()=>saveinfo()} className='login my-10 flex justify-center'>
          <button className='text-xl w-[250px] bg-slate-700 text-white py-2 px-20 rounded-full' type="button">
            Sign in
          </button>
      </div>
      <div className='question flex flex-col items-center gap-2'>
        <div >
          Already have an account?
        </div>
        <div onClick={changevar} className='hover:underline text-slate-600 cursor-pointer'>
          login
        </div>
      </div>
        </>
      )}
    </div>
    </div>
    </>
  )
}

export default Login
