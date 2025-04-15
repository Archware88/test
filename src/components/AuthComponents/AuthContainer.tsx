import { useState } from "react";
import LoginModal from "./Signin";
import SignupModal from "./Signup";

// Define Props Type
interface AuthContainerProps {
  onClose: () => void;
  defaultStep?: "login" | "signup"; 
}

const AuthContainer: React.FC<AuthContainerProps> = ({ onClose, defaultStep = "login" }) => {
  const [authStep, setAuthStep] = useState<"login" | "signup">(defaultStep);

  console.log("Current auth step:", authStep);

  return (
    <>
      {authStep === "login" && (
        <LoginModal
          onClose={onClose}
          onSwitchToSignup={() => setAuthStep("signup")}
        />
      )}

      {authStep === "signup" && (
        <SignupModal
          onClose={onClose}
          onSwitchToLogin={() => setAuthStep("login")}
          onSignupSuccess={() => {
            setAuthStep("login"); 
          }}
        />
      )}
    </>
  );
};

export default AuthContainer;
