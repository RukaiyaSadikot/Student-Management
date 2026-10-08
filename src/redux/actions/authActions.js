import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/users?email=${email}&password=${password}`
    );
    if (res.data.length > 0) {
      const { password: _pw, ...user } = res.data[0];
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      return true;
    }
    dispatch({ type: "LOGIN_FAILURE", payload: "Invalid email or password" });
    return false;
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  return { type: "LOGOUT" };
};