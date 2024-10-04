import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode(token);
    const { userId, email, firstName, lastName } = decoded.UserInfo;

    return { userId, email, firstName, lastName };
  }
  // return empty strings if there are no token
  return { userId: "", email: "", firstName: "", lastName: "" };
};

export default useAuth;
