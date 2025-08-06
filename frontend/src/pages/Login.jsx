import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.email === "thxnujay@gmail.com") {
        navigate("/admin/dashboard"); // Updated redirect
      } else {
        alert("Unauthorized access");
        await auth.signOut();
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="text-center mt-32 text-white">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <button
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
        onClick={handleLogin}
      >
        Login with Google
      </button>
    </div>
  );
}

export default Login;