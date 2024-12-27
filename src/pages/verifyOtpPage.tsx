// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const VerifyOtpPage: React.FC = () => {
//   const [otp, setOtp] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get sessionToken from query params
//   const queryParams = new URLSearchParams(location.search);
//   const sessionToken = queryParams.get("sessionToken");

//   useEffect(() => {
//     if (!sessionToken) {
//       setError("Session token is missing. Please try again.");
//     }
//   }, [sessionToken]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!otp || otp.length !== 6) {
//       setError("Please enter a valid OTP.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/verify-otp",
//         { otp },
//         {
//           headers: {
//             Authorization: sessionToken || "", // Include session token in the request header
//           },
//         }
//       );

//       if (response.status === 200) {
//         setMessage("OTP verified successfully! Redirecting to login...");
//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.error || "An unknown error occurred during OTP verification."
//       );
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
//         <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         {message && <div className="text-green-500 mb-4">{message}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="otp"
//               className="block mb-2 text-sm font-medium text-gray-700"
//             >
//               OTP
//             </label>
//             <input
//               type="text"
//               name="otp"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full p-2 border rounded text-gray-700"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//           >
//             Verify OTP
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtpPage;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyOtpPage: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sessionToken = localStorage.getItem("sessionToken");
    if (!sessionToken) {
      setError("Session expired. Please sign up again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/verify-otp",
        { otp },
        { headers: { authorization: sessionToken } }
      );
      if (response.status === 200) {
        alert("OTP verified successfully! Redirecting to login...");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Invalid OTP or expired session. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Enter OTP
            </label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={handleOtpChange}
              className="w-full p-2 border rounded text-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
