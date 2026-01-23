import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/auth.api";
import { toast } from "sonner";
import { validateUsername, validateEmail, validatePassword } from "../../utils/Formutils";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formError, setFormError] = useState("");

    const navigate = useNavigate();

    const handleUsernameBlur = () => {
        setUsernameError(() => validateUsername(username));
    };

    const handleEmailBlur = () => {
        setEmailError(() => validateEmail(email));
    };

    const handlePasswordBlur = () => {
        setPasswordError(() => validatePassword(password));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");

        const usernameErr = validateUsername(username);
        const emailErr = validateEmail(email);
        const passwordErr = validatePassword(password);

        setUsernameError((prev) => ({ ...prev, username: usernameErr }));
        setEmailError((prev) => ({ ...prev, email: emailErr }));
        setPasswordError((prev) => ({ ...prev, password: passwordErr }));

        if (usernameErr || emailErr || passwordErr) return;

        try {
            await registerUser({ username, email, password });
            toast.success("Registration successful");
            navigate("/login");
        } catch (err) {
            setFormError(err?.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                {formError && (
                    <p className="text-red-500 mb-4">{formError}</p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            className={`border p-2 rounded w-full ${usernameError ? "border-red-500" : ""
                                }`}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onBlur={handleUsernameBlur}
                        />
                        {usernameError && (
                            <p className="text-red-500 text-sm mt-1">
                                {usernameError}
                            </p>
                        )}
                    </div>
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
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
