import About from "./about";
import BannerHome from "./BannerHome/BannerHome";
import FaQ from "./FaQ";
import Partner from "./Partner";
import SortedServices from "./SortedServices";
import TopRatedServicesHome from "./TopRatedServicesHome.jsx/TopRatedServicesHome";


const Home = () => {
    return (
        <div>
            <BannerHome></BannerHome>
            <SortedServices></SortedServices>
            <About></About>
            <FaQ></FaQ>
            <Partner></Partner>


        </div>
    );
};

export default Home;