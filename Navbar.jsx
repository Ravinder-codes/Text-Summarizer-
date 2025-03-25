import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/context'
const Navbar = () => {
  const{user,setuser,userid,setuserid,allquery,setallquery} =useContext(UserContext)
  const moveout=async()=>{
    let data=fetch("http://localhost:3000/updatedetails",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id:userid,All_query:allquery})})
      setallquery([])
      setuserid(null)
      setuser(!user)
    }

  return (
    <>
    <div className="navbar bg-gray-100 flex justify-between py-1.5 px-6 items-center">
        <div className='gap-2 flex items-center'>
            <img width={40}  height={40} src="/icons/logo.png" alt="" srcSet="" />
            <span className='text-xl text-slate-700 font-bold'>Text-Summeriser</span>
        </div>
        {
          user?<>
          <div onClick={()=>moveout()} className='bg-slate-700 p-2 rounded-xl text-white'>
            <button>
              Sign-out
            </button>
        </div>
          </>
          :<>
          <div className='bg-slate-700 p-2 rounded-xl text-white'>
          <button>
            <Link to="/Login">Sign-in</Link>
          </button>
         </div>
          </>
        }
        
    </div>
    </>
  )
}

export default Navbar
