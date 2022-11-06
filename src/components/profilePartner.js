import Vespa from "./assets/vespa.png";
import "./assets/css/navbar.css";
import Finish from "./assets/Finsihed.png"
import "../components/assets/css/profile.css"
import Geprek from './assets/menu/sambelMatah.png'
import {useNavigate} from "react-router-dom";

function ProfilePartner() {
   const navigate = useNavigate()

   const handleEditProfile = () => {
      navigate('/edit-profile-partner')
   }
  
    return (
     <div className="container">
        <div className="d-md-flex justify-content-space-between">
            <div className="justify-content-start ml-5 mr-5 mt-5 ">
                <div className="mb-3 title-edit">Profile Partner</div>
                <div className="d-md-flex">
                    <div className="justify-content-start">
                        <img src={Geprek} alt=''></img>
                        
                    </div>
                    <div className="justify-content-end ml-3">
                        <div className="mb-3">
                            <h5 className="subtitle-edit">Nama Partner</h5>
                            <span className="isiProfile-edit">Geprek Bensi</span>
                        </div>
                        <div className="mb-3">
                            <h5 className="subtitle-edit">Email</h5>
                            <span className="isiProfile-edit">bensi@gmail.com</span>
                        </div>
                        <div>
                            <h5 className="subtitle-edit">Phone</h5>
                            <span className="isiProfile-edit">083823423323</span>
                        </div>
                    </div>
                </div>
                <button className="btn-block btn-edit-css mt-2 text-white" onClick={handleEditProfile}>Edit Profile</button>
                
            </div>
            <div className=" mt-5 ml-auto">
                <div className="title-edit">History Order</div>
                <div  className="d-md-flex p-3 bg-white  border"  >
                    <div className="justify-content-start">
                        <h5 className="history-title">Andi</h5>
                        <h5 className="history-day"><span className="font-weight-bold">Saturday</span>, 12 March 2021</h5>
                        <span className="history-ttl">Total : Rp 45.000</span>
                    </div>
                    <div className="justify-content-end ml-5">
                        <span className="waysfood">WaysFood</span>
                        <img src={Vespa} alt=''></img>
                        <div>
                            <img src={Finish} alt=''></img>
                        </div>
                        
                    </div>
                </div>
               
                
            </div>
        </div> 
            
      </div>
    );
  }
  export default ProfilePartner;