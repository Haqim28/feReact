import React, { useContext,useEffect,useState } from 'react'
import Form from 'react-bootstrap/Form';
import '../components/assets/css/editProfile.css'
import Maps from '../components/assets/maps.png'
import selectMaps from "../components/assets/selectMap.png"
import {API} from "../config/api"
import { UserContext } from '../context/userContext';
import { useNavigate } from "react-router";
import {useQuery} from "react-query"

function EditProfile() {
    let navigate = useNavigate();
    const [state] = useContext(UserContext)
    const id = state.user.id
    const [preview, setPreview] = useState(null);



    const [form, setForm] = useState({
        fullname: '',
        email: '',
        phone: '',
        location: '',
        image: '',
    }); 

    const { data: profile } = useQuery("profileCache", async () => {
        const response = await API.get(`/user/${id}`);
        console.log(response);
        return response.data.data;
      });
    useEffect(() => {
       
        if (profile) {
            setForm({
            ...form,
            fullname: profile.fullname,
            email: profile.email,
            phone: profile.phone,
            location: profile.location,
            image: profile.image,
          });
        }
    }, [profile]);

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]:
            e.target.type === "file" ? e.target.files[0] : e.target.value,
        });
    

    if (e.target.type === "file") {
        const url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
      }
    };
    

    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
    
          // Store data with FormData as object
          const formData = new FormData();
          if (preview) {
            formData.set("image", form?.image, form?.image.name);
          }
          formData.set("fullname", form.fullname);
          formData.set("email", form.email);
          formData.set("phone", form.phone);
          formData.set("location", form.location);
    
          // Insert product data
          const response = await API.patch("/user/" + profile.id, formData);
    
          console.log("ini data updated user", response.data);
    
          navigate("/");
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <div className='container mt-5 p-5 '>
           <h1 >Edit Profile</h1> 
           <Form onSubmit={(e) => handleSubmit(e)}>
                <div class="row justify-content-md-left">
                    <div class="col col-lg-9 ">
                         <Form.Group className="mb-3" controlId="formBasicFullName">
                            <Form.Control 
                            type="text" 
                            name="fullname"
                            onChange={handleChange}
                            Value = {form?.fullname}
                            placeholder="FullName" />
                        </Form.Group>
                    </div>
                    <div class="col-md-auto col-lg-3">
                        <div class="input-group mb-3">
                            <div class="custom-file">
                                <input 
                                type="file" 
                                name="image"
                                onChange={handleChange}
                                class="custom-file-input" 
                                id="inputGroupFile01"/>
                                <label class="custom-file-label" for="inputGroupFile01">
                                    Attach File  
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Control 
                    type="email" 
                    name="email"
                    value={form?.email}
                    onChange={handleChange}
                    placeholder="Email" />
                </Form.Group>

                <Form.Group className="mb-3 " controlId="formBasicPhone">
                    <Form.Control 
                    type="number" 
                    name="phone"
                    value={form?.phone}
                    onChange={handleChange}
                    placeholder="Phone" />
                </Form.Group>
                <div class="row justify-content-md-left">
                    <div class="col col-lg-9 ">
                        <Form.Group className="mb-3 " controlId="formBasicLocation">
                        <Form.Control 
                        type="text"
                        name="location"
                        value={form?.location}
                        onChange={handleChange} 
                        placeholder="Location" />
                        </Form.Group>
                    </div>
                    <div class="col-md-auto col-lg-3 text-right  text-white" >
                        <div className="btn-delivery text-center " style={{cursor:'pointer'}} data-toggle="modal" data-target=".bd-example-modal-xl">
                            <div className='pt-2'>Select On Map <img src={selectMaps} alt="map" className='pl-3'></img></div>
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
                <div className='text-right'>
                    <button className='btn-delivery text-white m-5' type='submit'>Save</button>
                </div>

                
            </Form>        
        </div>
             
       
    );
  }

  export default EditProfile;