import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStudents } from "../redux/actions/studentActions";
import StudentDetails from "./StudentDetails";

const StudentList = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);
  const user = useSelector((state) => state.auth.user);

  const [sortBy, setSortBy] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const classes = ["All", ...new Set(students.map((s) => s.class))];

  const visible = students
    .filter((s) => filterClass === "All" || s.class === filterClass)
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "rollNumber") return Number(a.rollNumber) - Number(b.rollNumber);
      return 0;
    });

  const stats = [
    { label: "Students", value: students.length },
    { label: "Classes", value: classes.length - 1 },
    { label: "Grade A", value: students.filter((s) => s.grade.startsWith("A")).length },
  ];

  return (
    <div className="container px-3">
      <div className="app-card">
        {/* Header */}
        <div className="app-header">
          <div className="d-flex align-items-center gap-3">
            <img src={`https://i.pravatar.cc/100?u=${user?.email}`} alt="admin" />
            <div>
              <h5>{user?.name}</h5>
              <small>{user?.email}</small>
            </div>
          </div>
          <div className="d-flex gap-4">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <b>{String(s.value).padStart(2, "0")}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="app-toolbar">
          <div>
            <label>Student's Name</label>
            <input className="pill" placeholder="Search..." value={search}
              onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div>
            <label>Sort By</label>
            <select className="pill" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Select from list</option>
              <option value="name">Name</option>
              <option value="rollNumber">Roll Number</option>
            </select>
          </div>
          <div>
            <label>Class</label>
            <select className="pill" value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}>
              {classes.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <Link to="/add" className="btn-add">ADD NOW</Link>
        </div>

        {/* Tabs */}
        <div className="app-tabs">
          {classes.map((c) => (
            <button key={c} className={filterClass === c ? "active" : ""}
              onClick={() => setFilterClass(c)}>
              {c}
            </button>
          ))}
        </div>

        {loading && <div className="text-center py-4"><div className="spinner-border text-primary"></div></div>}
        {error && <div className="alert alert-danger mx-4">{error}</div>}

        {/* Table */}
        <div className="app-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Grade</th>
                <th>Class</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((s) => (
                <StudentDetails key={s.id} student={s} />
              ))}
            </tbody>
          </table>
          {!loading && visible.length === 0 && (
            <p className="text-muted text-center my-4">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentList;