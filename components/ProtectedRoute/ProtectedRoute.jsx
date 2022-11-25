import { useSelector } from "react-redux";
import AccessDenied from "../../views/AccessDenied/AccessDenied";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.userReducer.value);
  return <>{!user ? children : <AccessDenied />}</>;
};

export default ProtectedRoute;
