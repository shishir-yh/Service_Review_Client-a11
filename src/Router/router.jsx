import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../MainLayout/Mainlayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddServices from "../Pages/AddServices";
import MyReview from "../Pages/MyReview";
import Services from "../Pages/Services";
import Error from "../Pages/Error";
import MyServices from "../Pages/MyServices";
import ServiceDetails from "../Pages/ServiceDetails";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import GiveReviewServices from "../Pages/GiveReviewServices";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout></Mainlayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/addservice',
                element: <AddServices></AddServices>
            },
            {
                // here i will show all of endividual user review
                path: '/myreview',
                element: <PrivateRoute><MyReview></MyReview></PrivateRoute>
            },
            {
                path: '/givereview/:id',
                element: <PrivateRoute><GiveReviewServices></GiveReviewServices></PrivateRoute>
            },
            {
                path: '/services',
                element: <Services></Services>
            },
            {

                path: '/service/:id',
                element: <ServiceDetails></ServiceDetails>,
                loader: ({ params }) => fetch(`https://service-review-server-swart.vercel.app/services/${params.id}`)
            },
            {
                path: '/myservices',
                element: <MyServices></MyServices>

            }

        ]
    },
    {
        path: '*',
        element: <Error></Error>
    }
]);

export default router