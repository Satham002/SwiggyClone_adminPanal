import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = () => {
  const url = "http://localhost:5000";
  const [image, setImage] = useState(false);
  const [data, setdata] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: ""
  })
  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata({ ...data, [name]: value })
    // console.log(name +":"+ value)
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("description", data.description);
    formdata.append("category", data.category);
    formdata.append("price", Number(data.price));
    formdata.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formdata)
    if (response.data.success) {
      setdata(({
        name: "",
        description: "",
        category: "Salad",
        price: ""
      }))
      setImage(false);
      toast.success(response.data.message)
    }
    else {
      toast.error(response.data.message)
    }
  }
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-uplode flex-col">
          <p>uplode Image</p>
          <label htmlFor="image"><img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" /></label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className='add-product-name flex-col'>
          <p>product name</p>
          <input type="text" onChange={onChangehandler} value={data.name} name='name' placeholder='Product name' required />
        </div>
        <div className='add-product-description flex-col'>
          <p>product description</p>
          <textarea type="text" name='description' onChange={onChangehandler} value={data.description} rows="6" placeholder='Write Product description' required />
        </div>
        <div className='add-category-price'>
          <div className="add-category flex-col">
            <p>product category</p>
            <select name="category" onChange={onChangehandler} value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className='add-price flex-col'>
            <div>Price</div>
            <input type="number" onChange={onChangehandler} value={data.price} name='price' placeholder='$0' />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add Product</button>

      </form>
    </div>
  )
}

export default Add
