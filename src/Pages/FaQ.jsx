import React from 'react';

const FaQ = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Frequently Asked Questions
            </h1>

            {/* FAQ Accordion */}
            <div className="space-y-4">
                {/* Question 1 */}
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="faq-accordion" defaultChecked />
                    <div className="collapse-title text-xl font-medium">
                        What is the purpose of this platform?
                    </div>
                    <div className="collapse-content">
                        <p>
                            Our platform is designed to help students and learners find honest and reliable reviews for courses across various institutions and online learning platforms.
                        </p>
                    </div>
                </div>

                {/* Question 2 */}
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-xl font-medium">
                        How do I leave a review?
                    </div>
                    <div className="collapse-content">
                        <p>
                            You can leave a review by navigating to the course page and clicking on the "Leave a Review" button. Fill out the form with your feedback, and it will be published after moderation.
                        </p>
                    </div>
                </div>

                {/* Question 3 */}
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-xl font-medium">
                        Are the reviews verified?
                    </div>
                    <div className="collapse-content">
                        <p>
                            Yes, we ensure that all reviews are moderated to maintain authenticity and reliability. Each review is screened to prevent spam or irrelevant content.
                        </p>
                    </div>
                </div>

                {/* Question 4 */}
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-xl font-medium">
                        Is this platform free to use?
                    </div>
                    <div className="collapse-content">
                        <p>
                            Absolutely! Our platform is completely free to use for browsing, leaving reviews, and exploring courses.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaQ;
