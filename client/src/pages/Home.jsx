import { Navigate } from "react-router-dom"

const token = sessionStorage.getItem('token')

function Home() {
  return token ? (
    <>
      <div className="text-black">Hello</div>
    </>
  )
  : <Navigate to={'/login'}/>
}
export default Home