import React, { useState } from "react";
import "./Login.css";
import { message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import axios from "../../Axios/Axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Store/Slice/ClientSlice";

function ClientLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      setError(null);
      axios.post("/clientLogin", { email, password }).then((response) => {
        const result = response.data;
        if (result.success) {
          localStorage.setItem("clientToken", JSON.stringify(result));
          dispatch(setLogin ({
            client:"client",
            name:result.clientName,
            token:result.clientToken
          }))
          setIsLoading(false);
          message.success("Login  successfully!");
          navigate("/");
        } else {
          setIsLoading(false);
          setError(result.message);
          message.error(result.message).then(() => {
            setError(null);
          });
        }
      });
    } catch (error) {
      console.log(error);
      message.error("Somthing went wrong!");
    }
  };
  return (
    <div className="bg-[#EDF4FE] w-screen  flex justify-center  ">
      <div className="   w-[600px] mt-[170px] lg:mt-[230px] px-4 pb-10 lg:pb-20">
        <h2 className=" text-3xl   font-mono font-bold">Log In With Email</h2>
        <p className="mb-10 text-[#1F6CD6] cursor-pointer">
          <Link to="/signup">Create New Account? Signup</Link>
        </p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2 "
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="bg-white p-2 rounded-lg w-full"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-black font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-white p-2 rounded-lg w-full"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error && (
            <div className="error text-center w-full p-2 bg-red-600 bg-opacity-30 text-red-500">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="mb-4 mt-10 flex justify-center " >
              
              <InfinitySpin width="200" color="#194569" />
            </div>

          ) : (
            <div className="mb-4 mt-10 flex justify-center">
              <input
                className="bg-white  hover:bg-[#194569] text-black font-medium py-2 px-32 rounded-lg"
                type="submit"
                value="Continue"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ClientLogin;
