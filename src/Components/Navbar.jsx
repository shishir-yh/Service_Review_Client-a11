import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../Components/Authprovider/Authprovider";
import DarkModeToggle from "../Components/DarkMode/DarkModeToggle";


const Navbar = () => {
    const { user, handleSignOut } = useContext(authContext);

    // Function to render navigation links
    const renderLinks = () => (
        <>
            <NavLink
                className={({ isActive }) =>
                    `font-bold ${isActive ? "text-purple-600 underline" : ""}`
                }
                to="/"
            >
                Home
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    `font-bold ${isActive ? "text-purple-600 underline" : ""}`
                }
                to="/services"
            >
                Courses
            </NavLink>
            {user && (
                <>
                    <NavLink
                        className={({ isActive }) =>
                            `font-bold ${isActive ? "text-purple-600 underline" : ""}`
                        }
                        to="/addservice"
                    >
                        Add Course
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `font-bold ${isActive ? "text-purple-600 underline" : ""}`
                        }
                        to="/myreview"
                    >
                        My Review
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `font-bold ${isActive ? "text-purple-600 underline" : ""}`
                        }
                        to="/myservices"
                    >
                        My Course
                    </NavLink>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-blue-400  w-full px-4 sticky top-0 z-50">
            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box absolute left-0 top-full mt-1 w-52 p-2 shadow z-10"
                    >
                        {renderLinks()}
                        {/* Add Login and Register buttons in dropdown */}
                        {!user && (
                            <>
                                {/* <NavLink
                        className={({ isActive }) =>
                            `font-bold ${isActive ? "text-purple-600 underline" : ""}`
                        }
                        to="/addservice"
                    >
                        Add Course
                    </NavLink> */}
                                {/* `font-bold ${isActive ? "text-purple-600 underline" : ""}` */}
                                <NavLink
                                    className={({ isActive }) =>
                                        `font-bold ${isActive ? "text-purple-600 underline" : ""}`
                                    }
                                    to="/login"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        `font-bold ${isActive ? "text-purple-600 underline" : ""}`
                                    }
                                    to="/register"
                                >
                                    Register
                                </NavLink>
                            </>
                        )}

                        {user && (
                            <>

                                <NavLink
                                    onClick={handleSignOut}
                                    className={({ isActive }) =>
                                        `font-bold ${isActive ? "text-purple-600 underline " : ""}`
                                    }
                                    to="/login"
                                >
                                    LogOut
                                </NavLink>

                            </>
                        )}
                    </ul>
                    {/* if user is attend  */}


                </div>
                <NavLink to="/" className="btn btn-ghost text-xl">
                    Online Course Review
                </NavLink>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex px-4">
                <ul className="menu menu-horizontal px-1 gap-4">{renderLinks()}</ul>
            </div>

            {/* Navbar End
            <div className="navbar-end hidden lg:flex px-4">
                {user ? (
                    <div className="flex items-center" title={user.displayName || "User"}>
                        <img
                            className="rounded-full lg:w-[50px] md:w-[50px] w-[50px] h-[50px]"
                            src={user.photoURL || "https://via.placeholder.com/50"}
                            alt="User Avatar"
                        />
                        <NavLink
                            onClick={handleSignOut}
                            className={({ isActive }) =>
                                `btn bg-blue-400 ml-3 font-bold ${isActive ? "text-white" : ""}`
                            }
                            to="/login"
                        >
                            LogOut
                        </NavLink>
                    </div>
                ) : (
                    <div>
                        <NavLink
                            className={({ isActive }) =>
                                `btn bg-blue-400 ml-3 font-bold ${isActive ? "text-white" : ""}`
                            }
                            to="/login"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                `btn bg-blue-400 ml-3 font-bold ${isActive ? "text-white" : ""}`
                            }
                            to="/register"
                        >
                            Register
                        </NavLink>
                    </div>
                )}
            </div> */}
            <div className="navbar-end hidden lg:flex px-4">
                <DarkModeToggle /> {/* 🌓 Dark Mode Button */}

                {user ? (
                    <div className="flex items-center ml-4" title={user.displayName || "User"}>
                        <img
                            className="rounded-full lg:w-[50px] md:w-[50px] w-[50px] h-[50px]"
                            src={user.photoURL || "https://via.placeholder.com/50"}
                            alt="User Avatar"
                        />
                        <NavLink
                            onClick={handleSignOut}
                            className={({ isActive }) =>
                                `btn bg-blue-400 ml-3 font-bold ${isActive ? "text-white" : ""}`
                            }
                            to="/login"
                        >
                            LogOut
                        </NavLink>
                    </div>
                ) : (
                    <div>
                        <NavLink
                            className={({ isActive }) =>
                                `btn bg-blue-400 ml-3 font-bold ${isActive ? "text-white" : ""}`
                            }
                            to="/login"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                `btn bg-blue-400 ml-3 font-bold ${isActive ? "text-white" : ""}`
                            }
                            to="/register"
                        >
                            Register
                        </NavLink>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Navbar;



