import { useEffect, useState } from "react";
import TopRatedCard from "./TopRatedCard";

const TopRatedServicesHome = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true); // loading state

    useEffect(() => {
        fetch('https://service-review-server-swart.vercel.app/services')
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setLoading(false); // loading done
            })
            .catch(error => {
                console.error("Error fetching services:", error);
                setLoading(false); // even if error, stop loading
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {
                services.map((service) => (
                    <TopRatedCard key={service._id} services={service} />
                ))
            }
        </div>
    );
};

export default TopRatedServicesHome;


// import { useEffect, useState } from "react";
// import TopRatedCard from "./TopRatedCard";


// const TopRatedServicesHome = () => {
//     const [services, setServices] = useState([])

//     useEffect(() => {
//         fetch('https://service-review-server-swart.vercel.app/services')
//             .then(res => res.json())
//             .then(data => setServices(data))

//     }, [])

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//             {
//                 services.map((services) => <TopRatedCard key={services._id} services={services}></TopRatedCard>)

//             }

//         </div>
//     );
// };

// export default TopRatedServicesHome;