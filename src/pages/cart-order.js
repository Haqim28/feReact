import "../components/assets/css/cart-order.css"
import React, { useEffect, useState } from 'react';
import Geprek from "../components/assets/menu/paketGeprek.png"
import Minus from "../components/assets/-.png"
import Plus from "../components/assets/+.png"
import Sampah from "../components/assets/sampah.png"
import Maps from "../components/assets/maps.png"
import selectMaps from "../components/assets/selectMap.png"
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";

function getSubTotal (data){
    let Subtotal = 0
            for(let i = 0; i < data.length; i++){ Subtotal   += data[i].price_order}
    return (Subtotal)
}
function getQtyTotal (data){
    let Subtotal = 0
            for(let i = 0; i < data.length; i++){ Subtotal   += data[i].qty}
    return (Subtotal)
}
function CartOrder() {    
    const [state] = useContext(UserContext)
    const [cart, setCart] = useState(null)
    const [subTotal , setsubTotal] = useState(null)
    const [qtyTotal,setqtyTotal] = useState(null)
    const [isLoading,setisLoading] = useState(true)

    const getData = async () => {
        try {
            const response = await API.get(`/cart/${state.user.iscart}`);
            setCart(response.data.data.order)
            console.log(response.data.data);
            let dataOrder = response.data.data.order
            setsubTotal(getSubTotal(dataOrder))
            setqtyTotal(getQtyTotal(dataOrder))
            setisLoading(false)
        } catch (error) {
            console.log(error);
            setisLoading(false)

        }
    }  
    useEffect(() => {
        if(isLoading){
            getData()
        }
    }, [isLoading])

    const handleDelete = async (id) => {
        try {
          await API.delete(`/order/${id}`);
          setisLoading(true)
        console.log("ini id dari yang du ketik",id);
        } catch (error) {
          setisLoading(true)

          console.log(error);
        }
      };

    const handleAdd = async (orderid,price,jumlah) => {
        try{
            console.log(price);
           let newqty = jumlah + 1
           let newTotal = newqty * price
           let updateOrder = {
            qty : newqty ,
            price_order : newTotal
           } 
           await API.patch(`/order/${orderid}`, updateOrder);
           getData()
        }catch (error){
            console.log(error);
        }
    }
    const handleMinus = async (orderid,price_order,jumlah,price_product) => {
        try{
            if(jumlah === 1){
                await API.delete(`/order/${orderid}`);
            }else{
            let minqty = jumlah - 1
            let minTotal = price_order - price_product
            let updateOrder = {
                qty : minqty ,
                price_order : minTotal
               } 
           await API.patch(`/order/${orderid}`, updateOrder);
            }
           getData()

        }catch(error){

        }
    }
    //============================================================

    const navigate = useNavigate()
    const handleBack = () => {
        navigate(`/resto/${cart[0]?.product.user.id}`);
      };
//=====================================Handle Transaksi==============
    const handleTransaction = async (cartid,total,selllerid) => {
            try{
                    console.log(cartid,total,selllerid);
        //insert for handleTransaction    
            let transaction = {
                cart_id : cartid,
                buyer_id : state.user.id,
                seller_id : selllerid,
                subtotal : total
               } 
            const response = await API.post(`/transaction`,transaction);
            console.log(response.data.data);

          //insert for update status in cart Table
          let updateStatus = {
            status : "Finished",
        }
        console.log(updateStatus);
          const responseUpdateStatus = await API.patch(`/cart/${state.user.iscart}`,updateStatus);
          console.log(responseUpdateStatus);
          //insert for change new cart_id if status in cart_id === Finished
          let cart = {
            qty : 1,
            user_id : state.user.id
          }
          // create  cart
      const responseCart = await API.post('/cart',cart)

      console.log("ini cart respon",responseCart.data.data.id);
        // Store data with FormData as object
        const formData = new FormData();
        formData.set("iscart", responseCart.data.data.id )

      // Insert product data
      const responseUpdate = await API.patch("/user/" + cart.user_id, formData);
      console.log(responseUpdate.data.data);

      navigate(`/profile`);








            }catch(error){
                console.log(error);
            }
        }

//====================================================================
    return (
        
        <div className="container mt-5 ">
            {isLoading ? <></>: <>
            <div className="title-order" onClick={handleBack}>
                
                {cart[0]?.product.user.name}
            </div>
         
            <div className="delivery-title">
                Delivery Location
            </div>
            <div className="row">
                    <input type="text" className="form-control input-delivery ml-3 mb-2" placeholder="Harbour Building" aria-label="Username" aria-describedby="addon-wrapping"/>


                    <div class="col-md-auto col-lg-3 text-right  text-white" >
                        <div className="btn-delivery text-center " style={{cursor:'pointer'}} data-toggle="modal" data-target=".bd-example-modal-xl">
                            <div className='pt-2'>Select On Map <img src={selectMaps} alt="maps"></img></div>
                        </div>  
                        <div className="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                                <div className="  modal-dialog  modal-xl" >
                                    <div className="modal-content">
                                        <img src={Maps} alt="" ></img>
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                    </div>
            </div>
            <div className="riview-order">
                Riview Your Order
            </div>
            <div>
                <div className="row ml-2 ">
                    <div className="col-lg-8 col-md-12">
                        <hr />
                    <div data-spy = "scroll">
                        
                        {cart?.map((item) => ( 
 
                        <div className="d-flex riview-ukuran mb-5" >
                            <div >
                                <div className="d-md-flex">
                                    <div className="justify-content-start ">
                                        <img src={item?.product.image ?  item?.product.image :Geprek} alt='' className="mb-2"></img>
                                    </div>
                                    <div className="justify-content-end ml-3">
                                        <div className="mb-3">
                                            <h5 className="">{item?.product.title}</h5>
                                            <div className="mt-5 p-3 ">
                                                <img onClick={() => handleMinus(item.id,item.price_order,item.qty,item.product.price)} src={Minus} alt="" className="mr-3"  style={{cursor:'pointer'}}></img>
                                                <label className="mr-3">{item?.qty}</label>
                                                <img onClick={() => handleAdd(item.id,item.product.price,item.qty)} src={Plus} alt=""  style={{cursor:'pointer'}}></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               </div>
                            <div className="ml-auto">
                                <div>
                                    Rp {item?.price_order}
                                </div>
                            <img src={Sampah} alt="" className="mt-5" onClick={() => handleDelete(item?.id)}></img>
                            </div>
                        </div>
                        ))}
                        <hr />  
                        </div>
                      
                    </div>
                    
                    <div className="col-lg-4 col-md-12 text-right">
                        <hr />
                            <div className="total-ukuran text-right">
                                <div className="d-flex total-ukur  p-3 text-right">
                                    <div>Subtotal</div>
                                    <div className="ml-auto">Rp {subTotal} </div>
                                </div>
                                <div className="d-flex total-ukur  p-3">
                                    <div>Qty</div>
                                    <div className="ml-auto">{qtyTotal}</div>
                                </div>
                                <div className="d-flex total-ukur  p-3">
                                    <div>Ongkir</div>
                                    <div className="ml-auto">10.000</div>
                                </div>
                            </div>
                        <hr />
                        <div className="text-right">
                            <button className="btn-order text-white" data-toggle="modal"  onClick={() => handleTransaction(cart[0].cart_id,subTotal+10000,cart[0].product.user.id)}>
                                {/* data-target=".bd-example-modal-xl"> */}
                                Order
                            </button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            
            </> }
        </div>
             
       
    );
  }
  export default CartOrder;
