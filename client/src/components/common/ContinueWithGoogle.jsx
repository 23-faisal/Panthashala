import GoogleImage from "@/assets/google.png";
import { Button } from "../ui/button";
import { auth, db } from "@/config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ContinueWithGoogle = () => {
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // save the user data to firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
      });
      navigate("/");
      toast.success(`${user.displayName} logged in successfully`);
    } catch (error) {
      toast.error("Error signing in with Google:", error.message);
    }
  };
  return (
    <div>
      <Button
        onClick={handleGoogleSignIn}
        className="w-full uppercase bg-red-600 hover:bg-red-700 active:bg-red-800 "
      >
        <img className="w-6 h-6 " src={GoogleImage} alt="google image" />
        <span>Continue with Google</span>
      </Button>
    </div>
  );
};

export default ContinueWithGoogle;
