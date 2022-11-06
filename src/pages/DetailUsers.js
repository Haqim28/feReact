import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isSignin = false;

  return isSignin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;