import React,{useState , useEffect} from 'react'
import { useParams , Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "./Navbar.js";


const Update = ()=>{
    const { id } = useParams();
    const [token  , settoken] = useState(undefined); 
    const navigate = useNavigate();
    const [present , setPresent ] = useState(0)
    const [total , settotal] = useState(0)
    const [recordobject , setrecordobject] = useState({})


    const checkuser = ()=>{
        const utoken = localStorage.getItem("track")
        if(utoken == undefined){
            navigate('/login')
        }else{
            settoken(utoken)
            fetchData(utoken)
        }
       
    }

        const fetchData = async(usertoken)=>{
        
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/record/record/${id}` , {
                method: 'GET',
                headers: { 
                'Authorization': `Bearer ${usertoken}`,
            },
        })

        const responsedata =  await response.json()
        settotal(responsedata.data.totalStudents)
        setPresent(responsedata.data.Present)
        setrecordobject(responsedata.data)

        
        
    
    }


    const handleChange = (e)=>{
        if(e.target.name == "present"){
            setPresent(e.target.value)
        }else{
            settotal(e.target.value)
        }

    }

    const handleSubmit = async()=>{
        if(present == 0 || total == 0 ){
            toast.error("Fill the values correctly")
            return 
        }
        const data = {
            totalStudents  : total , 
            Present : present ,
            date : recordobject.recordDate
        }



        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/record/update/${id}` , {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(data),
      })

      const responsedata =  await response.json()
        if(responsedata.success){
            toast.success("updated Successfully ")
            navigate('/')
        }
    }

    useEffect(()=>{
        checkuser()
    },[])

    return(
        <div> 
            <Navbar/>
            
             <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">

        <div>
        <label htmlFor="present" className="block text-sm font-medium leading-6 text-gray-900">Present</label>
        <div className="mt-2">
            <input id="present" name="present" type="Number" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 px-4 py-2  " value={present}  onChange={handleChange} />
        </div>
        </div>

        <div>
        <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Total No of Student </label>

        </div>
        <div className="mt-2">
            <input id="total" name="total" type="Number" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 px-4 py-2  " value={total} onChange={handleChange}  />
        </div>
        </div>

        <div className="mt-2 ">
        <button type="submit" className="flex w-full justify-center rounded-md bg-gradient-to-r from-purple-500 to-pink-500  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"  onClick={handleSubmit} >Update Record  </button>
        </div>
</div></div>
    )

}

export default Update ; 