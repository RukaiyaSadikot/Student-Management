import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { logout } from "../redux/actions/authActions";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="container px-3 pb-5">
      <div className="dash-card profile-simple">
        <img src={`https://i.pravatar.cc/200?u=${user?.email}`} alt={user?.name} />
        <h4>{user?.name}</h4>
        <p>{user?.email}</p>
        <span className="badge-class">Administrator</span>

        <div className="profile-buttons">
          <Link to="/dashboard" className="btn-cancel text-decoration-none">Back</Link>
          <button className="btn-add" style={{ marginLeft: 0 }} onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />SIGN OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;