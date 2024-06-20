import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import {signInStart ,signInSuccess,signInFailure} from'../redux/user/userSlice'
import OAuth from '../components/OAuth';

function SignIn() {
  const [formData, setFormData] = useState({})
  const {loading,error} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }
  const handleSubmit = async(e)=>{
    try {
      
      e.preventDefault()
      dispatch(signInStart())
      const res = await fetch ('/api/auth/signin',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data);
      if(data.success == false){
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/profile')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }
  return (
    
    <div className='signup h-screen'>
      
      <div className='w-2/3 mx-auto  pt-32'>

      <h1>Sign In</h1>
      <form action="" className='flex flex-col ' onSubmit={handleSubmit}>
        <label htmlFor="email" className='mt-2'><p>email</p></label>
        <input type="email" name="email" id="email" className='border-2 w-1/2 py-1 px-2 outline-none rounded-lg ' onChange={handleChange}/>
        <label htmlFor="password" className='mt-2'><p>password</p></label>
        <input type="password" name="password" id="password" className='border-2 w-1/2 py-1 px-2 outline-none rounded-lg ' onChange={handleChange}/>
        <button type="submit" disabled={loading} className='bg-prim w-1/2 text-white py-2 mt-10 rounded-lg'><p>{loading?'loading...':"Sign In"} </p></button>
        <OAuth/>
      </form>
      <div className='flex items-center pt-2'>
        <p>Do not have an account ?</p>
        <Link to={"/sign-up"} className='ps-2 text-second'><p>Sign up</p></Link>
      </div>
      {error && <p className='text-red-600 mt-5'>{error} </p> }
      </div>
    </div>
  )
}

export default SignIn
