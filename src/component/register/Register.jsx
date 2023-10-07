import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye,FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";
const Register = ()=>{
    const[registerError,setRegisterError] = useState('');
    const [regiSuccess,setRegiSuccess] = useState('');
    const[showPassword,setShowpassword] = useState(false);
    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const accepted = e.target.terms.checked;
        const password = e.target.password.value;
        console.log(name,email,password,accepted);
        //reset error
        setRegisterError('');
        //reset success
        setRegiSuccess('');


        //password validation
        if(password.length < 6)
        {
            setRegisterError("Passwprd should be 6 character or longer.");
            return;
        }
//         else if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/
// .test(password))
//            {
//             setRegisterError("password formate not right");
//             return;
//            }
        else if(!accepted){
            setRegisterError("Please accept our terms and condition");
            return;
        }
        
        //create User
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user);
            setRegiSuccess('User Create Successfully');
            //update profile
            updateProfile(result.user,{
                displayName: name,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
            .then(()=>{
                console.log("Profile Update.");
            })
            .catch();
            //send emailVerification
            sendEmailVerification(result.user)
            .then(()=>{
             alert("Please check your email and verify your account.");
            })
        })
        .catch(error =>{
            console.log(error.code);
            setRegisterError(error.message);
        })
        
        
    }
    return(
      <div>
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Registration now!</h1>
        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleRegister}>
           <div className="form-control">
            <label className="label">
                <span className="label-text">User Name</span>
            </label>
            <input name="name" type="text" placeholder="User Name" className="input input-bordered" required />
            </div>
            <div className="form-control">
            <label className="label">
                <span className="label-text">Email</span>
            </label>
            <input name="email" type="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
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
            </div>
            <br />
            <div className="form-control relative">
            <input className="absolute mt-3" type="checkbox" name="terms" id="terms"/>  
            <lebel className="label ml-4" htmlFor="terms">Accept our <a href="#">Terms and Condition</a>.</lebel>
            </div>
            </div>
            <div className="form-control mt-6">
            <button className="btn btn-primary">Registration</button>
            </div>
            <p>Already have an account? please <Link to="/login">Login</Link></p>
        </form>
        {
            registerError && <p className="text-red-700">{registerError}</p>
        }
        {
            regiSuccess && <p className="text-indigo-700">{regiSuccess}</p>
        }
        </div>
      </div>
      </div>
      </div>
    )
  }
  export default Register;