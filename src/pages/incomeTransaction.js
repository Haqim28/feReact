import "../components/assets/css/profile.css"
import Ceklis from "../components/assets/ceklis.png"
import Cancel from "../components/assets/cancel.png"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import CartOrder from "./cart-order";




function IncomeTransaction() {
    const [transaction, setTransaction] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const [state] = useContext(UserContext);
  
    const getTransaction = async () => {
      try {
        const response = await API.get(`/transactionsSeller/${state.user.id}`);
        setTransaction(response.data.data);
        console.log(response.data.data);
        console.log("ini data transaction");
        console.log(transaction);
        setisLoading(false);
      } catch (error) {
        console.log(error);
        setisLoading(false);
      }
    };
    useEffect(() => {
        getTransaction();
    }, [isLoading]);
  

    return (
    <div className="container">
        <div className="container mt-5 ml-4">
            <h2>Income Transaction</h2>
            <div className="table-responsive bg-white">
                <table class="table table-bordered">
                    <thead class="bg-white">
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Products Order</th>
                        <th scope="col">Status</th>
                        <th scope="col" className="text-center">Action</th>
                        </tr>
                    </thead>
                    {transaction?.map((item,index) => (
              
                    <tbody>
                        <tr>
                        <th scope="row">{index+1}</th>
                        <td>{item.buyer.name}</td>
                        <td>{item.buyer.location}</td>
                        <td> {item.cart.order?.map((nama) => (
                        <span>{nama.product.title}  ,     </span>
                        ))}</td>
                        <td className="text-warning">{item.status}</td>
                        <td className="text-center"> <img src={Ceklis} alt="" /></td>
                        </tr>
                    </tbody>
                    ))}
                    {/* <tbody>
                        <tr>
                        <th scope="row">2</th>
                        <td>Haris Gams</td>
                        <td>Serang</td>
                        <td>Paket Geprek</td>
                        <td className="text-success">Success</td>
                        <td className="text-center"> <button className="bg-danger text-white btn-light">cancel</button> <button className="bg-success text-white btn-light ">Approve</button> </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <th scope="row">3</th>
                        <td>Aziz Union</td>
                        <td>Bekasi</td>
                        <td>Paket Geprek</td>
                        <td className="text-danger">Cancel</td>
                        <td className="text-center"> <img src={Cancel} alt="" /></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                        <th scope="row">2</th>
                        <td>Haris Gams</td>
                        <td>Serang</td>
                        <td>Paket Geprek</td>
                        <td className="text-success">Success</td>
                        <td className="text-center"> <img src={Ceklis} alt="" /></td>
                        </tr>
                    </tbody> */}
                </table>
            </div>
            
        </div>
           
    </div>
    );
  }
  export default IncomeTransaction;