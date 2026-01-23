import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/auth.api";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";
import { validateEmail, validatePassword } from "../../utils/Formutils";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formError, setFormError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();


    const handleEmailBlur = () => {
        setEmailError(() => validateEmail(email));
    };

    const handlePasswordBlur = () => {
        setPasswordError(() => validatePassword(password));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");

        const emailErr = validateEmail(email);
        const passwordErr = validatePassword(password);

        setEmailError(emailErr);
        setPasswordError(passwordErr);
        if (emailErr || passwordErr) return;
        try {
            const data = await loginUser({ email, password });
            login(
                { userId: data.userId, username: data.username },
                data.accessToken
            );
            toast.success(data.message);
            navigate("/dashboard/profile");
        } catch (err) {
            setFormError(err?.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                {formError && (
                    <p className="text-red-500 mb-4">{formError}</p>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className={`border p-2 rounded w-full ${emailError ? "border-red-500" : ""
                                }`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={handleEmailBlur}
                        />
                        {emailError && (
                            <p className="text-red-500 text-sm mt-1">
                                {emailError}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className={`border p-2 rounded w-full ${passwordError ? "border-red-500" : ""
                                }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={handlePasswordBlur}
                        />
                        {passwordError && (
                            <p className="text-red-500 text-sm mt-1">
                                {passwordError}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
