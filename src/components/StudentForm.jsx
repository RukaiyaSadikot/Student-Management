import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../redux/actions/studentActions";

const GRADES = ["A+", "A", "B+", "B", "C+", "C", "D"];
const CLASSES = ["BCA", "BBA", "BSc", "MCA", "MBA"];

const empty = {
  name: "", rollNumber: "", phone: "", email: "",
  age: "", class: "", grade: "", image: "",
};

const StudentForm = () => {
  const [form, setForm] = useState(empty);
  const [imgOk, setImgOk] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") setImgOk(true);
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await dispatch(addStudent({ ...form, age: Number(form.age) }));
    if (ok) navigate("/students");
  };

  const showImage = form.image && imgOk;

  return (
    <div className="container px-3 pb-5">
      <div className="app-card form-card">
        <div className="form-hero">
          
          <div>
            <h4>Add New Student</h4>
            <p>Fill in the details below to register a student.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-section">Personal Details</div>
          <div className="form-grid">
            <div className="form-field">
              <label>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder="e.g. Rahul Sharma" required />
            </div>
            <div className="form-field">
              <label>Age</label>
              <input name="age" type="number" min="3" max="60" value={form.age}
                onChange={handleChange} placeholder="e.g. 20" required />
            </div>
            <div className="form-field">
              <label>Phone</label>
              <input name="phone" type="tel" pattern="[0-9]{10}" title="Enter a 10-digit number"
                value={form.phone} onChange={handleChange} placeholder="10-digit number" required />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input name="email" type="email" value={form.email}
                onChange={handleChange} placeholder="name@example.com" required />
            </div>
          </div>

          <div className="form-section">Academic Details</div>
          <div className="form-grid">
            <div className="form-field">
              <label>Roll Number</label>
              <input name="rollNumber" value={form.rollNumber}
                onChange={handleChange} placeholder="e.g. 104" required />
            </div>
            <div className="form-field">
              <label>Class</label>
              <input name="class" list="class-list" value={form.class}
                onChange={handleChange} placeholder="Select or type" required />
              <datalist id="class-list">
                {CLASSES.map((c) => <option key={c} value={c} />)}
              </datalist>
            </div>
            <div className="form-field">
              <label>Grade</label>
              <select name="grade" value={form.grade} onChange={handleChange} required>
                <option value="">Select grade</option>
                {GRADES.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label>Photo URL</label>
              <input name="image" type="url" value={form.image}
                onChange={handleChange} placeholder="https://..." required />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate("/students")}>
              Cancel
            </button>
            <button type="submit" className="btn-add" style={{ marginLeft: 0 }}>
              ADD STUDENT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;