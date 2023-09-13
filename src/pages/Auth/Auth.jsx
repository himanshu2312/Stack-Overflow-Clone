import {React,useState} from 'react'
import "./Auth.css"
import icon from "../../assets/icon.png" 
import AboutAuth from './AboutAuth'
import {signup,login} from "../../actions/auth.js"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate=useNavigate();
  const dispatch=useDispatch();
  
  const handleSwitch=()=>{
    setIsSignUp(!isSignUp)
  }
  
  const handleSubmit=(e)=>{
    e.preventDefault(0)
    if(!email || !password){
      alert("Enter Email & Password to Continue")
    }
    else{
      if(isSignUp){
        if(!name){
          alert("Enter a Name to Continue")
        }else{
          dispatch(signup({name,email,password}, navigate))
        }
      }else{
        dispatch(login({email,password}, navigate))
      }
    }
  }

  return (
    <section className='auth-section'>
      {isSignUp && <AboutAuth/>}
      <div className="auth-container-2">
        {!isSignUp && <img src={icon} alt="Stack Overflow" className='login-logo' />}
        <form onSubmit={handleSubmit}>
          {
            isSignUp &&
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input type="name" name='name' id='name' onChange={(e)=>setname(e.target.value)}/>
            </label>
          }
          <label htmlFor="email">
            <h4>Email</h4>
            <input type="email" name='email' id='email' onChange={(e)=>setemail(e.target.value)}/>
          </label>
          <label htmlFor="password">
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <h4>Password</h4>
              {!isSignUp && <p style={{ fontSize: "12px"}}><span>Forget password?</span></p>}
            </div>
            <input type="password" name='password' id='password' onChange={(e)=>setpassword(e.target.value)} autoComplete='true'/>
            {
              isSignUp &&
              <p style={{color:"hsl(210,8%,45%)", fontSize: "12px"}}>Passwords must contain at least eight characters,<br/> including at least 1 letter and 1 number.</p>
            }
          </label>
          {
            isSignUp &&
            <label htmlFor='check'>
             <input type="checkbox" name="check" id="check" />
             <p style={{ fontSize: "12px"}}>Opt-in to receive occasional product <br />updates, user research invitations, company <br />announcements, and digests.</p>
            </label>
          }
          <button type='submit' className='auth-btn'>{isSignUp?"Sign Up":"Log in"}</button>
          {
            isSignUp &&
            <p style={{color:"hsl(210,8%,45%)", fontSize: "12px"}}>By clicking “Sign up”, you agree to our <span>terms of <br />service</span> and acknowledge that you have read and <br />understand our <span>privacy policy</span> and <span>code of <br />conduct</span>.</p>
          }
        </form>
        <p>
          {
            isSignUp?"Already have an account?":"Don't have an account?"
          }
          <button type='button' className='handle-switch-btn' onClick={handleSwitch}>
            {isSignUp?"Log in":"Sign Up"}
          </button>
        </p>
      </div>

    </section>
  )
}
