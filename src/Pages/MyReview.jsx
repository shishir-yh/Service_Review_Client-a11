



import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";

const MyReviews = () => {
    const [userEmail, setUserEmail] = useState(""); // User email
    const [reviews, setReviews] = useState([]); // User's reviews
    const [selectedReview, setSelectedReview] = useState(null); // Selected review for updating
    const [updatedReview, setUpdatedReview] = useState({}); // Updated review data

    // Fetch the authenticated user's email
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserEmail(user?.email || "");
        });
        return () => unsubscribe();
    }, []);

    // Fetch reviews for the logged-in user
    useEffect(() => {
        if (userEmail) {
            fetch(`https://service-review-server-swart.vercel.app/service-review?email=${userEmail}`)
                .then((res) => res.json())
                .then((data) => setReviews(data))
                .catch((err) => console.error("Error fetching reviews:", err));
        }
    }, [userEmail]);

    // Handle review deletion
    const handleDelete = (reviewId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://service-review-server-swart.vercel.app/delete-review/${reviewId}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.success) {
                            Swal.fire("Deleted!", "Your review has been deleted.", "success");
                            setReviews(reviews.filter((review) => review._id !== reviewId));
                        } else {
                            Swal.fire("Error!", "Failed to delete the review.", "error");
                        }
                    });
            }
        });
    };

    // Handle review update
    const handleUpdate = () => {
        fetch(`https://service-review-server-swart.vercel.app/update-review/${selectedReview._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedReview),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    Swal.fire("Updated!", "Your review has been updated.", "success");
                    setReviews(
                        reviews.map((review) =>
                            review._id === selectedReview._id
                                ? { ...review, ...updatedReview }
                                : review
                        )
                    );
                    setSelectedReview(null); // Close modal
                } else {
                    Swal.fire("Error!", "Failed to update the review.", "error");
                }
            });
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">My Reviews</h1>
            {reviews.length === 0 ? (
                <p className="text-gray-500">You have no reviews yet.</p>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review._id} className="card bg-base-100 shadow-xl p-4">
                            <h4 className="font-bold">{review.coursetitle}</h4>
                            <p className="text-gray-700">{review.text}</p>
                            <p className="text-yellow-500 font-semibold">
                                Rating: {review.rating} ⭐
                            </p>
                            <div className="flex gap-4 mt-2">
                                <button
                                    onClick={() => {
                                        setSelectedReview(review);
                                        setUpdatedReview({
                                            text: review.text,
                                            rating: review.rating,
                                        });
                                    }}
                                    className="btn btn-primary btn-sm"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="btn btn-error btn-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Update Modal */}
            {selectedReview && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Update Your Review</h3>
                        <div className="mt-4">
                            <label className="block font-semibold">Service Title</label>
                            <input
                                type="text"
                                value={selectedReview.coursetitle}
                                readOnly
                                className="input input-bordered w-full mt-1"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block font-semibold">Review Text</label>
                            <textarea
                                value={updatedReview.text}
                                onChange={(e) =>
                                    setUpdatedReview({
                                        ...updatedReview,
                                        text: e.target.value,
                                    })
                                }
                                className="textarea textarea-bordered w-full mt-1"
                            ></textarea>
                        </div>
                        <div className="mt-4">
                            <label className="block font-semibold">Rating</label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={updatedReview.rating}
                                onChange={(e) =>
                                    setUpdatedReview({
                                        ...updatedReview,
                                        rating: e.target.value,
                                    })
                                }
                                className="input input-bordered w-full mt-1"
                            />
                        </div>
                        <div className="modal-action">
                            <button onClick={handleUpdate} className="btn btn-primary">
                                Save
                            </button>
                            <button
                                onClick={() => setSelectedReview(null)}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReviews;
