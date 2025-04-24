import React, { useContext, useState } from 'react';
import { authContext } from '../Components/Authprovider/Authprovider';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert

const Login = () => {
    const { handleGoogleLogin, handleLogin } = useContext(authContext);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        handleLogin(email, password)
            .then(() => {
                // Show success alert
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: "Welcome back!",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#4CAF50",
                }).then(() => {
                    navigate(location.state?.from || '/'); // Navigate after clicking "OK"
                });
            })
            .catch((err) => {
                setError(err.message);
                // Show error alert
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: err.message,
                    confirmButtonText: "Try Again",
                    confirmButtonColor: "#F56565",
                });
            });
    };

    const googleLoginHandler = () => {
        handleGoogleLogin()
            .then(() => {
                // Show success alert
                Swal.fire({
                    icon: "success",
                    title: "Google Login Successful",
                    text: "Welcome back!",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#4CAF50",
                }).then(() => {
                    navigate(location.state?.from || '/'); // Navigate after clicking "OK"
                });
            })
            .catch((err) => {
                setError(err.message);
                // Show error alert
                Swal.fire({
                    icon: "error",
                    title: "Google Login Failed",
                    text: err.message,
                    confirmButtonText: "Try Again",
                    confirmButtonColor: "#F56565",
                });
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <div className="divider">OR</div>

                <button
                    onClick={googleLoginHandler}
                    className="btn  btn-primary w-full flex items-center justify-center hover:bg-blue-600"
                >
                    <img
                        src="https://img.icons8.com/color/24/google-logo.png"
                        alt="Google logo"
                        className="mr-2"
                    />
                    Continue with Google
                </button>

                <p className="text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <NavLink to="/register" className="text-blue-500 hover:underline">
                        Register
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
