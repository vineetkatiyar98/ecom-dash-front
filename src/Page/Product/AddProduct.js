import React, { useState } from "react";
import addp from '../../Assets/Images/add.png';
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompnay] = useState("");
  // const [error, setError] = useState(false);

  const navigate = useNavigate()

  const addProductOnCart = async (e) => {
    e.preventDefault();
    console.log(name,price,category,company)
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:8000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/")
  };

  return (
    <div className="authpage">
      <div className="authcont">
        <form className="authform" onSubmit={addProductOnCart}>
          <img src={addp} alt="signup here" />
          <div className="formgroup">
            <label htmlFor="fname">Product's Name</label>
            <input
              type="text"
              id="fname"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="formgroup">
            <label htmlFor="price">Product's Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="formgroup">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </div>

          <div className="form-group-row">
            <div className="formgroup">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => {
                  setCompnay(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="formgroupp">
            <input type="submit" value="Add To Cart" className="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
