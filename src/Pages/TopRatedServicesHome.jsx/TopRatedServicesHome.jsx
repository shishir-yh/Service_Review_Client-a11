import { useEffect, useState } from "react";
import TopRatedCard from "./TopRatedCard";


const TopRatedServicesHome = () => {
    const [services, setServices] = useState([])

    useEffect(() => {
        fetch('https://service-review-server-swart.vercel.app/services')
            .then(res => res.json())
            .then(data => setServices(data))

    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {
                services.map((services) => <TopRatedCard key={services._id} services={services}></TopRatedCard>)

            }

        </div>
    );
};

export default TopRatedServicesHome;