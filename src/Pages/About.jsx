import React from "react";

const About = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-6 md:p-12 lg:p-20">
            {/* Section Heading */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6 md:text-4xl text-center leading-tight">
                <span className="block sm:inline">About our</span>
                <br className="hidden sm:block" />
                <span className="block sm:inline">course Review Platform</span>
            </h1>


            {/* Description */}
            <p className="text-lg text-gray-600 text-center max-w-4xl mb-8">
                Welcome to our Course Review platform! Our goal is to provide students
                with a comprehensive space to share and explore honest reviews about
                courses from various institutions and online platforms. Whether you're
                looking for a college course, a technical certification, or a creative
                online class, our platform helps you make informed decisions.
            </p>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Honest Reviews
                    </h2>
                    <p className="text-gray-500">
                        Get unbiased opinions from students who have already taken the
                        course you're considering.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Ratings & Feedback
                    </h2>
                    <p className="text-gray-500">
                        Access detailed ratings for course content, instructors, and value
                        for money.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Community Driven
                    </h2>
                    <p className="text-gray-500">
                        Join a growing community of learners helping each other achieve
                        their goals.
                    </p>
                </div>
            </div>

            {/* Closing Statement */}
            <div className="mt-12">
                <p className="text-gray-600 text-center max-w-3xl">
                    We believe that knowledge is power. By sharing experiences, we can
                    create a transparent and supportive learning environment for everyone.
                </p>
                <p className="text-gray-600 text-center mt-4 font-semibold">
                    Start exploring today and find the perfect course for you!
                </p>
            </div>
        </div>
    );
};

export default About;
