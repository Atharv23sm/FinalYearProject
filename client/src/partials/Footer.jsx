import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='w-full bg-[#31b] text-white py-6 bottom-0 left-0 flex flex-col items-center gap-4'>
        <div>Join the conversation</div>
        <div className='flex gap-10'>
        <Link to={'https://github.com/Atharv23sm'}><FaGithub size={'28'} /></Link>
        </div>
        <div className='text-xs'>
            { new Date().getFullYear()+' © Team'}
        </div>
    </div>
  )
}

export default Footer