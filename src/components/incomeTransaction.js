import { useContext, useEffect, useState } from "react";
import "../components/assets/css/profile.css";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

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
      console.log("ini error");
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };
  useEffect(() => {
      getTransaction();
      console.log("hallo");
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
                <th scope="col">Action</th>
              </tr>
            </thead>
            {transaction?.map((item) => (
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>{item.buyer.name}</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
export default IncomeTransaction;
