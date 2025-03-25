import React from 'react'
import { useState ,useEffect,useRef} from 'react'
import { UserContext } from '../context/context'
import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
const Main = () => {
  const [data, setdata] = useState({data:""})
  const [textsize, settextsize] = useState({data:""})
  const [collection, setcollection] = useState([])
  const {allquery,setallquery,userid,setuserid,userlogged}=useContext(UserContext)
  const moveincollection=(id)=>{
    const query=allquery.find(query=>query.id===id)
    setcollection(prev=>[...prev,{data:query.answer,var:false}])
  }
  const downref = useRef(null)
  const senddata=async()=>{
      const usermessage={data:data.data,var:true}
      const size=textsize.data
      setcollection(prev=>[...prev,usermessage])
      setdata({data:""})
      settextsize({data:""})
      let result=await fetch("http://127.0.0.1:5000/",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({data:usermessage.data,wordsize:size})})
        
      let main_res=await result.json()
      setcollection(prev=>[...prev,{data:main_res.summary,var:main_res.var}])
      const main_query={query:usermessage.data,answer:main_res.summary,id:uuidv4()}
      if (userid){
        setallquery(prev=>[...prev,main_query])
      }

 }
 useEffect(() => {
   if (!userid || allquery.length === 0) return; 
  const backend=async()=>{
    let updatedinfo=await fetch("http://localhost:3000/updatedetails",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id:userid,All_query:allquery})})
    let info=await updatedinfo.json()
    }
    backend()
  },[allquery])
    
  const handlechange=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
  }
  const handlevalue=(e)=>{
    settextsize({...textsize,[e.target.name]:e.target.value})
    console.log(textsize.data)
  }
  
  useEffect(() => {
    downref.current?.scrollIntoView({ behavior: "smooth" });
  }, [collection])
  

  return (
    <>
    <div className="main bg-[#E0E0E0] py-1 flex h-[91.3vh]">
      <div className="left w-[30vw] bg-gray-100  border-0 rounded-xl mx-2 my-1 border-black h-[99%]">
        <div className='text py-2 px-2 bg-slate-700 rounded-t-xl'>
          <span className='text-xl text-white'>Recent Text Summerised
          </span>
        </div>
        {/* queires here */}
        <div className='all the queries'>
            { allquery.map((item,index)=>{ 
              return (
                <div  key={item.id}>
                <div onClick={()=>moveincollection(item.id)} className='queiry w-full overflow-hidden whitespace-nowrap text-ellipsis text-base px-3 py-2 hover:underline cursor-pointer'>
                {index+1}. {item.query}
                </div>
                <hr className='w-full border-2' />
    
                </div>
            )})}
        </div>

        
      </div>
      <div className="right w-[70vw]  mx-1">
        <div className='rightcontent  h-[80vh] overflow-y-auto .no-scrollbar'>
            {collection.map((item,index)=>
              item.var?(<div key={index} className='query flex justify-end'>
                <div className="max-w-3xl rounded-xl  shadow-2xl bg-slate-700 text-white h-auto mx-4 my-2 p-3 break-words whitespace-normal">
                {item.data}
                    </div>
                </div>):(
                <div key={index} className='userdata flex justify-start'>
                <div className="max-w-3xl shadow-2xl bg-white  rounded-xl text-black h-auto mx-4 my-4 p-3 break-words whitespace-normal">
                  {item.data}
                </div>
                </div>)
            )}
            <div ref={downref} ></div>

        </div>
        <div className='inputdata w-[95%] mx-3 my-2'>
          <form action="">
            <div className='w-full flex'>
              <div className='flex relative w-[95%]'>
              <input onChange={handlechange} value={data.data} name='data' className='px-6 py-4 w-[100%] rounded-full outline-none' placeholder='Enter the text you want to Summerise...' type="text" 
              />
              <svg onClick={()=>senddata()} className='absolute right-4 top-4 cursor-pointer ' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
              </svg>
            </div>
            <div className='w-[15%]'>
            <input onChange={handlevalue} value={textsize.data} name='data' className='px-6 py-4 w-[100%] rounded-full outline-none mx-2' placeholder='Word limit' type="text"
              />
            </div>
            </div>
          </form>
        </div>

      </div>

    </div>
    </>
  )
}

export default Main
