import { useContext, useState } from "react";
import { authContext } from "../Components/Authprovider/Authprovider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert

const Register = () => {
    const { handleRegistration, manageProfile } = useContext(authContext);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const image = e.target.image.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const conPassword = e.target.conPassword.value;

        setError('');

        if (password !== conPassword) {
            setError("Passwords do not match!");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long!");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter!");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("Password must contain at least one lowercase letter!");
            return;
        }

        handleRegistration(email, password)
            .then(() => {
                return manageProfile(name, image);
            })
            .then(() => {
                // Use SweetAlert to show a success popup
                Swal.fire({
                    icon: "success",
                    title: "Registration Successful",
                    text: "You have successfully registered!",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#4CAF50",
                }).then(() => {
                    navigate('/'); // Navigate after user clicks OK
                });
                e.target.reset(); // Clear the form
            })
            .catch((err) => {
                setError(err.message);
                // Use SweetAlert to show an error popup
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: err.message,
                    confirmButtonText: "Try Again",
                    confirmButtonColor: "#F56565",
                });
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-700">Register</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Your full name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Profile Image URL
                        </label>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            placeholder="Link to your profile picture"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Your email address"
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
                            placeholder="Create a password"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="conPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="conPassword"
                            id="conPassword"
                            placeholder="Re-enter your password"
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
                            Register
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
