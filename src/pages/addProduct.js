import React ,{useContext, useState} from 'react'
import Form from 'react-bootstrap/Form';
import '../components/assets/css/editProfile.css'
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import {API} from "../config/api"
import { UserContext } from '../context/userContext';
import MenuRestaurant from './menuRestaurant';

export default function AddProduct() {
    let navigate = useNavigate();
    const [state] = useContext (UserContext)
    const [form, setForm] = useState({
        image: "",
        title: "",
        price: 0,
        user_id : state.user.id
      });
    
      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]:
            e.target.type === "file" ? e.target.files : e.target.value,
        });
    
      };
        const handleSubmit = useMutation(async (e) => {
            try {
              e.preventDefault();
        
              const formData = new FormData();
              formData.set("image", form.image[0], form.image[0].name);
              formData.set("title", form.title);
              formData.set("price", form.price);
              formData.set("user_id", form.user_id);
        
              const data = await API.post("/product", formData, {
                headers: {
                  Authorization: `Bearer ${localStorage.token}`,
                },
              });
        
              navigate("/");
        
              console.log("ini insert product", data);
            } catch (error) {
              console.log(error);
            }
          });
        
    





    return (
        <div className='container mt-5 p-5 '>
           <h1 >Add Product</h1> 
           <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <div class="row justify-content-md-left">
                    <div class="col col-lg-9 ">
                    <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Control 
                    type="text" 
                    name="title"
                    onChange={handleChange}
                    placeholder="Title" />
                </Form.Group>
                    </div>
                    <div class="col-md-auto col-lg-3">
                        <div class="input-group mb-3">
                            <div class="custom-file">
                                <input 
                                type="file"
                                name = "image"
                                onChange={handleChange} 
                                className="custom-file-input" id="inputGroupFile01"/>
                                <label class="custom-file-label" for="inputGroupFile01">
                                    Attach File  
                                </label>
                            </div>
                        </div>  
                    </div>
                </div>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Control 
                    type="number" 
                    name="price"
                    onChange={handleChange}
                    placeholder="Price" />
                </Form.Group>

                
                <div className='text-right'>
                    <button type= "submit" className='btn-delivery text-white m-5'>Save</button>
                </div>

                
            </Form>      
             
        </div>
      
    );
  }
