import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible, } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { AuthContext } from '../../Context/UseContext';
import { getImageUrl } from '../../api/ImageUpload';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [confirmShowPass, setConfirmShowPass] = useState(false);
    const [preview, setPreview] = useState();
    // const [createdUserEmail, setCreatedUserEmail] = useState('');
    // const [token] = UseToken(createdUserEmail);
    // const navigate = useNavigate();

    // if (token) {
    //     navigate('/');
    // }

    const handleSignUp = (data) => {
        setSignUPError('')
        console.log(data);
        const img = data.file[0]
        getImageUrl(img)
        .then(imgData => {
            // setPreview(imgData);
            createUser(data.email, data.password)
                .then(result => {
                    const user = result.user;
                    console.log(user)
                    toast('User Created Successfully.')
                    const userInfo = {
                        displayName: data.name,
                        photoUrl: imgData
                    }
                    updateUserProfile(userInfo)
                        .then(() => {
                            // saveUser(data.name, data.email)
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => {
                    setSignUPError(err.message)
                    console.error(err)
                })
        })
    }

    function handleChange(e) {
        console.log(e.target.files);
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
                    <div class="mt-6">
                        <h1 class="text-gray-500 dark:text-gray-300">Select type of account</h1>

                        <div class="mt-3 md:flex md:items-center md:-mx-2">
                            <button class="flex justify-center w-full px-6 py-3 text-white bg-blue-500 rounded-md md:w-auto md:mx-2 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>

                                <span class="mx-4">
                                    client
                                </span>
                            </button>

                            <button class="flex justify-center w-full px-6 py-3 mt-4 text-blue-500 border border-blue-500 rounded-md md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>

                                <span class="mx-4">
                                    worker
                                </span>
                            </button>
                        </div>
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

                        <label htmlFor="dropzone-file" className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-md cursor-pointer dark:border-gray-600 dark:bg-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>

                            <h2 className="mx-3 text-gray-400">Profile Photo</h2>

                            <input id="dropzone-file" type="file"
                            {...register("file", {
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
                                pattern: { value: !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: 'Please Provide Validate Email' }
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
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
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
                                Sign Up
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