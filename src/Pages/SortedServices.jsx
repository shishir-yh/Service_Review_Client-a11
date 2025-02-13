import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { motion } from "framer-motion"; // For animations

const SortedServices = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    // Fetch services from the server
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("https://service-review-server-swart.vercel.app/sorted-card"); // Updated endpoint
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchServices();
    }, []);

    // Framer Motion animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="max-w-6xl mx-auto px-4 my-10">
            <h1 className="text-3xl font-bold text-center mb-6">Feature of Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <motion.div
                        key={service._id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5 }}
                    >
                        {/* Service Image */}
                        <img
                            src={service.courseImage}
                            alt={service.courseTitle}
                            className="w-full h-48 object-cover"
                        />

                        {/* Service Details */}
                        <div className="p-4">
                            <h2 className="text-xl font-bold">{service.courseTitle}</h2>
                            <p className="text-gray-600 my-2">{service.description}</p>
                            <p className="text-gray-700 font-medium">
                                Instructor: {service.instructorName}
                            </p>
                            <p className="text-blue-500 font-semibold">${service.price}</p>

                            {/* See Details Button */}
                            <button
                                onClick={() => navigate(`/service/${service._id}`)} // Updated link
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                See Details
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SortedServices;
