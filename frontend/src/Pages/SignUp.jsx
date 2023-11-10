
import {React,useState} from 'react'
import Input from '../components/Input'
import { Link } from 'react-router-dom'
import useSignUp from '../hook/useSignUp'

export default function SignUp() {

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {signup,error,loading} = useSignUp()

    const handleSubmit = async (e)=>{
      e.preventDefault()
      // console.log(name,email,password)
      await signup(name,email,password)
    }
  
    return (
        <>
        
        
        <div className="flex items-center justify-center pt-28  bg-gray-900 text-white">
          <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
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
               <button type='submit' disabled={loading} className=' px-2 pb-2 pt-1 rounded-md bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition ease-in-out'>SignUp</button>
              </div>
              {error && <div className='bg-red-300 text-white p-2 border-2 border-red-400 mt-4 rounded-md'>{error}</div>}
            </form>
            
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login 
              </Link>
            </p>
          </div>
        </div>
        </>
      
  )
}
