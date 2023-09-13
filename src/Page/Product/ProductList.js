import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ourp from "../../Assets/Images/ourp.png";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:8000/products", {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    console.warn(id);
    let result = await fetch(`http://localhost:8000/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:8000/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="yourorders">
      <div className="search">
      <input
        type="text"
        className="searchbox"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      </div>

      <table className="yourorderstable">
        <thead>
          <tr>
            <th scope="col">Sr. No.</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((item, index) => {
              return (
                <tr key={item._id} >
                  <td className="data" data-label="OrderID">{index + 1}</td>
                  <td className="data" data-label="OrderDate">{item.name}</td>
                  <td className="data" data-label="Delivery Status">{item.price}</td>
                  <td className="data" data-label="Total">{item.category}</td>
                  <td className="data" data-label="Invoice">
                    <button
                      className="mainbutton1"
                      onClick={() => deleteProduct(item._id)}
                    >
                      Delete
                    </button>
                    <Link className="link" to={`/update/${item._id}`}>
                      Update
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <h1>No Result Found</h1>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
