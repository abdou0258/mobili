import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import OAuth from '../components/OAuth';
function SignUp() {
  const [formData, setFormData] = useState({})
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }
  const handleSubmit = async(e)=>{
    try {
      
      e.preventDefault()
      setLoading(true)
      const res = await fetch ('/api/auth/signup',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data);
      if(data.success == false){
        setLoading(false)
        setError('Error : '+ data.message)
        return
      }
      setLoading(false)
      setError(null)
      navigate('/sign-in')
    } catch (error) {
      setLoading(false)
      setError('Error: '+ error)
    }
  }
  return (
    
    <div className='signup h-screen'>
      
      <div className='w-2/3 mx-auto  pt-32'>

      <h1>Sign Up</h1>
      <form action="" className='flex flex-col ' onSubmit={handleSubmit}>
        <label htmlFor="username" className='mt-2'><p>username</p></label>
        <input type="text" name="username" id="username" className='border-2 w-1/2 py-1 px-2 outline-none rounded-lg ' onChange={handleChange} />
        <label htmlFor="email" className='mt-2'><p>email</p></label>
        <input type="email" name="email" id="email" className='border-2 w-1/2 py-1 px-2 outline-none rounded-lg ' onChange={handleChange}/>
        <label htmlFor="password" className='mt-2'><p>password</p></label>
        <input type="password" name="password" id="password" className='border-2 w-1/2 py-1 px-2 outline-none rounded-lg ' onChange={handleChange}/>
        <button type="submit" disabled={loading} className='bg-prim w-1/2 text-white py-2 mt-10 rounded-lg'><p>{loading?'loading...':"Sign Up"} </p></button>
        <div className='flex items-center pt-5 pb-2'><div className='w-1/4 h-px bg-gray-300 me-1'></div><p className='text-xs font-normal text-gray-600'>  OR  </p>  <div className='w-1/4 h-px bg-gray-300 ms-1'></div></div>
        <OAuth/>
      </form>
      <div className='flex items-center mt-2'>
        <p>Have an account ?</p>
        <Link to ="/sign-in" className='ps-2 text-second'><p>Sign in</p></Link>
      </div>
      {error && <p className='text-red-600 mt-5'>{error} </p> }
      </div>
    </div>
  )
}

export default SignUp
