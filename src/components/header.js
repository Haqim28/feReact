import React from 'react'
import Pizza from './assets/pizzA.png'
import "./assets/css/header.css"

function Header() {
    return (
            <div>
                <div className='bg-warning '>
                    <div className="container ">
                        <div className="container ">
                            <div className="App Container bg-warning row">
                                
                                        <div className='text-left col-md-12 col-lg-6'> 
                                            <h1 className='title'>Are You Hungry ?</h1>
                                            <h1 className='title'>Express Home Delivery</h1>
                                            <div className='d-flex justify-content-end'>
                                                <div>
                                                    <span class="text-dark font-weight-bold">____________________</span>
                                                </div>
                                                <div className='ml-2 mr-5'>
                                                    <p className='text-justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' mb-2 col-lg-4 col-lg-text-left col-md-text-center '>
                                            <img src={Pizza} alt="pizza"></img>
                                        </div>
                                   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             
       
    );
  }
  export default Header;