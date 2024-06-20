import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';


import { useDispatch, useSelector } from 'react-redux';
import {signInStart ,signInSuccess,signInFailure} from'../redux/user/userSlice'

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,error} = useSelector((state)=>state.user)
    
    const handleClick = async () => {
        try {
            dispatch(signInStart())
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    name: result.user.displayName, 
                    email: result.user.email, 
                    photo: result.user.photoURL 
                })
            });
            const data = await res.json();
           
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
           
            dispatch(signInFailure(error.message))
        }
    }

    return (
        <>
        <button onClick={handleClick} type='button' className='bg-transparent w-1/2 text-black py-2 mt-4 rounded-lg capitalize border-2 flex items-center justify-center'>
            <FcGoogle className='text-xl me-2' /> 
            <p className=''>{loading?'loading...':"Continue with Google"}</p>
        </button>
        {error && <p className='text-red-600 mt-5'>{error} </p> }
        </>
    );
}
