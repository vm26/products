import React from "react";
import { useState,useEffect } from 'react'
import axios from 'axios'
import Modal from "./Modal";
const Products=()=>{
    const [products,setproducts]=useState([])
    const [showModal,setShowModal]=useState(false);
    const [formData,setformData]=useState({});
  
    useEffect(()=>{
            axios.get('https://fierce-meadow-89607.herokuapp.com/products').then(res=>setproducts(res.data)).catch(err=>console.log(err));
    },[])
    const getData=()=>{
        axios.get('https://fierce-meadow-89607.herokuapp.com/products').then(res=>setproducts(res.data)).catch(err=>console.log(err));
    }
    const onInputChange = (e) => {
        setformData(oldvalue => {
            return {
                ...oldvalue,
                [e.target.name]: e.target.value
            }
            
        })
        console.log(formData);

    }
    const onAdd=()=>{       
        axios.post('https://fierce-meadow-89607.herokuapp.com/products',{
            name:formData.name,
            category:formData.category,
            img:formData.img,
            price:formData.price

        }
        )       
        .then(res=>{getData();}).catch(err=>console.log(err));
        setShowModal(false);
        setformData({});
    }
    const Edit=()=>{       
        axios.put(`https://fierce-meadow-89607.herokuapp.com/products/${formData.id}`,{
            name:formData.name,
            category:formData.category,
            img:formData.img,
            price:formData.price
        }
        )       
        .then(res=>{getData();}).catch(err=>console.log(err));
        setShowModal(false);
        setformData({});
    }
    const onEdit=(id)=>{             
        axios.get(`https://fierce-meadow-89607.herokuapp.com/products/${id}`).then(res=>{console.log(res.data);setformData(res.data)}).catch(err=>console.log(err));
        setShowModal(true);
    }
    const onDelete=(id)=>{       
        axios.delete(`https://fierce-meadow-89607.herokuapp.com/products/${id}`,{
            name:formData.name,
            category:formData.category,
            img:formData.img,
            price:formData.price

        }
        )       
        .then(res=>{getData();}).catch(err=>console.log(err));
        setShowModal(false);
    }
   
    return <>
    <div style={{margin:'20px'}}>
    <h1 style={{textAlign:"center",fontFamily:'inherit'}}>Products</h1>
    <button style={{marginLeft:"45%",marginTop:'20PX'}} type="button" class="btn btn-success" onClick={()=>setShowModal(true)}>Add Product</button>
     <Modal title={formData.id? 'Edit Product' :'Add Product'} open={showModal}>   
  
    <label for="name">Name:</label>
    <input type="text" class="form-control"  value={formData.name} id="name" name="name" onChange={onInputChange}></input>   
 
    <label for="category">Category:</label>
    <input type="text" class="form-control" value={formData.category} id="category" name="category" onChange={onInputChange}></input>  
    <label for="category">Price:</label>
    <input type="text" class="form-control" value={formData.price} id="price" name="price" onChange={onInputChange}></input>  
  
    <label for="img">Image URL:</label>
    <input type="text" class="form-control" value={formData.img} id="img" name="img" onChange={onInputChange}></input>  
 <div style={{margin:'10px'}}>
     {
         formData.id?
         <button style={{marginRight:'30px'}} type="submit" class="btn btn-primary" onClick={Edit}>Edit</button>
         :
         <button style={{marginRight:'30px'}} type="submit" class="btn btn-primary" onClick={onAdd}>Add</button>
     }

  <button class="btn btn-primary" onClick={()=>{setShowModal(false);setformData({});}}>Close</button>
 </div>
  

    </Modal>
    <div style={{display:'flex',flexWrap:"wrap"}}>
    {
        products.map(item=>{
            return(
                <div style={{margin:"2%",border:'2px dotted green',padding:'10px 30px',borderRadius:'5px',background:'white'}}>
                    <h5 style={{textAlign:"center"}}>{item.name}</h5>
                    <img src={item.img} style={{height:"200px",width:"150px"}}/><br></br>
                    <h5  style={{textAlign:"center"}}> <small>From Rs.</small>{item.price}</h5>
                    <div style={{margin:'10px'}}>
                    <button style={{marginRight:'10px'}} type="button" class="btn btn-secondary" onClick={()=>{onEdit(item.id)}}>Edit</button>
                    <button type="button" class="btn btn-danger" onClick={()=>{onDelete(item.id)}}>Delete</button>
                    </div>
                </div>
            )
        })
    }</div>
    </div>
    </>
}
export default Products;