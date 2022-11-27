import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible, } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { AuthContext } from '../../Context/UseContext';
import { getImageUrl } from '../../api/ImageUpload';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SmallSpinner from '../../Component/Spinner/SmallSpinner';
import toast from 'react-hot-toast';
import UseToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, loading, setLoading } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [confirmShowPass, setConfirmShowPass] = useState(false);
    const [preview, setPreview] = useState();
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    // const [token] = UseToken(createdUserEmail);
    // const navigate = useNavigate();

    // if (token) {
    //     navigate('/');
    // }


    const handleSignUp = (data) => {
        setSignUPError('')
        const image = data.image[0];

        console.log(image);
        getImageUrl(image)
            createUser(data.email, data.password)
                .then(result => {
                    const user = result.user;
                   
                    toast.success('User Created Successfully.')
                    const userInfo = {
                        displayName: data.name,
                        phoneNumber: data.phone

                    }
                    console.log(userInfo);
                    updateUserProfile(userInfo)
                        .then(() => {
                            const profileInfo = {
                                name: user.displayName,
                                email: user.email,
                                phone: user.phoneNumber,
                                status: 'unverified',
                                role: data.role
                            }
                            saveUser(profileInfo)
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => {
                    setSignUPError(err.message)
                    setLoading(true)
                    console.error(err)
                })
    }

    const saveUser = (userProfile) => {
        fetch('${process.env.REACT_APP_API_URL}/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userProfile)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(userProfile.email);
            })
    }

    function handleChange(e) {
        setPreview(URL.createObjectURL(e.target.files[0]));
    }


    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto pt-8">
                <form className="w-full max-w-md" onSubmit={handleSubmit(handleSignUp)}>
                {
                        preview ? <img className="object-cover w-24 h-24 mx-auto rounded-full" src={preview} alt="user avatar" /> : <FaUserAlt className='w-20 h-20 mx-auto'/>
                }
                        <div className="flex items-center justify-center mt-6">
                            <Link to="#" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                                sign up
                            </Link>
                        </div>
                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>

                            <input type="text"
                            {...register("name", {
                                required: "Name is Required"
                            })}
                            className="block w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username"/>
                        </div>
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

                    <div className='relative flex items-center mt-8'>
                        <span className="absolute">
                            <SupervisedUserCircleIcon className='w-6 h-6 mx-3 text-gray-300 dark:text-gray-500'/>
                        </span>
                        <select {...register("role")} className="block w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                        </div>
                    
                        <label htmlFor="dropzone-file" className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-md cursor-pointer dark:border-gray-600 dark:bg-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>

                            <h2 className="mx-3 text-gray-400">Profile Photo</h2>

                            <input id="dropzone-file" type="file"
                            {...register("image", {
                                required: "Upload an Image"
                            })}
                            className="hidden" 
                            onChange={handleChange}
                            />
                        </label>

                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>

                            <input type="email"
                            {...register("email", {
                                required: true,
                                // pattern: { value: !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: 'Please Provide Validate Email' }
                            })}
                            className="block w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address"/>
                        </div>
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    
                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                        <input type={showPass ? 'text' : "password"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be 6 characters long" },
                                // pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                            })}
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password"/>
                        <div className="absolute right-3 top-4" onClick={() => setShowPass(!showPass)}>
                            {showPass ? <AiFillEyeInvisible className='h-6 w-6' /> : <AiFillEye className='h-6 w-6' />}
                        </div>
                        </div>
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                        <input type={confirmShowPass ? 'text' : "password"} className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password"/>
                        <div className="absolute right-3 top-4" onClick={() => setConfirmShowPass(!confirmShowPass)}>
                            {confirmShowPass ? <AiFillEyeInvisible className='h-6 w-6' /> : <AiFillEye className='h-6 w-6' />}
                        </div>
                        </div>

                        <div className="mt-6">
                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                {
                                    loading ? <SmallSpinner/> : 'Sign Up'
                                }
                            </button>
                        {signUpError && <p className='text-red-600'>{signUpError}</p>}
                            <div className="mt-6 text-center ">
                                <Link to="/login" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                    Already have an account?
                                </Link>
                            </div>
                        </div>
                </form>
            </div>
        </section>
    );
};

export default SignUp;