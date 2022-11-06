import "./assets/css/popular.css"
import Card from 'react-bootstrap/Card';
import {API} from "../config/api"
import {  useEffect, useState } from "react";
import Profile from "./assets/profile.png";
import { useNavigate } from "react-router-dom";



function PopularRestaurant() {
  

    const [profile, setProfile] = useState(null)
    const getProfile = async() => {
        try {
            const response = await API.get('/user/role/partner');
            setProfile(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=> {
        getProfile()
    }, [])

    const navigate = useNavigate()
    const handleGoToDetail = (id) => {
        navigate(`resto/${id}`)
    };
    return (
     <div className="container">
        <div className="container row text-center">
        <h2 className="  mb-4 mt-5 font-weight-bold col-md-text-left col-lg-6 col-md-12">Popular Restaurant</h2>
           <div className="row justify-content-md-start col-lg-12 ml-5">
            {profile?.map((restaurant) => (  
                 <Card style={{ width: '14rem'  }} 
                 item={restaurant} 
                 key={restaurant.id}
                 onClick={() => handleGoToDetail(restaurant.id)}
                 className=" card ml-2 border mt-2 p-4">
                    <div className="d-flex">
                    <img src={!restaurant?.image  ?  Profile : "http://localhost:5000/uploads/" + restaurant.image } alt=""  width={50} height= {70}className="img fluid "></img>
                    <h5 className="text-center pt-4 px-2  font-weight-bold titlePopular"> {restaurant.fullname} </h5>

                    </div>
                </Card>
             ))}    
            
        </div>
            
         </div>
            
     </div>
    );
  }
  export default PopularRestaurant;