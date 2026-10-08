import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStudent, deleteStudent } from "../redux/actions/studentActions";

const fields = ["name", "rollNumber", "phone", "email", "age", "class", "grade", "image"];

const StudentDetails = ({ student }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState(student);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleUpdate = () => {
        dispatch(updateStudent(student.id, { ...form, age: Number(form.age) }));
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm(`Delete ${student.name}?`)) {
            dispatch(deleteStudent(student.id));
        }
    };

    return (
        <>
            <tr className="data-row">
                <td>
                    <div className="d-flex align-items-center">
                        <img className="s-avatar" src={student.image} alt={student.name} />
                        <div>
                            <span className="s-name">{student.name}</span>
                            <span className="s-sub">Roll No: {student.rollNumber} · Age {student.age}</span>
                        </div>
                    </div>
                </td>
                <td>
                    {student.email}
                    <br />
                    <span className="s-sub">{student.phone}</span>
                </td>
                <td><span className="badge-grade">{student.grade}</span></td>
                <td><span className="badge-class">{student.class}</span></td>
                <td className="text-end">
                    <button className="link-edit" onClick={() => setIsEditing(!isEditing)}>Edit</button>
                    <button className="link-del" onClick={handleDelete}>Delete</button>
                </td>
            </tr>

            {isEditing && (
                <tr className="edit-row">
                    <td colSpan={5}>
                        <div className="edit-grid">
                            {fields.map((f) => (
                                <input key={f} className="pill" name={f} value={form[f]}
                                    onChange={handleChange} placeholder={f} />
                            ))}
                        </div>
                        <button className="btn btn-sm btn-success me-2" onClick={handleUpdate}>Save</button>
                        <button className="btn btn-sm btn-secondary"
                            onClick={() => { setForm(student); setIsEditing(false); }}>
                            Cancel
                        </button>
                    </td>
                </tr>
            )}
        </>
    );
};

export default StudentDetails;