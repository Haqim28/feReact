import "../components/assets/css/popular.css"
import Card from 'react-bootstrap/Card';
import Geprek from '../components/assets/menu/paketGeprek.png'
import { useNavigate } from "react-router-dom";
import {useContext, useEffect, useState} from "react"
import {UserContext} from "../context/userContext"
import {useMutation, useQuery} from "react-query"
import {API} from "../config/api"
import { useParams } from 'react-router-dom';



function MenuRestaurant(props) { 
      const {id} = useParams()
      const { data: menu  } = useQuery("productsCache", async () => {
        const response = await API.get(`/products/${id}`);
        // console.log(response.data.data);
        return response.data.data;
      });

      // for partner
      const { data: user  } = useQuery("usersCache", async () => {
        const response = await API.get(`/user/${id}`);
        // console.log(response.data.data);
        return response.data.data;
      });

      // useEffect(() => {
      //   console.log(user);
      // }, []);

        //==========================================
        const [state,dispatch] = useContext(UserContext)

        

      // const [createCart , setCreateCart] = useState(false)

      
     const handleSubmit = async (cart_id,product_id,price_order) => {
      try{
        
         let order = {
          qty : +  1 ,
          cart_id : cart_id,
          product_id : product_id,
          price_order : price_order
         } 
         const responseOrder = await API.post('/order',order)
         console.log(responseOrder);
      }catch (error){
          console.log(error);
      }
  }
    
    return (
     <div className="ml-5">
      {/* {isLoading? 
      <></>  
     : <>   */}
        <div className="ml-5">
        <h2 className="text-left ml-3 mb-4 font-weight-bold mt-5">{user?.name} , Menus</h2>
            <div className="row justify-content-md-start">
             {menu?.map((restaurantMenu) => ( 
                  <Card style={{ width: '18rem' }} className="ml-3 mt-2 mb-2  p-3" >
                      <div className="">
                          <img 
                          width="100%"
                          height="200"
                          src={restaurantMenu.image ? "http://localhost:5000/uploads/"+ restaurantMenu?.image : Geprek} alt="" className=""></img>
                        <h5 className="text-left  pt-2 ">{restaurantMenu.title} </h5>
                        <p className="text-left " >{restaurantMenu.price}</p>
                        <button variant="warning" class="btn btn-warning btn-md mt-5 btn-block"
                        onClick={() => handleSubmit(state.user.iscart,restaurantMenu?.id,restaurantMenu.price)}
                        >Order</button>
                      </div>
                  </Card>
                
               ))}
              
            </div>
        </div>
          
        {/* </>}    */}
     </div>
    );
  }
  export default MenuRestaurant;