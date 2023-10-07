import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { FaEye,FaEyeSlash } from 'react-icons/fa';
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
const Login = ()=>{
    const[loginError,setLoginError] = useState('');
    const [loginSuccess,setLoginSuccess] = useState('');
    const[showPassword,setShowpassword] = useState(false);
    const emailRef = useRef('');
    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email,password);
         //reset error
         setLoginError('');
         //reset success
         setLoginSuccess('');
        //add validation
        signInWithEmailAndPassword(auth,email,password)
        .then(result =>{
            console.log(result.user);
            if(result.user.emailVerified){
             setLoginSuccess('Login Successfully');
            }
            else{
                alert('Verify your email address');
            }
            
        })
        .catch(error => {
            console.log(error.message);
            setLoginError(error.message);
        })

    }
    const handleForgotPassword = () =>{
        const email = emailRef.current.value;
        if(!email)
        {
           console.log("please provide an email",email);
           return;
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        {
            console.log('Please write a valid email.');
            return;
        }
        //send validation
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert("please check your email");
        })
        .catch(error => {
            console.log(error.message);
        })
      
    }
    return(
      <div>
            <div className="hero min-h-screen bg-base-200">
           <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleLogin}>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input ref={emailRef} name="email" type="email" placeholder="email" className="input input-bordered" required />
                </div>
                {/* <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                </div> */}
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <div className="form-control relative">
            <input
             name="password"  
             type={showPassword ? "text" :"password"} 
             placeholder="Password" 
             className="input input-bordered" required />
            <span className="absolute top-4 right-2" onClick={()=> setShowpassword(!showPassword)}>{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>} 
            </span>
            <label className="label">
                <a onClick={handleForgotPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
            </div>
                <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
                </div>
                <p>New to this website? please <Link to="/register">Register</Link></p>
            </form>
            {
               loginError && <p className="text-red-700">{loginError}</p>
            }
            {
               loginSuccess && <p className="text-indigo-700">{loginSuccess}</p>
            }
            </div>
        </div>
        </div>
      </div>
    )
  }
  export default Login;