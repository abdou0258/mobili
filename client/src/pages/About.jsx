import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import bg_about from '../assets/about.webp' 
function About() {
  return (
    <div>
      <div className="bg-all">
        <Header />
        <h1 className="text-white text-center mt-14 font-bold">
          About Us
        </h1>
      </div>
      <div className='w-2/3 mx-auto  mt-10'>
        <h1 className='font-bold'>Mobili ?</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent felis orci, porta et velit in, lobortis molestie magna. <br /> Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed accumsan, ex quis auctor pellentesque, velit dolor volutpat elit, a elementum lectus neque vestibulum libero. <br /> Mauris finibus nisl libero, ac pretium orci sollicitudin ut. Nullam vel aliquam est, et lobortis ligula. Vivamus vel ex efficitur, tempus urna aliquet, hendrerit nibh. Nulla laoreet lorem ut ante hendrerit condimentum. Duis id egestas ligula, nec vulputate elit.</p>
      </div>
      <main className='flex justify-center items-center w-2/3 mx-auto gap-20 mt-20'>

      <h1 className='font-bold'>Discover <br /> your ideal<br /> proprety</h1>
      <div className='border-l-2 ps-10'>
        <h5 >Finding the perfect place to call home can be hard. Our team <br />of creatives and specialists makes real estate easy.</h5>
        <Link to={"/search?"}>
            <button
              type="button"
              class="px-6 py-3 text-base font-medium text-white bg-black  mt-4"
            >
              Explore Now
            </button>
          </Link>
      </div>
      </main>
      <img src={bg_about} alt=""  />
      
    </div>
  )
}

export default About