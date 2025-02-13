

import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

const ServiceDetails = () => {
    const {
        _id,
        courseImage,
        courseTitle,
        instructorName,
        website,
        description,
        category,
        price,
    } = useLoaderData(); // Destructuring service object directly

    const [reviews, setReviews] = useState([]); // State to store reviews
    const [reviewCount, setReviewCount] = useState(0); // State to store total review count

    // Fetch reviews for the service
    useEffect(() => {
        fetch(`https://service-review-server-swart.vercel.app/service-reviews?serviceId=${_id}`)
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
                setReviewCount(data.length); // Set the total number of reviews
            })
            .catch((err) => console.error("Error fetching reviews:", err));
    }, [_id]);

    return (
        <div className=" flex flex-col w-6/12 mx-auto justify-center my-10 gap-10">
            {/* Service Details */}
            <div className="card w-full bg-base-100 shadow-xl">
                <figure>
                    <img
                        src={courseImage}
                        alt={courseTitle}
                        className="rounded-t-lg"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{courseTitle}</h2>
                    <p><strong>Instructor:</strong> {instructorName}</p>
                    <p>
                        <strong>Website:</strong>{" "}
                        <a
                            href={`https://${website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {website}
                        </a>
                    </p>
                    <p><strong>Category:</strong> {category}</p>
                    <p><strong>Description:</strong> {description}</p>
                    <p className="font-bold text-lg">Price: ${price}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/givereview/${_id}`}>
                            <button className="btn btn-primary">Give Review</button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">
                    Reviews ({reviewCount})
                </h2>
                {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                ) : (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="card bg-base-100 shadow p-4 flex items-start gap-4"
                            >
                                {/* User Photo */}
                                <img
                                    src={review.userPhoto || "https://via.placeholder.com/50"}
                                    alt={review.userName || "Anonymous"}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    {/* User Name and Review Date */}
                                    <h4 className="font-bold text-lg">
                                        {review.userName || "Anonymous"}
                                    </h4>
                                    <p className="text-gray-500 text-sm">
                                        {new Date(review.date).toLocaleString()}
                                    </p>
                                    {/* Review Text */}
                                    <p className="text-gray-700 mt-2">{review.text}</p>
                                    {/* Review Rating */}
                                    <p className="text-yellow-500 mt-1">
                                        Rating: {review.rating} ⭐
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceDetails;
