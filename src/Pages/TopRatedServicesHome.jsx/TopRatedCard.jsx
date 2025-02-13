import React from "react";
import { Link } from "react-router-dom";

const TopRatedCard = ({ services }) => {
    const { courseImage, courseTitle, description, price, _id } = services;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img src={courseImage} alt={courseTitle} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-lg font-bold">{courseTitle}</h2>
                <p className="text-gray-600">{description.slice(0, 100)}...</p>
                <div className="card-actions justify-between items-center">
                    <span className="text-primary font-bold">${price}</span>

                    <Link to={`/service/${_id}`}><button className="btn btn-primary btn-sm">See Details</button></Link>

                </div>
            </div>
        </div>
    );
};

export default TopRatedCard;
