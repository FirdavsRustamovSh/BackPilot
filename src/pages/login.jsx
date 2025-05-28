import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from './../assets/logo.png'
import backgroundImage from './../assets/backgroundImage.png'
import { Eye, EyeClosed, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  //   const navigate = useNavigate();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }

    try {
      const res = await axios.post("http://185.100.53.16:4001/api/Auth/login", {
        email,
        password,
      });
      console.log('res', res.data.token)

      const { accessToken, resetToken } = res.data.token;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", resetToken);
      navigate("/logs"); // Navigate after successful login


      //   navigate("/statistics");
    } catch (error) {
      setErrorMessage("Login yoki parol noto‘g‘ri.");
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Panel */}
      <div className="w-full md:w-[50%] bg-[#0C111D] flex flex-col justify-between items-center px-6 py-8 rounded-tr-[28px] rounded-br-[28px]">
        {/* Logo placeholder */}
        <div className="flex items-center justify-center ">
          <img src={logo} alt="" className="h-32 w-32" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full max-w-md">
          <h2 className="text-white text-3xl font-semibold mb-8 text-center">Sign in</h2>

          {/* Email Field */}
          <label className="text-white text-sm mb-1 block">Email</label>
          <div className="relative mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#101828] text-white border border-[#344054] rounded-xl focus:outline-none"
            />
          </div>

          {/* Password Field */}
          <label className="text-white text-sm mb-1 block">Password</label>
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#101828] text-white border border-[#344054] rounded-xl focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-lg"
            >
              {showPassword ? <EyeClosed className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Enter
          </button>

          {/* Error message */}
          {errorMessage && (
            <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
          )}
        </form>

        <p className="text-white text-sm mt-10 text-center flex gap-2">
          <Shield className="w-5 h-5" />Your data. Always protected. Always available.
        </p>
      </div>

      {/* Right Side (background image) */}
      <div className="hidden md:flex flex-grow relative bg-black z-[-1] -ml-[136px] lg:w-[35%] md:w-[35%]">
        <div
          className="w-full h-full bg-cover bg-center" >
          <img
            src={backgroundImage}
            alt="Forest Background"
            className="w-full h-full object-cover md:h-screen"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
