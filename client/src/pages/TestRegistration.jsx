import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../axiosInstance';
import axios from 'axios';
import Footer from '../partials/Footer';
import SubmitButton from '../components/SubmitButton';
import { BASE_URL } from '../url';



const TestRegistration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [testId, setTestId] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        registerForTest(testId);
    };
    const registerForTest = async (testId) => {
        try {
            const response1 = await axios.post(`${BASE_URL}/register-user`,{name,email});
            console.log(response1);
            const { token,user } = response1.data;
            console.log(token);
            if(token){
                localStorage.setItem('token', token);
            }
            // console.log(testId);
            const response2 = await axiosInstance.post('/register-test', {name,email, testId });
            const { testId } = response2.data;
            

            if (testId) {
                navigate("/test",{state:testId}); // Redirect to the test page
            } else {
                console.error('No redirect URL provided.');
            }
        } catch (error) {
            console.error('Error registering for test :', error);
        }
    };

    return (
        <>
        <div className="w-full min-h-screen flex flex-col gap-12 justify-center items-center select-none">
            <div className="w-[230px] md:w-[300px] flex justify-between">
                <div className="w-[40%] text-[24px] font-bold flex items-center duration-300 ease-out rounded-md">
                    Test Regestration
                </div>
            </div>

            <div className="w-max h-[85%] flex justify-center items-center">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center items-center "
                >
                    <div className=" mb-[10px]">
                                Name <br />
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    maxLength={30}
                                    required
                                    className="w-[230px] md:w-[300px] border-2 border-[#50f] rounded-md outline-none p-[6px] bg-transparent"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setError("");
                                    }}
                                />
                            </div>
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
                    <div className=" mb-[10px]  ">
                        Test Id <br />
                        <input
                            type="text"
                            name="testId"
                            required
                            value={testId}
                            className="w-[230px] md:w-[300px] border-2 border-[#50f] rounded-md outline-none  p-[6px] bg-transparent"
                            onChange={(e) => {
                                setTestId(e.target.value);
                                setError("");
                            }}
                        />
                    </div>

                    
                    {error && (
                        <div className="text-[#f00] w-[80vw] flex justify-center text-center text-sm md:text-md pb-4">
                            {error}
                        </div>
                    )}

                    <SubmitButton value="Register and Start" />
                </form>
            </div>
        </div>

        <Footer />
    </>
    );
};

export default TestRegistration;
