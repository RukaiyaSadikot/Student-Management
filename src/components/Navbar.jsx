import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { FaUserLarge } from "react-icons/fa6";

const Navbar = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
            <div className="container">
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="nav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/students">Students</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/add">Add Student</Link></li>
                    </ul>
                    <ul className="navbar-nav align-items-lg-center">
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">
                                        <FaUserLarge className="me-1" /> {user.name}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-light btn-sm" onClick={handleLogout}>Sign Out</button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item"><Link className="nav-link" to="/login">Sign In</Link></li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;