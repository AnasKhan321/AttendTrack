import React,{useState , useEffect} from 'react'
import { useNavigate } from "react-router-dom";


const Navbar = ()=>{
    const [user ,setuser] = useState({})
    useEffect(()=>{
        const data = localStorage.getItem("user")
        console.log(data)
        if(data !== undefined){
            setuser(JSON.parse(data))
        }
    },[])
    return(
        <div  className="   bg-gradient-to-r from-purple-500 to-pink-500  p-4  flex justify-between items-center " > 

                <div className="text-white font-bold md:text-2xl ml-4  text-md "> 

                    Attend Track 
                </div>

                <div className="mr-4 md:text-xl text-sm   text-white "> 
                    <div> 

                    {user.email} 

                    </div>
                  
                </div>
             </div>
    )
}

export default Navbar ; 