import React from 'react'
import { ReactComponent as TeamIllustration } from '../assets/team-illustration.svg'
const Home = () => {

  const handleLogin = () => {
    
  }

  return (
    <div className='flex flex-col sm:scale-90 sm:w-[450px] w-full h-full m-auto max-w-7xl p-2 bg-white rounded-lg'>
      <h2 className='text-lg font-medium'>TeamUp</h2>
      <div className='mt-4'>
        <TeamIllustration className='m-auto scale-90' />
      </div>
      <div className='mt-4'>
        <h3 className='font-medium text-lg'>Find a partner to work with on your projects!</h3>
        <h4 className='w-3/5 m-auto font-medium text-md text-gray-500'>Check their last work and message them if you're interested!</h4>
      </div>
      <div className='mt-auto mb-2'>
        <button onClick={handleLogin} className='text-white font-medium bg-[#CD5F52] px-8 py-2'>Login with Discord</button>
      </div>
    </div>
  )
}

export default Home