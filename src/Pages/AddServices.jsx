import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Swal from "sweetalert2";

const AddServices = () => {
    const [course, setCourse] = useState({
        courseImage: "",
        courseTitle: "",
        instructorName: "",
        website: "",
        description: "",
        category: "",
        price: "",
    });

    const [userEmail, setUserEmail] = useState(""); // Stores the authenticated user's email
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    // Fetch the authenticated user's email
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserEmail(user?.email || ""); // If no user, email is set to empty
        });
        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add email and current date to course data
        const courseData = { ...course, userEmail, addedDate: new Date() };

        try {
            const response = await fetch("https://service-review-server-swart.vercel.app/services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(courseData),
            });

            const data = await response.json();
            if (data.success) {
                // Show SweetAlert2 toast for success
                Swal.fire({
                    toast: true,
                    icon: "success",
                    title: "Course added successfully!",
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });

                // Navigate to '/services'
                navigate("/services");
            } else {
                // Show error toast
                Swal.fire({
                    toast: true,
                    icon: "error",
                    title: "Failed to add course. Please try again.",
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            console.error("Error adding course:", error);

            // Show error toast for unexpected errors
            Swal.fire({
                toast: true,
                icon: "error",
                title: "An error occurred. Please try again.",
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-6 shadow-lg rounded bg-white">
            <h2 className="text-2xl font-bold text-center mb-6">Add a New Course</h2>

            <form onSubmit={handleSubmit}>
                {/* Input Fields */}
                {[
                    { id: "courseImage", label: "Course Image URL", type: "text" },
                    { id: "courseTitle", label: "Course Title", type: "text" },
                    { id: "instructorName", label: "Instructor Name", type: "text" },
                    { id: "website", label: "Website", type: "text" },
                    { id: "category", label: "Category", type: "text" },
                    { id: "price", label: "Price", type: "number" },
                ].map((field) => (
                    <div className="mb-4" key={field.id}>
                        <label htmlFor={field.id} className="block font-medium mb-2">
                            {field.label}
                        </label>
                        <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            value={course[field.id]}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>
                ))}

                {/* Description Field */}
                <div className="mb-4">
                    <label htmlFor="description" className="block font-medium mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Add Course
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddServices;
