import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
const List = () => {
  const [list, setList] = useState([]);

  const url = "http://localhost:5000";

  const fetchlist = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if (response.data.success) {
      console.log(response.data.message)
      if (Array.isArray(response.data.message)) {
        setList(response.data.message); // Adjust based on actual response structure
      } else {
        console.error('Expected an array but got:', response.data.message);
      }
    }
    else {
      toast.error("Data Fetch Error")
    }
  }


  useEffect(() => {
    fetchlist();
  }, [])


  const removeFood = async (foodId) => {
    const responce = await axios.post(`${url}/api/food/remove/`, { id: foodId })
    await fetchlist();
    if (responce.data.success) {
      toast.success("Sucessfully Deleted")
    }
  }

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item, index) => (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className='cursor' onClick={() => { removeFood(item._id) }}>X</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default List
