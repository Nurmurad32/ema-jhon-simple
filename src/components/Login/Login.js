import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import firebaseConfig from './firebase.config';
import { useForm } from 'react-hook-form';
import "firebase/auth";
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../../images/logo.png';
import google from '../../images/google.png';
import './Login.css';


firebase.initializeApp(firebaseConfig);

function Login() {
  // form hook validation
  const { register, errors, handleSubmit } = useForm();

  //User state
  const [user, setUser] = useState({
    isSignedIn: false,          //For google Sign In
    newUser: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    success: false
  });

  //Context API for loggedIn
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  //New User
  const [newUser, setNewUser] = useState(false);

  //User email, password, confirmPassword  validation
  const handleBlur = (e) => {
    let isFieldValid = true;
    const p1 = document.getElementById('pass1').value;

    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber
    }
    if (e.target.name === 'confirmPassword') {
      if (p1 !== "undefined" && e.target.value !== "undefined") {
        if (p1 !== e.target.value) {
          isFieldValid = false;
          const newUserInfo = { ...user }
          newUserInfo.error = 'Confirm Password is incorrect';
          setUser(newUserInfo);
        }
      }
      else isFieldValid = true;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value;
      newUserInfo.error = '';
      setUser(newUserInfo);
    }
  }

  //User form Submit
  const onSubmit = e => {
    // console.log(user.name, user.email, user.password, user.confirmPassword)
    if (newUser && user.name && user.email && user.password && user.confirmPassword) {
      console.log('Submitted');

      // Registration user
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // ..
        });
    }

    // Log in user
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // Signed in 
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log("sign in user info", res.user)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    // e.preventDefault();
  };

  //Username update
  const updateUserName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function () {
      // Update successful.
      console.log("User name updated successfully")
    }).catch(function (error) {
      // An error happened.
      console.log(error)
    });
  }


  //Start Google Sign In
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, email } = res.user
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          error: '',
          success: true
        }

        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        setUserToken();
        history.replace(from);
        
        // console.log(displayName, email);
      })
      .catch(error => {
        const signedInUser = {
          isSignedIn: false,
          error: error.message,
          success: false
        }
        setUser(signedInUser);
      })
  }

  //Google SignOut 
  const handleGoogleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          error: '',
          success: false
        }
        setUser(signedOutUser);
      })
      .catch(err => {
        console.log(err);
      })
  }
  //End Google Sign In Authentication

  const setUserToken = () =>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      sessionStorage.setItem('token',idToken)
    }).catch(function(error) {
      // Handle error
    });
  }
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* <h1 style={{ color: 'red' }}>Using React hook form</h1> */}
      <Link to="/">
        <img src={logo} alt="" height='80' />
      </Link>

      {/* Show Success message */}
      {user.success && <p style={{ color: 'green' }}> {newUser ? 'User created' : 'Your account Logged In'} successfully</p>}
      {/* Show error message */}
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.isSignedIn && <div>
          <p>Welcome, <span style={{ color: "green" }} >{user.name}</span> </p>
          <p>Email: {user.email}</p>
        </div>
      }

      <form onSubmit={handleSubmit(onSubmit)} className="form-style">
        {newUser ? <h2>Create an account</h2> : <h2>Login</h2>}
        {/* Input name */}
        {newUser && <input className="input form-control" name="name" type="name" onBlur={handleBlur} placeholder="Your Name" ref={register({ required: true })} />}
        {errors.name && <span style={{ color: 'red', display: 'block' }} >"*Name is required"</span>}

        {/* Input Email */}
        <input className="input form-control" name="email" type="email" onBlur={handleBlur} placeholder="Your Email" ref={register({ required: true })} />
        {errors.email && <span style={{ color: 'red', display: 'block' }} >"*Email is required"</span>}

        {/*Input Password */}
        <input className="input form-control" id="pass1" name="password" type="password" onBlur={handleBlur} placeholder="password" ref={register({ required: true })} />
        {errors.password && <span style={{ color: 'red', display: 'block' }} >"*Password is required"</span>}

        {/*Input Confirm Password */}
        {newUser && <input className="input form-control" id="pass2" name="confirmPassword" type="password" onBlur={handleBlur} placeholder="Confirm Password" ref={register({ required: true })} />}
        {errors.confirmPassword && <span style={{ color: 'red', display: 'block' }} >"*confirm Password is required"</span>}

        {/* Submit button */}
        {newUser ? <input type="submit" value="Sign Up" className="main-btn" /> : <input type="submit" value="Log In" className="main-btn" />}

      </form>
      {/* dynamic button for login and register  */}
      <div style={{ color: 'black', cursor: 'pointer', marginRight: '10px', marginTop: '15px' }}>
        <p >
          {newUser ? <span>Already have an account?<a href="#" onClick={() => setNewUser(!newUser)}>Sign In</a></span> : <span>Don't have an account? <a href="#" onClick={() => setNewUser(!newUser)}>Sign Up</a></span>}
        </p>
      </div>
      <p>Or</p>
      {/* Google Sign In Button */}
      {user.isSignedIn
        ? <div onClick={handleGoogleSignOut} class="login-google">
          <img src={google} alt="" style={{ height: "31px", width: "31px" }} />
          <p>Continue with Google Sign Out</p>
        </div>
        : <div onClick={handleGoogleSignIn} class="login-google">
          <img src={google} alt="" style={{ height: "31px", width: "31px" }} />
          <p>Continue with Google </p>
        </div>
      }
    </div>
  );
}

export default Login;
