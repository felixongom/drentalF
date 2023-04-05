import{useEffect, useState} from 'react'
import {FaBars} from 'react-icons/fa'
import {BiSearch, BiSend} from 'react-icons/bi'
import user from '../assets/images/user.png'
import {useNavigate} from 'react-router-dom'

import {useStateContext} from '../assets/js/Context'


function Navbar({navHeader}) {

  const navigate = useNavigate()
  const {sinstance} = useStateContext()

  const [authUser , setAuthUser] = useState({})

  const token = localStorage.getItem('sadmintoken')
  useEffect(()=>{
    if(token===null){
      navigate('/super')
    }
    sinstance.get('/api/user/me')
    .then(res=>setAuthUser(res.data))

    //eslint-disable-next-line react-hooks/exhaustive-deps

  }, [navigate, sinstance, token])
  
  const logMeOut =()=>{
    navigate('/super')
    localStorage.removeItem('sadmintoken')
  }




  const {showSideBar, toggleSideBar, searchFuction, search} = useStateContext()
  return (
    <div className='navbar'>
      <div className="toggle_icon">
        <FaBars className='toggle'
          onClick={toggleSideBar}
          />
          {showSideBar &&<h3>{navHeader}</h3>} 
      </div>
      
      <div className='search_container'>
        <BiSearch className='search_icon'/>
        <input onClick={()=>navigate("/super/houses")} value={search} onChange={(e)=>searchFuction(e.target.value)} placeholder='Search. . .'/>
        <div className='send' >
          <BiSend className='search_icon send'
            onClick={()=>alert()}

          />
        </div>
        
        </div>
        <div className="avater" onClick={() => navigate(`/super/register`)}>
        <button onClick={logMeOut} className="bg-cyan-500 h-8 px-3 text-sm ">
          Logout
        </button>

        <img
          className="rounded-2xl"
          src={!authUser.avater ? user : authUser.avater}
          alt=""
          width={60}
        />
        <div className="text-gray text-sm pr-2 flex">
          Hi, <span className="font-bold capitalize"> {authUser.name}</span>
        </div>
      </div>
      
    </div>
  )
}

export default Navbar