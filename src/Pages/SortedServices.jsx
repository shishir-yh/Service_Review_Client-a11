
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SortedServices = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("https://service-review-server-swart.vercel.app/sorted-card");
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchServices();
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="max-w-6xl mx-auto px-4 my-10 bg-base-100">
            <h1 className="text-3xl font-bold text-center mb-6 dark:text-gray">
                Feature of Courses
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <motion.div
                        key={service._id}
                        className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-md rounded-lg overflow-hidden h-[500px]"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={service.courseImage}
                            alt={service.courseTitle}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-4">
                            <h2 className="text-xl font-bold dark:text-white">{service.courseTitle}</h2>
                            <p className="text-gray-600 dark:text-gray-300 my-2">{service.description}</p>
                            <p className="text-gray-700 dark:text-gray-400 font-medium">
                                Instructor: {service.instructorName}
                            </p>
                            <p className="text-blue-500 dark:text-blue-400 font-semibold">${service.price}</p>

                            <button
                                onClick={() => navigate(`/service/${service._id}`)}
                                className="mt-4 bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition"
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
