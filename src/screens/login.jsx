import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imageLogin from "../assets/loginImage.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [direction, setDirection] = useState('ltr');
  const navigate = useNavigate(); 
  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Both email and password are required.");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("frontend_lang", "en_US");
    myHeaders.append("Cookie", "session_id=f9d45fe7ef13bb5277a238345d3b77e27bd8531f");

    var raw = JSON.stringify({
      "jsonrpc": "2.0",
      "params": {
        "db": "test",
        "login": email,
        "password": password
      }
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    try {
      const response = await fetch("http://37.77.48.69/web/session/authenticate", requestOptions);

      if (response) {
        const result = await response.json();
      
        if (("result" in result)) {
          console.log('Login successful:', result);
          alert("Login successful!");
          localStorage.setItem('authToken', result.authToken); // Store auth token in localStorage
          navigate('/home'); // Redirect to home page using navigate
        } else {
          window.ll=result
         //  result = await response.json();
          console.error('Login failed:', result);
          setErrorMessage(result.error || "Login failed. Please check your credentials.");
        }
        }
       // window.tt=result
      
    } catch (error) {
      console.log('Network error:', error);
      //setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div dir='rtl' className={`flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-blue-50 ${direction === 'rtl' ? 'rtl' : ''}`}>
      <div className={`flex bg-white rounded-lg shadow-xl overflow-hidden w-11/12 max-w-5xl ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
        <div className="w-1/2 bg-blue-100 flex justify-center items-center p-8">
          <img src={imageLogin} alt="Login Illustration" className="w-96 h-96 object-contain" />
        </div>

        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-4 text-blue-600 text-center">تسجيل الدخول</h2>

          {errorMessage && <div className="mb-4 text-red-500 text-center">{errorMessage}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-blue-500 font-medium mb-2">الايميل</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                placeholder="أدخل الايميل الخاص بك"
              />
            </div>
            <div className="mb-4">
              <label className="block text-blue-500 font-medium mb-2">كلمة السر</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                placeholder="يرجى ادخال كلمة السر"
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <a href="#" className="text-sm text-blue-500 hover:underline">هل نسيت كلمة المرور؟</a>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition duration-200"
            >
              تسجيل الدخول
            </button>

            <button
              type="button"
              className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 flex justify-center items-center"
            >
              <span> تسجيل الدخول مع </span>
              <span> كوكل </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
