import "./assets/css/popular.css"
import Card from 'react-bootstrap/Card';
import Geprek from "./assets/geprek.png";
import Nasgor from "./assets/nasigoreng.png";
import Pecelayam from "./assets/pecelayam.png";
import KK from "./assets/kopikenangan.png";
import {useNavigate} from "react-router-dom";


function NearRestaurant() {
  const navigate = useNavigate()
    const restaurantsNear = ([
        {image: Geprek , nama: 'Geprek Bensu', jarak: '0,2'},
        {image: Nasgor , nama: 'Nasi Goreng Mas Rony', jarak: '0,6'},
        {image: Pecelayam , nama: 'Pecel Ayam Prambanan', jarak: '0,6'},
        {image: KK , nama: 'Kopi Kenangan', jarak: '1,6'},
      ]);
      
      
  const handleMenu = () => {
    navigate("/resto")
  }
    return (
     <div className="container">
        <div className="container row ">
          <h2 className="text-left ml-3 mb-4 font-weight-bold mt-5 col-lg-5 text-center ">Near Restaurant</h2>
            <div className="row col-lg-12 text-right ml-5">
            {restaurantsNear.map((restaurantNear) => (
                 
                  <Card style={{   cursor:'pointer'}} className="h-100% mt-2 mb-2 p-2 m-1col-sm-12 col-lg-3" onClick={handleMenu} >
                     
                          <div className="">
                            <img src={restaurantNear.image} alt="" className="img-fluid col-md-12"></img>
                          <h5 className="text-left pl-4 pt-2 text-dark col-md-12">{restaurantNear.nama}</h5>
                          <p className="text-left pl-4 text-dark" >{restaurantNear.jarak}</p> 
                          </div>
                      
                  </Card>
               
              ))}
              
            </div>
        </div>
          
            
     </div>
    );
  }
  export default NearRestaurant;