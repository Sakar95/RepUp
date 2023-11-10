import React from 'react'
import { useAuthContext } from './useAuthContext'
import { useWorkoutContext } from './useWorkoutContext'

export default function useLogout() {
    const {dispatch} = useAuthContext()
    const {dispatch:workoutDispatch} = useWorkoutContext()
    const LogOut = ()=>{
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})
        workoutDispatch({type:'SET_WORKOUT',payload:null})
    }
  return {
    LogOut
  }
}
