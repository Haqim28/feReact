import Vespa from "../components/assets/vespa.png";
import "../components/assets/css/navbar.css";
import Orang from "../components/assets/orang.png";
import Finish from "../components/assets/Finsihed.png";
import "../components/assets/css/profile.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import { useQuery } from "react-query";

function Profile() {
  const navigate = useNavigate();
  const [state] = useContext(UserContext);
  const [isLoading,setisLoading] = useState(true)
//   const [profile, setProfile] = useState(null);
  const id = state.user.id;
  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get(`/user/${id}`);
    console.log(response.data.data);
    return response.data.data;
  });

  // const { data: transaction } = useQuery("transacionCache", async () => {
  //   const response = await API.get(`/transactions/${state.user.id}`);
  //   console.log(response.data.data);
  //   return response.data.data;
  // });
  const [transaction, setTransaction] = useState(null)

  const getTransaction = async () => {
    try {
        const response = await API.get(`/transactions/${state.user.id}`);
        setTransaction(response.data.data)
        console.log(response.data.data);
        console.log("ini data transaction");
        console.log(transaction);
        setisLoading(false)
    } catch (error) {
        console.log(error);
        setisLoading(false)
    }

} 
useEffect(() => {
  if(isLoading){
      getTransaction()
  }
}, [isLoading])
  return (

    <div className="container">
      {isLoading ? <> </> : <>
      <div className="d-md-flex justify-content-space-between">
        <div className="justify-content-start ml-5 mr-5 mt-5 ">
          <div className="mb-3 title-edit">My Profile</div>
          <div className="d-md-flex">
            <div className="justify-content-start" onClick={handleEditProfile}>
              <img
                src={
                  profile?.image === "http://localhost:5000/uploads/"
                    ? Orang
                    : profile?.image
                }
                alt=""
                width={250}
              ></img>
              <button className="btn-block btn-edit-css mt-2 text-white">
                Edit Profile
              </button>
            </div>
            <div className="justify-content-end ml-3">
              <div className="mb-3">
                <h5 className="subtitle-edit">FullName</h5>
                <span className="isiProfile-edit">
                  {profile?.fullname ? profile?.fullname : "-"}
                </span>
              </div>
              <div className="mb-3">
                <h5 className="subtitle-edit">Email</h5>
                <span className="isiProfile-edit">
                  {profile?.email ? profile?.email : "-"}
                </span>
              </div>
              <div>
                <h5 className="subtitle-edit">Phone</h5>
                <span className="isiProfile-edit">
                  {profile?.phone ? profile?.phone : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-5 ml-auto">
          <div className="title-edit">History Transaction</div>
          {transaction?.map((item) => ( 
          <div className="d-md-flex p-3 bg-white  border">
            <div className="justify-content-start">
              <h5 className="history-title">{item?.cart.order[0].product.user.name}</h5>
              <h5 className="history-day">
                <span className="font-weight-bold">{milisToDate(item?.create_at)}</span>
              </h5>
              <span className="history-ttl">Total : Rp {item?.subtotal}</span>
            </div>
            <div className="justify-content-end ml-5">
              <span className="waysfood">WaysFood</span>
              <img src={Vespa} alt=""></img>
              <div>
                <img src={Finish} alt=""></img>
              </div>
            </div>
          </div>
             ))} 
        </div>
    
      </div>
         </>}
      
    </div>
  );
}
export default Profile;


function milisToDate(milis) {
  let date = new Date(milis);
  let convertMonth = month => {
    switch (month) {
      case 0:
        return 'Januari';
      case 1:
        return 'Februari';
      case 2:
        return 'Maret';
      case 3:
        return 'April';
      case 4:
        return 'Mei';
      case 5:
        return 'Juni';
      case 6:
        return 'Juli';
      case 7:
        return 'Agustus';
      case 8:
        return 'September';
      case 9:
        return 'Oktober';
      case 10:
        return 'November';
      case 11:
        return 'Desember';
      default:
        return 'Unknown';
    }
  };

  let dateNumber = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return `${dateNumber} ${convertMonth(date.getMonth())} ${date.getFullYear()}`;
}

