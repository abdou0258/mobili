import { useState, useRef, useEffect } from 'react';

import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaSearch } from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import {useSelector,useDispatch} from 'react-redux'
import{
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFailure
}from "../redux/user/userSlice"

const initialNavigation = [
  { name: 'Home', to: '/', current: true },
  { name: 'About', to: '/about', current: false },
];

const initialSuggestions = [
  'Villa with a pool', 'apartment with a park view', '5 story office'
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [navigation, setNavigation] = useState(initialNavigation);
  const [isMenuModalOpen, setMenuModalOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const {currentUser} = useSelector(state => state.user)
  const searchRef = useRef(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[searchTerm,setSearchTerm] = useState('')

  const handleNavClick = (name) => {
    const updatedNavigation = navigation.map((item) =>
      item.name === name ? { ...item, current: true } : { ...item, current: false }
    );
    setNavigation(updatedNavigation);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchModalOpen]);

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

  const handleSubmit = (e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm',searchTerm)
    const searchQuery= urlParams.toString()
    navigate(`/search?${searchQuery}`)

  }
  const handleSubmitFavourite = (e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm',searchTerm)
    const searchQuery= urlParams.toString()
    navigate(`/search?${searchQuery}`)

  }

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if(searchTermFromUrl){

      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])

  return (
    <>
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 sm:px-6 lg:px-8 md:pt-2 pt-4">
              <div className="relative flex h-16 px-6 py-9 items-center justify-between w-full mx-auto rounded-lg md:mt-2 bg-white/30 glass ">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setMenuModalOpen(true)}
                  >
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars2Icon className="block h-6 w-6 text-white" aria-hidden="true" />
                    )}
                  </button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img className="w-14" src={logo} alt="Your Company" />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4 items-center pt-3">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            item.current ? 'text-white' : 'text-white hover:underline',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                          onClick={() => handleNavClick(item.name)}
                        >
                          <h5 className='font-light'>{item.name}</h5>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full pe-4"
                    onClick={() => setSearchModalOpen(true)}
                  >
                    <FaSearch className="h-5 w-5 text-white" aria-hidden="true" />
                  </button>
                  

                  {/* Profile dropdown */}
                        {currentUser ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button  className={`relative h-12 w-12 flex justify-center items-center rounded-full ${currentUser?.role === 'Individual' ? 'bg-red-500' : currentUser?.role === 'Developer' ? 'bg-blue-500' : currentUser?.role === 'Agent' ? 'bg-green-500' : 'bg-slate-500'}`}>
                        <img
                          className="h-10 w-10 rounded-full "
                          src={currentUser?.avatar || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
                          alt="profile"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/profile"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                 <p>Profile</p> 
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/my-listings"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                 <p>My Listings</p> 
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                to={`/fav-listings/${currentUser._id}`}
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                  <p>Favorites</p> 
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <p onClick={handleSignout} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-1 text-md text-gray-700')}
                                >
                                  Sign out
                                </p>
                              )}
                            </Menu.Item>
                            </Menu.Items>
                          
                    </Transition>
                  </Menu>
                        ) : (
                          <Link to= "/sign-in">

                            <button type='button text-white border-2-white' style={{border:"2px solid white",padding:"6px 25px",color:"white",fontWeight:"normal"}}><h5>Login</h5> </button>
                          </Link>
                        )}
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>

      {/* Mobile Menu Modal */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white w-full h-full rounded-lg p-4">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setMenuModalOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <div className="space-y-1 text-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  as={Link}
                  to={item.to}
                  className={classNames(
                    item.current ? 'text-black' : 'text-gray-800 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-xl font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                  onClick={() => {
                    handleNavClick(item.name);
                    setMenuModalOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <div className={`absolute inset-x-0 z-40 transition-transform duration-300 ${isSearchModalOpen ? 'translate-y-0' : '-translate-y-10'} flex justify-center`}>
        {isSearchModalOpen && (
          <div className="bg-white/90 glass rounded-b-2xl p-4 pb-5 w-full md:w-1/2 mx-8" ref={searchRef}>
            <form className="mt-2" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search..."
                className="w-full md:w-1/2 mx-auto block border border-gray-300 rounded-md px-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
              />
            </form>
            <div className="text-center text-white mt-4">
              <h3 className="text-lg font-semibold">Trending</h3>
             
                <p >Villa</p>
                <p >appartment</p>
                <p >office</p>
             
            </div>
          </div>
        )}
      </div>
    </>
  );
}
