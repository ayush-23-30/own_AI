import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../custom/Button";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../config/axios";
import { toast } from "react-toastify";

function Register() {
  const [eyes, setEyes] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // Full Name state
  const [phoneNumber, setPhoneNumber] = useState(""); // Phone Number state

  const navigate = useNavigate();

  function checkFormValidation() {
    if (fullName === "") {
      toast.error("Full Name is required");
      return false;
    }
    if (email === "") {
      toast.error("Email is required");
      return false;
    }
    if (password === "") {
      toast.error("Password is required");
      return false;
    }
    return true;
  }

const { setUser } = useContext(UserContext);

  function submitHandler(e) {
    if (!checkFormValidation()) {
      return;
    }
    e.preventDefault();
    axiosInstance
      .post("/users/register", { fullName, email, password, phoneNumber })
      .then((res) => {
        setUser(res.data.user); 
        localStorage.setItem("token", res.data.token);

        navigate("/");
        toast.success("User Registered Successfully");
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          toast.error(err.response.data.errors[0].msg);
        }
        console.error(err.response.data);
      });
  }

  const toggle = () => {
    setEyes(!eyes);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full m-2 max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Sign Up</h2>

        <form className="space-y-4" onSubmit={submitHandler}>
          {/* Full Name Input */}
          <div>
            <label htmlFor="fullName" className="block mb-2 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Password
            </label>
            <div className="relative w-full">
              <input
                type={eyes ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <div className="absolute bottom-3 right-3" onClick={toggle}>
                {eyes ? (
                  <IoEyeSharp color="black" />
                ) : (
                  <FaEyeSlash color="black" />
                )}
              </div>
            </div>
          </div>

          {/* Phone Number Input (Optional) */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium"
            >
              Phone Number*
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number (optional)"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            // loading={loading}
            className="w-full"
            onClick={submitHandler}
          >
            Sign Up
          </Button>
        </form>

        {/* Navigation to Login */}
        <p className="text-center text-sm">
          Already have an account?
          <Link to="/login" className="pl-1 text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
