import "./App.css";
import Navbar from "./components/navbar"; // navbar
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import MenuRestaurant from "./pages/menuRestaurant";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import CartOrder from "./pages/cart-order";
import EditProfil from "./pages/editProfile";
import AddProduct from "./pages/addProduct";
import EditProfilePartner from "./pages/editProfilePartner";
import ProfilePartner from "./pages/profilePartner";
import React from "react";
import IncomeTransaction from "./pages/incomeTransaction";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const [state] = useContext(UserContext);
  return state.isLogin ? <Outlet /> : <Navigate to="/" />;
};

const PartnerRoute = () => {
  const [state] = useContext(UserContext);
  return state.user.role === "customer" ? <Navigate to="/" /> : <Outlet />;
};

const CustomerRoute = () => {
  const [state] = useContext(UserContext);
  return state.user.role === "partner" ? <Navigate to="/income" /> : <Outlet />;
};

function App() {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Redirect Auth here ...
  useEffect(() => {
    // Redirect Auth
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false && !isLoading) {
      navigate("/");
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log(response);
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      console.log(payload);
      // Get token from local storage
      payload.token = localStorage.token;
      console.log(payload);
      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      console.log(state);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="App-back">
      <div className="App-back">
        {isLoading ? (
          <></>
        ) : (   
          <>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<PartnerRoute />}>
                  <Route path="/profile-partner" element={<ProfilePartner />} />
                  <Route path="/edit-profile-partner" element={<EditProfilePartner />}/>
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/income" element={<IncomeTransaction />} />
                </Route>
                <Route exact path="/" element={<CustomerRoute />}>
                  <Route path="/resto/:id" element={<MenuRestaurant />} />
                  <Route path="/cart-order" element={<CartOrder />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/edit-profile" element={<EditProfil />} />
                </Route>
              </Route>
            </Routes>
          </>
        )}
      </div>
    </div>
  );
}
export default App;
