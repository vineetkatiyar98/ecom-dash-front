import React,{useEffect, useState} from 'react'
import {useNavigate } from 'react-router-dom'
const Signup = ()=>{
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[passwaord,setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })

    const collectData = ()=>{
       
        console.log(name,email,passwaord)
        let data = {name,email,passwaord}
       fetch('https://backend-ykss.onrender.com/register',{
            method:'post',
            headers: {
                'Content-Type' :'application/json'
            },
            body:JSON.stringify(data)
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp)
            localStorage.setItem('user',JSON.stringify(resp))
                    navigate('/')
            })
        }) 
    }

    return(
        <div className="register">
            <h2 style={{fontSize: "50px", color:"red"}} >Register Here</h2> <br />
            <input className='inputBox' type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='full name'/> <br />

            <input className='inputBox'  type="email" placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/> <br />

            <input className='inputBox'  type="password" placeholder='passwaord' value={passwaord} onChange={(e)=>{setPassword(e.target.value)}}/><br />

            <button style={{width:"45%"}} className='btn' type='button' onClick={collectData}>signup</button>
        </div>
    )
}
export default Signup;