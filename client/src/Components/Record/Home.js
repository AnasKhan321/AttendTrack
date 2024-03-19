import React,{useState , useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';

import { ToastContainer, toast } from 'react-toastify';

import 'react-calendar/dist/Calendar.css';
import Record from './Record.js'; 
import Navbar from "./Navbar.js";

const Home = ()=>{
    const navigate = useNavigate();
    const [value, setvalue] = useState(new Date());
    const [token  , settoken] = useState(undefined); 
    const [present , setpresent] = useState(0)
    const [total , settotal ]   = useState(0)
    const [records , setrecords] = useState([])
    const [show , setshow ] = useState(false )
    const [Record , setRecord] = useState({})
    const [showInput , setshowInput] = useState(false)
    
    const checkuser = ()=>{
        const utoken = localStorage.getItem("track")
        if(utoken == undefined){
            navigate('/login')
        }else{
            settoken(utoken)
            fetchData(utoken)
        }
       
    }
    const maxdate  = new Date()
    const mindate = getTenDayAgoDate()

    useEffect(()=>{
        checkuser()

    },[])

    const fetchData = async(usertoken)=>{
     
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/record/alldata` , {
                method: 'GET',
                headers: { 
                'Authorization': `Bearer ${usertoken}`,
              },
          })
  
          const responsedata =  await response.json()
          setrecords(responsedata.data)
          onChange( dateee(value))
  
          
        
       
    }

    const onChange = (e)=>{
        setvalue(e)

        if(records.length > 0 ){
            let trackitem = 0 
        
            for (let index = 0; index < records.length; index++) {
                console.log(records[index].recordDate)
                const formattedD =   formattedDate(records[index].recordDate)
                if(formattedD == formattedDate(e) ){
                    setshowInput(false)
                    setRecord(records[index])
                    setshow(true)
                    trackitem = 1 
                }
                
            }
            if(trackitem == 0 ){
                setshow(false)
            }else{

            }

        }else{
            console.log("this is her e")
        }
    }

    const handleClick = () => {
        setshowInput(true )
        
    };

    const handleChange = (e)=>{
        if(e.target.name == "present"){
            setpresent(e.target.value)
        }else{
            settotal(e.target.value)
        }

    }


    const handleSubmit = async()=>{
     
        console.log( total , present , value);
        if(present == 0 || total == 0 ){
            toast.error("Fill the values correctly")
            return 
        }
        const data = {
            totalStudents  : total , 
            Present : present ,
            date : value 
        }



        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/record/add` , {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(data),
      })

      const responsedata =  await response.json()
      console.log(responsedata)
      if(responsedata.success){
        toast.success("Created Successfully ")
        setrecords(responsedata.data)

      }



    }

    const navigatetoupdate = ()=>{
            navigate(`/update/${Record._id}`)
    }

    return(
        <div> 
            <Navbar/>
                <div className="flex justify-center items-center mt-10  ">
                            <Calendar value={value}  onChange={onChange}  maxDate={maxdate} minDate={mindate}/>
                        </div>

            {!show&&
            
                    <div className="Plus bg-gradient-to-r from-purple-500 to-pink-500 absolute  transition-all right-[48vw] cursor-pointer  bottom-5  w-14 rounded-full  h-14  flex justify-center items-center   "   onClick={handleClick}> 
                    <span className="material-symbols-outlined text-3xl invert  ">
                        add
                        </span>

                      </div>
            
            
            }

             

                {show&&
                
               
                       <div className="flex  w-11/12 md:w-7/12  justify-between mx-auto p-6   shadow-md  items-center  " onClick={navigatetoupdate}> 
                       

                        <div className = " bg-gradient-to-r from-purple-500 to-pink-500  px-4 py-1  flex flex-col items-center justify-center   "> 
                            <div className="text-white font-bold  " > {getDatefromDate(Record.recordDate)}  </div>
                            <div className="text-white font-bold   " >{getMonthfromDate(Record.recordDate)}</div>
                        </div>
                        <div  className="flex flex-col items-center justify-center " >
                        <div> Present  </div>
                        <span  className=" text-md  md:text-xl font-bold text-lime-700 " >{Record.Present}</span>
               
                        </div>

                        <div className="flex flex-col items-center justify-center "> 
                            <div> Total No of Students </div>
                            <div   className=" text-md md:text-xl font-bold "  > 
                            {Record.totalStudents} 

                            </div>
                      


                        </div>


                       </div>
                    

                  
                }
           
            
                    {showInput &&

                <div className="mt-10  w-10/12  md:w-4/12  mx-auto ">

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
                    <button type="submit" className="flex w-full justify-center rounded-md bg-gradient-to-r from-purple-500 to-pink-500  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"  onClick={handleSubmit} >Add Record  </button>
                    </div>
            </div>
            }
        </div>
      
    )
}



function getTenDayAgoDate() {
    // Get today's date
    let today = new Date();

    let currentMonth = today.getMonth();

    let previousMonth = currentMonth - 1;

    let year = today.getFullYear();
    if (previousMonth < 0) {
        previousMonth = 11; 
        year -= 1; 
    }

    let TenDayAgo = new Date(year, previousMonth + 1, 10); 

    return TenDayAgo;
}


function  dateee(dateString) {

        // Create a new Date object by parsing the string
        const date = new Date(dateString);

        // Set the time component to 00:00:00
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);

        // Get the formatted date string
        const formattedDate = date.toString();

        return formattedDate
            
}

function formattedDate(dateString){
    var isoDate = new Date(dateString);

// Convert to the desired format
        var formattedDateVar = isoDate.toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata',
            weekday: 'short',          
            month: 'short',          
            day: '2-digit',          
            year: 'numeric',        
            hour: '2-digit',        
            minute: '2-digit',         
            second: '2-digit',       
            timeZoneName: 'short'      
          });

        return formattedDateVar
}


const getMonthfromDate = (dateString)=>{

    const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const date = new Date(dateString);

    const monthIndex = date.getMonth();
    const month = monthAbbreviations[monthIndex];
    return month

}

const getDatefromDate = (dateString)=>{
    const date = new Date(dateString);
    const day = date.getDate();
    return day
}

export default Home 