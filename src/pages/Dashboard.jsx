import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStudents } from "../redux/actions/studentActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state.students);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const classCount = new Set(students.map((s) => s.class)).size;
  const topGrades = students.filter((s) => s.grade.startsWith("A")).length;
  const recent = [...students].slice(-5).reverse();

  const cards = [
    { icon: "🎓", label: "Students", value: students.length },
    { icon: "🏫", label: "Classes", value: classCount },
    { icon: "⭐", label: "Grade A / A+", value: topGrades },
  ];

  return (
    <div className="container px-3 pb-5">
      <div className="dash-greet">
        <div>
          <h2>Welcome back, {user?.name} 👋</h2>
          <p>Here's a quick look at your students.</p>
        </div>
        <Link to="/add" className="btn-add" style={{ marginLeft: 0 }}>+ ADD STUDENT</Link>
      </div>

      {loading && (
        <div className="text-center text-white my-3">
          <div className="spinner-border"></div>
        </div>
      )}

      <div className="dash-stats">
        {cards.map((c) => (
          <div className="dash-card stat-card" key={c.label}>
            <div className="stat-icon">{c.icon}</div>
            <div>
              <div className="stat-value">{c.value}</div>
              <div className="stat-label">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dash-card">
        <h6 className="dash-title">Recently Added</h6>
        {recent.length === 0 && <p className="text-muted mb-0">No students yet.</p>}
        {recent.map((s) => (
          <div className="mini-row" key={s.id}>
            <img src={s.image} alt={s.name} />
            <div className="flex-grow-1">
              <div className="mini-name">{s.name}</div>
              <div className="s-sub">Roll No: {s.rollNumber}</div>
            </div>
            <span className="badge-class">{s.class}</span>
            <span className="badge-grade">{s.grade}</span>
          </div>
        ))}
        <Link to="/students" className="view-all">View all students →</Link>
      </div>
    </div>
  );
};

export default Dashboard;