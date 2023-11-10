
import {React,useState,useEffect} from 'react'
import Input from '../components/Input'
import { Link } from 'react-router-dom'
import useLogin from '../hook/useLogin'
import NavBar from '../components/Navbar'

export default function Login() {

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [showError, setShowError] = useState(false)
    
    const {login,error,loading} = useLogin()
    // const [nerror,setNerror] =useState(error)

    const handleSubmit = async (e)=>{
      e.preventDefault()
      await login(name,email,password)
      setName("")
      setEmail("")
      setPassword("")
    }

    useEffect(() => {
      if (error) {
        setShowError(true)
        const errorTimeout = setTimeout(() => {
          setShowError(false)
        }, 2000) // Set the timeout duration (2 seconds)
        return () => clearTimeout(errorTimeout)
      }
    }, [error])

    // if(error === "Cannot read properties of null (reading 'password')") setNerror("User not found");
  
    return (
        <>
        
        <div className="flex items-center justify-center bg-gray-900 text-white pt-24  ">
        
          <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-center">
               <button  disabled={loading} type='submit' className=' px-2 pb-1  rounded-md bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition ease-in-out'>Login</button>
              </div>
            </form>
            {
              showError && <div className='bg-red-300 text-white p-2 border-2 border-red-400 mt-4 rounded-md'>*{error}</div>
            }
            
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        </>
      
  )
}
