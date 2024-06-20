import { useSelector,useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { updateUserFailure,updateUserSuccess,updateUserStart, deleteUserFailure,deleteUserSuccess,deleteUserStart ,
  signoutUserFailure,signoutUserSuccess,signoutUserStart
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

function Profile() {
  const fileRef = useRef(null);
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({...currentUser});
  const [updateSuccess,setUpdateSuccess] = useState(false)
  const dispatch = useDispatch()

 
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch (`/api/user/update/${currentUser._id}`,{
        method:"PATCH",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data =await res.json()
      if(data.success ===false){
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async()=>{
    try {
      dispatch(deleteUserStart())
      const res = await fetch (`/api/user/delete/${currentUser._id}`,{
        method:"DELETE",
      })
      const data =await res.json()
      if(data.success ===false){
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
   const handleSignout = async()=>{
    try {
      dispatch(signoutUserStart())
      const res = await fetch (`/api/auth/signout`,{
        method:"GET",
      })
      const data =await res.json()
      if(data.success ===false){
        dispatch(signoutUserFailure(data.message))
        return
      }
      dispatch(signoutUserSuccess(data))
      
    } catch (error) {
      dispatch(signoutUserFailure(error.message))
    }
  }

  return (
    <div>
      <div className="bg-all">
        <Header />
        <h1 className="text-white text-center mt-14 font-bold">Profile</h1>
      </div>
      <section id="profile">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center my-10">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile picture"
            className="rounded-full w-20"
          />
          <p>
            {fileUploadError ? (
              <span className=" text-red-700">Error Image upload</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="  text-slate-700">{`Uploading 
               ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className=" ☐ text-green-700">
                Image successfully uploaded
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            name="username"
            id="username"
            className="border-2 w-1/2 md:w-1/4 py-1 px-2 outline-none rounded-lg "
            placeholder="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            id="email"
            className="border-2 w-1/2 md:w-1/4 py-1 px-2 outline-none rounded-lg "
            placeholder="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            id="password"
            className="border-2 w-1/2 md:w-1/4 py-1 px-2 outline-none rounded-lg "
            placeholder="password"
            onChange={handleChange}
            
          />
          <h5>I'm a :</h5>
          <div className="flex justify-start items-center">
            <input
              type="radio"
              id="individual"
              name="role"
              value="Individual"
              className="radio"
              onChange={handleChange}
              checked={formData.role === "Individual"}
            />
            <label for="individual" className="pe-10 ps-1">
              <p>Individual</p>
            </label>
            <input type="radio" id="developer" name="role" value="Developer" onChange={handleChange} checked={formData.role === "Developer"}/>
            <label for="developer" className="pe-10 ps-1">
              <p>Developer</p>
            </label>
            <input type="radio" id="agent" name="role" value="Agent" onChange={handleChange} checked={formData.role === "Agent"}/>
            <label for="agent" className="pe-10 ps-1">
              <p>Agent</p>
            </label>
          </div>
          <button
          disabled={loading}
            type="submit"
            className="bg-prim w-1/2 md:w-1/4 text-white py-2 mt-5 rounded-lg"
          >
            <p>{loading?'loading ...':'Update'} </p>
          </button>
          <Link to="/create-listing" className="w-1/2 md:w-1/4 bg-second  text-white text-center py-2 mt-px rounded-lg">
         
            <p>Create Listing </p>
        
          </Link>
          <div className="flex justify-between w-1/2 md:w-1/4 text-red-500">
            <p onClick={handleDeleteUser}>Delete account</p>
            <p onClick={handleSignout}>Sign out</p>
          </div>
          {error?<p className="text-red-700">Error: {error}</p>:''}
          {updateSuccess?<p className="text-green-700">Updated successfully</p>:''}
        </form>
      </section>
    </div>
  );
}

export default Profile;
