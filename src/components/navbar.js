import Vespa from "./assets/vespa.png";
import React, { useState, useContext, useEffect } from "react";
import "./assets/css/navbar.css";
import AddProduct from "./assets/addpartner.png";
import partner from "./assets/partner.png";
import Register from "./auth/Register";
import keranjang from "./assets/keranjang.png";
import Profil from "./assets/profil.png";
import Profile from "./assets/profile.png";
import Logout from "./assets/logout 1.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Login from "./assets/Login.png";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { Alert } from "react-bootstrap";
import { useQuery } from "react-query";


function Navbar() {
  const [state] = useContext(UserContext);

  useEffect(() => {
    console.log("this state", state);
  }, [state]);

  return (
    <>
      <div>
        {state.user.role === "partner" ? (
          <PartnerPage />
        ) : state.user.role === "customer" ? (
          <PrivatePage />
        ) : (
          <GuestPage />
        )}
      </div>
    </>
  );
}

export default Navbar;

function PrivatePage(props) {
  const [state, dispatch] = useContext(UserContext);

  const navigate = useNavigate();

  const handleCart = () => {
    navigate("/cart-order");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  // const [profile, setProfile] = useState(null)
  const id = state.user.id
    //to get image for profile navbar
    const { data: profile ,isLoading} = useQuery("profileCache", async () => {
      const response = await API.get(`/user/${id}`);
      return response.data.data;
    });

  


  return (
      
    <div className="App Container bg-warning ">
      {/* {isLoading ? 
      <></>  
     : <> */}
      <div className="container">
        <nav className="container navbar navbar-expand-lg bg-warning navbar-light">
          <div
            className="justify-content-start"
            onClick={handleHome}
            style={{ cursor: "pointer" }}
          >
            <a className="navbar-brand waysFoodHeader" alt="#">
              WaysFood
            </a>
            <img src={Vespa} alt="delivery" className="ml-2"></img>
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto"></ul>
            <form class="form-inline my-2 my-lg-0">
              <div onClick={handleCart} style={{ cursor: "pointer" }}>
                <div style={{position:"absolute",backgroundColor:"red", borderRadius:"100%", width:"25px",height:"25px",right:"70px",fontWeight:"bold" }}>3</div>
                <img src={keranjang} alt="delivery" className="mr-4 "></img>
              </div>
              <div className="dropdown">
                <img
                  src={profile?.image ?  profile?.image  : Profil}
                  alt=""
                  className="dropdown rounded-circle"
                  width={40}
                  height={40}
                  type="button"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                />

                <ul className="dropdown-menu " aria-labelledby="dropdownMenu2">
                  <li
                    className="dropdown-content mr-5 mt-1 "
                    style={{ cursor: "pointer" }}
                  >
                    <div className="bg-white " onClick={handleProfile}>
                      <img
                        src={Profile}
                        className="img fluid mr-3 ml-1"
                        alt="profile"
                      ></img>
                      <span className="title-down">Profile</span>
                    </div>
                  </li>
                  <hr />
                  <li
                    className="dropdown-content mr-5 mt-1"
                    style={{ cursor: "pointer" }}
                  >
                    <div onClick={logout} className="bg-white ">
                      <img
                        src={Logout}
                        className="img fluid mr-3 "
                        alt="profile"
                      ></img>
                      <span className="title-down">Logout</span>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </nav>
      </div>
       {/* </>}  */}
    </div>  
   
  );
      }

function GuestPage(props) {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const data = await API.post("/login", form);

      const alert = <Alert variant="success">Login berhasil!</Alert>;

      setMessage(alert);
      console.log("ini data", data);

      let payload = data.data.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });

      navigate("/");

      console.log("isi payload", payload);
      console.log("ini data login", data);
    } catch (e) {
      console.log(e);
      const alert = <Alert variant="danger">Email / password salah!</Alert>;

      setMessage(alert);
    }
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className="App Container bg-warning  ">
      <div className="container ">
        <nav class="container navbar navbar-expand-lg bg-warning navbar-light">
          <div
            class="justify-content-start "
            onClick={handleHome}
            style={{ cursor: "pointer" }}
          >
            <a class="navbar-brand waysFoodHeader">WaysFood</a>
            <img src={Vespa} alt="delivery" className="ml-2"></img>
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto"></ul>
            <form class="form-inline my-2 my-lg-0">
              <Register />
              <div></div>
              <Button className="bg-dark text-white mr-3" onClick={handleShow}>
                Login
              </Button>
            </form>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>
                <img src={Login} alt=""></img>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {message && message}
              <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <button
                  className="btn  btn-lg btn-brown text-white  m-3"
                  variant="primary"
                  size="md"
                  type="submit"
                >
                  Login
                </button>

                <div className=" text-muted text-center mb-3">
                  Don't have an account ? Klik Here
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </nav>
      </div>
    </div>
  );
}

function PartnerPage() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleHome = () => {
    navigate("/income");
  };

  const handleProfile = () => {
    navigate("/profile-partner");
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
   // const [profile, setProfile] = useState(null)
   const id = state.user.id
   //to get image for profile navbar
   const { data: profile } = useQuery("profileCache", async () => {
     const response = await API.get(`/user/${id}`);
     return response.data.data;
   });




  return (
    <div className="App Container bg-warning ">
      <div className="container">
        <nav className="container navbar navbar-expand-lg bg-warning navbar-light">
          <div
            className="justify-content-start"
            onClick={handleHome}
            style={{ cursor: "pointer" }}
          >
            <a className="navbar-brand waysFoodHeader" alt="">
              WaysFood
            </a>
            <img src={Vespa} alt="delivery" className="ml-2"></img>
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto"></ul>
            <form class="form-inline my-2 my-lg-0">
              <div className="dropdown">
                <img
                  src={profile?.image === "http://localhost:5000/uploads/" ? partner : profile?.image  }
                  alt=""
                  className="dropdown rounded-circle"
                  width={40}
                  height={40}
                  type="button"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                />

                <ul
                  className="dropdown-menu "
                  style={{ width: "14rem", position: "absolute" }}
                  aria-labelledby="dropdownMenu2"
                >
                  <li
                    className="dropdown-content mr-5 mt-1 "
                    style={{ cursor: "pointer" }}
                  >
                    <div className="bg-white " onClick={handleProfile}>
                      <img
                        src={Profile}
                        className="img fluid mr-3 ml-1"
                        alt="profile"
                      ></img>
                      <span className="title-down">Profile Partner</span>
                    </div>
                  </li>
                  <li
                    className="dropdown-content mr-5 mt-1 "
                    style={{ cursor: "pointer" }}
                  >
                    <div className="bg-white " onClick={handleAddProduct}>
                      <img
                        src={AddProduct}
                        className="img fluid mr-3 ml-1"
                        alt="profile"
                      ></img>
                      <span className="title-down">Add Product</span>
                    </div>
                  </li>
                  <hr />
                  <li
                    className="dropdown-content mr-5 mt-1"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="bg-white " onClick={logout}>
                      <img
                        src={Logout}
                        className="img fluid mr-3 "
                        alt="profile"
                      ></img>
                      <span className="title-down">Logout</span>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </nav>
      </div>
    </div>
  );
}