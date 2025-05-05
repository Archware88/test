import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

// Define prop types
interface VerifyEmailModalProps {
  userEmail: string;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({
  userEmail,
  onClose,
  onSwitchToLogin,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState<number>(30);

  // Handle OTP input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input box
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  // Handle backspace key event
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  // Start the resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-8">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl flex overflow-hidden">
        {/* Right Side */}
        <div className="w-full p-6 relative">
          {/* Close Button */}
          <button className="absolute top-4 right-4 text-2xl cusor-pointer text-gray-600" onClick={onClose}>
            <FiX />
          </button>

          <h2 className="text-2xl font-semibold pt-8 text-center">Verify Your Email Address</h2>
          <p className="text-center text-gray-600 mt-2">
            Please enter the 6-digit code sent to <strong>{userEmail}</strong> to complete your registration.
          </p>

          {/* OTP Input Fields */}
          <div className="flex justify-center space-x-2 mt-6 py-20 bg-white">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                maxLength={1} // ✅ Corrected maxLength syntax
                className="w-12 h-12 text-xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          {/* Verify Button */}
          <div className="pt-8">
            <button className="w-full bg-[#1B09A2] text-white p-3 cusor-pointer rounded-lg">Verify Email</button>
          </div>

          {/* Resend OTP Link */}
          <p className="text-center text-sm mt-4">
            Didn`&apos;`t get an OTP?{" "}
            {resendTimer > 0 ? (
              <span className="text-gray-500">Resend in {resendTimer}s</span>
            ) : (
                <button className="text-blue-600 cusor-pointer" onClick={() => setResendTimer(30)}>
                Resend Code
              </button>
            )}
          </p>

          {/* Back to Login */}
          <p className="text-center text-sm mt-4">
            Already verified?{" "}
            <button className="text-blue-600 cusor-pointer" onClick={onSwitchToLogin}>
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailModal;
