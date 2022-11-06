import vespa from "./assets/vespa.png";
import partner from "./assets/partner.png";
import "./assets/css/navbar.css";
import {useNavigate} from "react-router-dom";
import Logout from "./assets/logout 1.png"
import Profile from "./assets/profile.png";
import AddProduct from "./assets/addpartner.png"


function Navbar() {
  const navigate = useNavigate()

  const handleAddProduct = () => {
    navigate("/add-product")
  }

  const handleHome = () => {
    navigate("/")
  }

  const handleProfile = () => {
    navigate("/profile-partner")
  }
  
  return (
    <div className="App Container bg-warning ">
      <div className="container">
        <nav className="container navbar navbar-expand-lg bg-warning navbar-light">
              
              <div className="justify-content-start" onClick={handleHome} style={{cursor:"pointer"}}>
                  <a className="navbar-brand waysFoodHeader" alt="#">WaysFood</a>
                  <img src={vespa} alt="delivery" className="ml-2"></img>
              </div>      
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                   
                  <div className="dropdown">
                        <img src={partner} alt="" className="dropdown " type="button" id="dropdownMenu2" data-toggle="dropdown" />
                     
                      
                      <ul className="dropdown-menu " style={{width:'14rem', position:'absolute'}}aria-labelledby="dropdownMenu2">
                          <li className="dropdown-content mr-5 mt-1 " style={{cursor:"pointer"}} >
                              <div className="bg-white " onClick={handleProfile}>
                                  <img src={Profile} className="img fluid mr-3 ml-1" alt="profile"></img>
                                  <span className="title-down">Profile Partner</span>
                              </div>
                          </li>
                          <li className="dropdown-content mr-5 mt-1 " style={{cursor:"pointer"}} >
                              <div className="bg-white " onClick={handleAddProduct}>
                                  <img src={AddProduct} className="img fluid mr-3 ml-1" alt="profile"></img>
                                  <span className="title-down">Add Product</span>
                              </div>
                          </li>
                          <hr />
                          <li className="dropdown-content mr-5 mt-1" style={{cursor:"pointer"}}>
                              <div  className="bg-white ">
                                  <img src={Logout} className="img fluid mr-3 " alt="profile"></img>
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
  export default Navbar;