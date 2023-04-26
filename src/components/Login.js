import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () =>{
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    })

    const handleLogin = async () =>{
        console.warn(email,password)
        let result = await fetch('https://backend-ykss.onrender.com/login',{
            method:"post",
            body : JSON.stringify({email,password}),
            headers:{
                'Content-Type' : "application/json"
            }
        })
        result = await result.json()
        console.warn(result)
        if(result.name){
            localStorage.setItem('user',JSON.stringify(result))
            navigate('/')
        }else{
            alert("enter correct details")
        }
}

    return(
        <div className='login'>
            <h2 style={{color : "red" , fontSize : "50px" }}>Login Page</h2><br />
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className='inputBox' type="email" placeholder='enter email' /><br />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='inputBox' type="password" placeholder='enter password' /><br />
            <button style={{width:"45%"}} onClick={handleLogin} className='btn'>Login</button>
        </div>
    )
}
export default Login;