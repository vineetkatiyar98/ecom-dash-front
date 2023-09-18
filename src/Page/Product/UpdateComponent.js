import React, { useEffect,useState } from "react";
import updatedLogo from '../../Assets/Images/update.png'
import { useParams, useNavigate } from "react-router-dom";

const UpdateComponent = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompnay] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.log(params);
    let result = await fetch(`https://mern-dashboard-backend.cyclic.cloud/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompnay(result.company);
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    console.warn(name, price, category, company);
    let result = await fetch(
      `https://mern-dashboard-backend.cyclic.cloud/${params.id}`,
      {
        method: "Put",
        body: JSON.stringify({ name, price, category, company }),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    result = await result.json();
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="authpage">
    <div className="authcont">
      <form className="authform" onSubmit={updateProduct}>
        <img src={updatedLogo} alt="signup here" />
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
          <input type="submit" value="Update" className="submit" />
        </div>
      </form>
    </div>
  </div>
  );
};

export default UpdateComponent;
