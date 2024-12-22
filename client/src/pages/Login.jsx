import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BASE_URL } from '../url';
import Footer from '../partials/Footer';
import SubmitButton from '../components/SubmitButton';
import Loading from '../Loading';
import axios from 'axios';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState();
  const [passtype, setPasstype] = useState('password');
  const navigate = useNavigate();

  function showPassword() {
    setPasstype(passtype === 'password' ? 'text' : 'password');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true)

    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });

      if (response.data.status === 'error') {
        setIsLoggingIn(false)
        setError(response.data.message);
      }
      else {
        sessionStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    }
    catch (error) {
      console.error('Error during login:', error);
      setIsLoggingIn(false)
      setError('An error occurred. Please try again later.');
    }
  };

  return isLoggingIn ? <Loading /> :
  <>
    <div className="w-full min-h-screen flex flex-col gap-12 justify-center items-center select-none">
      <div className="w-[230px] md:w-[300px] flex justify-between">
        <div className="w-[40%] text-[24px] font-bold flex items-center duration-300 ease-out rounded-md">
          Log in
        </div>
        <Link
          to="/Signup"
          className="w-fit px-4 border-2 border-[#50f] hover:bg-[#31b] hover:text-white text-[14px] flex justify-center items-center duration-500 ease-out rounded-md"
        >
          Sign up
        </Link>
      </div>

      <div className="w-max h-[85%] flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center "
        >

          <div className=" mb-[10px]  ">
            Email <br />
            <input
              type="email"
              name="email"
              required
              value={email}
              className="w-[230px] md:w-[300px] border-2 border-[#50f] rounded-md outline-none  p-[6px] bg-transparent"
              onChange={(e) => {
                setEmail(e.target.value.toLowerCase());
                setError("");
              }}
            />
          </div>

          <div className="mb-[20px] relative">
            Password <br />
            <input
              type={passtype}
              name="password"
              value={password}
              maxLength={20}
              minLength={6}
              required
              className="w-[230px] md:w-[300px] border-2 border-[#50f] rounded-md outline-none p-[6px] bg-transparent"
              onChange={(e) => {
                setPassword(e.target.value.toLowerCase());
                setError("");
              }}
            />
            {passtype == "password" ? (
              <FaEye
                size={20}
                onClick={showPassword}
                className="absolute right-[12px] bottom-[9px]"
              />
            ) : (
              <FaEyeSlash
                size={20}
                onClick={showPassword}
                className="absolute right-[12px] bottom-[9px]"
              />
            )}
          </div>

          {error && (
            <div className="text-[#f00] w-[80vw] flex justify-center text-center text-sm md:text-md pb-4">
              {error}
            </div>
          )}

          <SubmitButton value="Login" />
        </form>
      </div>
    </div>

  <Footer />
</>
    ;
}

export default Login