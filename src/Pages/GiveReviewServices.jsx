
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import { Rating } from "react-simple-star-rating";
import { useParams } from "react-router-dom";

const GiveReviewServices = () => {
    const [rating, setRating] = useState(0); // Rating state
    const [userEmail, setUserEmail] = useState(""); // User email from auth
    const [userName, setUserName] = useState(""); // User name from auth
    const [userPhoto, setUserPhoto] = useState(""); // User photo from auth
    const [reviewText, setReviewText] = useState(""); // Review text state
    const [submittedReview, setSubmittedReview] = useState(null); // Store the submitted review for displaying
    const { id } = useParams(); // Extract the service ID from URL parameters 
    // Get the authenticated user's email, name, and photo

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
                setUserName(user.displayName || "Anonymous"); // Use displayName or fallback
                setUserPhoto(user.photoURL || "https://via.placeholder.com/50"); // Fallback photo
            } else {
                setUserEmail("");
                setUserName("");
                setUserPhoto("");
            }
        });

        return () => unsubscribe();
    }, []);



    // Handle dynamic rating selection
    const handleRating = (rate) => {
        setRating(rate); // Set the rating
    };

    // Handle review form submission
    const handleReviewSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Input validation
        if (!reviewText || rating === 0) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please provide a review and a rating!",
            });
            return;
        }

        // Review object
        const review = {
            email: userEmail,
            userName: userName,
            userPhoto: userPhoto,
            text: reviewText,
            rating: rating,
            date: new Date().toLocaleString(), // Add time to the date
            serviceId: id, // Service ID
        };

        // Sending review data using fetch
        fetch("https://service-review-server-swart.vercel.app/service-review", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(review),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse JSON response if successful
                } else {
                    throw new Error("Failed to submit review");
                }
            })
            .then((data) => {
                // Handle success response
                setSubmittedReview(review); // Set the submitted review for display

                Swal.fire({
                    icon: "success",
                    title: "Review Submitted",
                    text: "Thank you for your feedback!",
                });

                // Reset the form
                setReviewText("");
                setRating(0);
            })
            .catch((error) => {
                // Handle error response
                Swal.fire({
                    icon: "error",
                    title: "Submission Failed",
                    text: "There was an error submitting your review. Please try again.",
                });
            });
    };

    return (
        <div>
            <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Add Your Review</h2>
                <form onSubmit={handleReviewSubmit}>
                    {/* Textarea for the review text */}
                    <textarea
                        className="textarea textarea-bordered w-full h-24 mb-4"
                        placeholder="Write your review..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>

                    {/* Rating input */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Your Rating:</h3>
                        <Rating
                            onClick={handleRating}
                            ratingValue={rating} // Current rating
                            size={30}
                            label
                            transition
                            fillColor="orange"
                            emptyColor="gray"
                        />
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary w-full">
                        Submit Review
                    </button>
                </form>

                {/* Display the submitted review after successful submission */}
                {submittedReview && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold">Your Submitted Review</h3>
                        <div className="flex items-center mt-4">
                            <img
                                src={submittedReview.userPhoto}
                                alt={submittedReview.userName}
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-4">
                                <p className="text-sm font-bold">{submittedReview.userName}</p>
                                <p className="text-sm text-gray-500">{submittedReview.date}</p>
                            </div>
                        </div>
                        <p className="mt-2 text-lg">{submittedReview.text}</p>
                        <div className="mt-2 text-yellow-500">
                            {/* Display the rating as stars */}
                            <Rating
                                ratingValue={submittedReview.rating}
                                size={20}
                                readonly
                                fillColor="orange"
                                emptyColor="gray"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GiveReviewServices;
