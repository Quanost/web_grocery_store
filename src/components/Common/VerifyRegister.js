import React, { useState, useRef, useEffect } from "react";

const VerifyRegister = ({onVerifyOTP}) => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  
    const inputRefs = useRef(Array(6).fill(null));
  
    const handleOnChange = (index, value) => {
      const newOTP = [...otp];
      newOTP[index] = value.substring(value.length - 1);
  
      if (!value) {
        setActiveOTPIndex(index - 1 >= 0 ? index - 1 : 0);
      } else {
        setActiveOTPIndex(index + 1 < 6 ? index + 1 : 5);
      }
  
      setOtp(newOTP);
    };
  
    const handleOnKeyDown = (e, index) => {
      if (e.key === "Backspace") {
        const newIndex = index - 1 >= 0 ? index - 1 : 0;
        setActiveOTPIndex(newIndex);
        inputRefs.current[newIndex].focus();
      }
    };
    useEffect(() => {
      inputRefs.current[activeOTPIndex].focus();
    }, [activeOTPIndex]);
  
    useEffect(() =>{
        onVerifyOTP(otp.map(str => str.replace(',', '')).join(''))
    },[otp,onVerifyOTP])
    return (
      <div className="flex justify-center items-center space-x-2 my-5">
        {otp.map((_, index) => (
          <React.Fragment key={index}>
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              type="number"
              className="w-15 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-red-700 focus:text-red-700 text-gray-400 transition"
              onChange={(e) => handleOnChange(index, e.target.value)}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              value={otp[index]}
            />  
            {index === otp.length - 1 ? null : (
              <span className="w-2 py-0.5 bg-gray-400" />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

export default VerifyRegister