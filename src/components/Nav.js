import React from 'react'
import '../App.css'
import { Link,useNavigate } from 'react-router-dom'


const Nav =()=>{
    const auth = localStorage.getItem('user')
    const navigate = useNavigate()

    const Logout = () =>{
        localStorage.clear()
        navigate('/signup')
    }

    return(
        <div>
                <img className='logo' src="https://res.cloudinary.com/dyd911kmh/image/upload/v1668167354/Excel_Dashboard_Strategy_43cfd06a9e.png" alt="logo" />

            {
                auth ?  <ul className='nav-ul'>
                <li><Link to='/'>products</Link></li>
                <li> <Link to='/add'>Add Products</Link></li>
                <li><Link to='/update'>Update Products</Link></li>
                {/* <li><Link to='/profile'>Profile</Link></li>  */}
                <li><Link onClick={Logout} to='/signup'>Logout({JSON.parse(auth).name})</Link></li>
             </ul>
                : 
                <ul className='nav-ul nav-right'>
                    <li><Link to='/signup'>Register</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </ul>

            }
          
        </div>

    )
}
export default Nav