import axios from "axios";

export const fetchStudents = () => {
  return async (dispatch) => {
    dispatch({
      type: "FETCH_STUDENTS_REQUEST"
    });

    try {
      const response = await axios.get(
        "http://localhost:5000/students"
      );

      dispatch({
        type: "FETCH_STUDENTS_SUCCESS",
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: "FETCH_STUDENTS_FAILURE",
        payload: error.message
      });
    }
  };
};
export const addStudent = (student) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:5000/students", student);
    dispatch({ type: "ADD_STUDENT_SUCCESS", payload: res.data });
    return true;
  } catch (error) {
    dispatch({ type: "FETCH_STUDENTS_FAILURE", payload: error.message });
    return false;
  }
};

export const updateStudent = (id, student) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:5000/students/${id}`, student);
    dispatch({ type: "UPDATE_STUDENT_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "FETCH_STUDENTS_FAILURE", payload: error.message });
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/students/${id}`);
    dispatch({ type: "DELETE_STUDENT_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "FETCH_STUDENTS_FAILURE", payload: error.message });
  }
};