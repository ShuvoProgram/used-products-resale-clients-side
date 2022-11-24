import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../Shared/UseAuth/UseAuth';
import img from '../../img/regeter.webp'

const Regester = () => {
    const { loginWithGoogle, setUser, setError, error } = UseAuth()
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        setError("")
        const file = data.img[0]
        const formData = new FormData();
        formData.append("image",file)
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url,{
            method:"POST",
            body:formData
        })
        .then(res => res.json())
        .then(imgData =>{
            if(imgData.success){
                console.log(imgData.data.url)
            }
        }) 
        console.log(file)
        reset()
    };
    const loginGoogle = () => {
        setError("")
        loginWithGoogle()
            .then(result => {
                const user = result.user;
                setUser(user)
            })
            .catch(error => {
                const errorMessage = error.message;
                setError(errorMessage)
            })
    }
    return (
        <div className='md:flex justify-center items-center gap-4'>
            <div className='md:w-2/4'>
                <h6 className='text-2xl text-center font-semibold capitalize'>Please Rgester your account</h6>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <label className="label">
                        <span className="label-text">Type Your Name</span>
                    </label>
                    <input placeholder='type your email' type="text" className="input input-bordered w-full" {...register("name")} />
                    <label className="label">
                        <span className="label-text">Upload Your Photo</span>
                    </label>
                    <input type="file" {...register("img", { required: true })} />
                    <label className="label">
                        <span className="label-text">Type Your Email?</span>
                    </label>
                    <input placeholder='type your email' className="input input-bordered w-full" {...register("email")} />
                    <label className="label mt-3">
                        <span className="label-text">Type Your Password?</span>
                    </label>
                    <input placeholder='type your password' className="input input-bordered w-full" type="password" {...register("password")} />
                    {error && <p className='my-3 text-red-600'>{error}</p>}
                    <input className="btn btn-outline my-3" type="submit" />
                </form>
                <button className="btn btn-outline my-3 w-full" onClick={loginGoogle}>Google</button>
            </div>
            <div className='md:w-2/4'>
                <img src={img} alt="" />
            </div>
        </div>
    );
};

export default Regester;