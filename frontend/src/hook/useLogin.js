import React, { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export default function useLogin() {
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(null)
    const {dispatch} = useAuthContext() 

    const login = async(name,email,password)=>{
        setLoading(true)
        setError(null)
        const response = await fetch('/api/user/login',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({name,email,password})
        })

        const jsonData = await response.json()

    if(!response.ok){
        setLoading(false)
        setError(jsonData.error)
    }
    if(response.ok){
        localStorage.setItem('user',JSON.stringify(jsonData))
        dispatch({type:'LOGIN',payload:jsonData})
        setLoading(false)
    }
  }

  return{login,error,loading}
}
