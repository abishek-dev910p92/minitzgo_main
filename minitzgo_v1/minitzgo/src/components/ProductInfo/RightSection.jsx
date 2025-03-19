import React, { useContext, useEffect, useState } from "react";
import cartIcon from "../../assets/cart-icon.svg";
import StarRatings from "./StarRatings";
import paypalIcon from "../../assets/paypal.svg";
import mastercardIcon from "../../assets/mastercard.svg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import myContext from "../context/MyContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../../components/redux/Slices/CartSlice";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function RightSection({ productId }) {
  const [cart, setCart] = useState([]);
  const totalQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );
  const [snackbarOpen, setSnackbarOpen] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  // const [selectedSize, setSelectedSize] = useState("");
  const id = productId;

  const { handleImageClick } = useContext(myContext);
  const [productSizes, setProductSizes] = useState([]);
  const [productColors, setProductColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeSelection, setActiveSelection] = useState({
    size: product.product_size,
    color: product.product_color1,
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://minitgo.com/api/fetch_products.php")
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const item = products.filter((productItem) => productItem.pid === id);
    const fProduct = item[0];
    if (fProduct) {
      setProduct(fProduct);
      // Parse the product_size string into an array
      if (fProduct.product_size) {
        const sizes = fProduct.product_size.split(",");
        setProductSizes(sizes);
        setSelectedSize(sizes[0]);
      }
      if (fProduct.product_color1) {
        const colors = fProduct.product_color1.split(",");
        setProductColors(colors);
        setSelectedColor(colors[0]);
      }
    }
  }, [id, products]);
  console.log("product size", productSizes);
  console.log("product color", productColors);

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const selectedProduct = {
      ...product,
      product_size: selectedSize,
      product_color1: selectedColor,
    };

    console.log("pro", selectedProduct);
    dispatch(addToCart(selectedProduct));

    toast.success("Item added to cart!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      navigate("/cart"); // Adjust the path based on your routing setup
    }, 2000);
  };
  const handleBuy = () => {
    const selectedProduct = {
      ...product,
      product_size: selectedSize,
      product_color1: selectedColor,
    };

    console.log("pro", selectedProduct);
    dispatch(addToCart(selectedProduct));
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setActiveSelection((prevState) => ({
      ...prevState,
      size: size,
    }));
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setActiveSelection((prevState) => ({
      ...prevState,
      color: color,
    }));
  };

  console.log("products send ", product);

  return (
    <>
      {loading ? (
        <section className="w-100 md:w-50 px-md-4">
          <Skeleton height={30} width={300} />
          <div className="d-flex align-items-center gap-4">
            <Skeleton height={20} width={100} />
            <Skeleton height={20} width={60} />
            <Skeleton height={20} width={80} />
          </div>
          <Skeleton height={30} width={100} />
          <div className="border-top pt-2">
            <Skeleton height={30} width={200} />
            <div className="d-flex gap-3">
              <Skeleton height={60} width={60} />
              <Skeleton height={60} width={60} />
              <Skeleton height={60} width={60} />
              <Skeleton height={60} width={60} />
              <Skeleton height={60} width={60} />
            </div>
          </div>
          <Skeleton height={30} width={200} />
          <div className="d-grid gap-4">
            <Skeleton height={30} width={60} />
            <Skeleton height={30} width={60} />
            <Skeleton height={30} width={60} />
            <Skeleton height={30} width={60} />
            <Skeleton height={30} width={60} />
          </div>
          <Skeleton height={30} width={200} />
          <Skeleton height={60} />
          <Skeleton height={30} width={200} />
          <Skeleton height={20} width={100} />
          <Skeleton height={20} width={100} />
          <Skeleton height={20} width={100} />
        </section>
      ) : (
        product && (
          <section className="w-100 md:w-50 px-md-4">
            <div className=" d-flex flex-column gap-1">
              {/* <div className="d-flex flex-column gap-1">
                <h2 style={{ textAlign: "justify" }}>{product.product_name}</h2>
                <div className="d-flex gap-4 align-items-center w-100">
                  <div className="d-flex align-items-center">
                    <StarRatings rating={product.product_ratings} />
                  </div>
                  <span className="small pt-1">2347 Reviews</span>
                  <span className="small pt-1">4873 sold</span>
                </div>
                <p className="fw-bold fs-3">
                  <sup>&#x20B9;</sup> {product.product_price}
                </p>
              </div> */}
              <div className="border-top h-100 d-flex flex-column gap-3">
                <div className="d-flex flex-column gap-1 pt-2">
                  {/* <h2 className="fw-semibold fs-5 text-start">{product.product_title} | Material: {product.material} | Color: {product.product_color1}</h2> */}
                  <h2 className="fs-5 text-start">
                    <span className="fw-semibold">{product.product_title}</span>{" "}
                    |
                    <span className="fw-semibold">
                      {" "}
                      {product.product_title}
                    </span>{" "}
                    |<span className="fw-bold"> Material:</span>{" "}
                    {product.material} |<span className="fw-bold"> Color:</span>{" "}
                    {product.product_color1}
                  </h2>
                  <p className="fw-bold fs-3">
                    <sup>&#x20B9;</sup> {product.product_price}
                  </p>
                  <div
                    className="d-flex gap-3 mx-1 mx-md-0"
                    style={{ height: "60px" }}
                  >
                    {Array.from({ length: 5 }).map(
                      (_, index) =>
                        product[`product_image${index + 1}`] && (
                          <div
                            key={index}
                            className="border rounded-2"
                            style={{
                              height: "100%",
                              width: "60px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleImageClick(index)}
                          >
                            {product &&
                              product[`product_image${index + 1}`] && (
                                <img
                                  src={product[`product_image${index + 1}`]}
                                  alt={`Image ${index + 1}`}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                  }}
                                />
                              )}
                          </div>
                        )
                    )}
                  </div>
                </div>
                {productColors.length > 0 && (
                  <div className="d-grid gap-1">
                    <h2 className="fw-semibold fs-5 text-start">
                      Available Colors
                    </h2>
                    <div
                      className="d-grid gap-4"
                      style={{
                        fontSize: "12px",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(35px, 1fr))",
                      }}
                    >
                      {productColors.map((color) => (
                        <button
                          key={color}
                          className={`border py-1 px-1 rounded text-center ${
                            activeSelection.color === color
                              ? "bg-primary text-white"
                              : "bg-body-secondary"
                          }`}
                          onClick={() => handleColorClick(color)}
                          style={{ width: "50px", height: "30px" }}
                        >
                          {color.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {productSizes.length > 0 && (
                  <div className="d-grid gap-1">
                    <h2 className="fw-semibold fs-5 text-start">
                      Available Size
                    </h2>
                    <div
                      className="d-grid gap-4"
                      style={{
                        fontSize: "12px",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(35px, 1fr))",
                      }}
                    >
                      {productSizes.map((size) => (
                        <button
                          key={size}
                          // className={`border py-1 px-1 rounded text-center ${
                          //   product.product_size === size
                          //     ? "bg-primary text-white"
                          //     : "bg-body-secondary"
                          // }`}
                          className={`border py-1 px-1 rounded text-center ${
                            activeSelection.size === size
                              ? "bg-primary text-white"
                              : "bg-body-secondary"
                          }`}
                          onClick={() => handleSizeClick(size)}
                          style={{
                            width: "50px",
                            height: "30px", // Optional: Remove outline when the button is focused
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="d-flex flex-column gap-1">
                  <div className="d-flex flex-column flex-md-row justify-content-between">
                    <h2 className="fs-4 text-start d-flex align-items-center">
                      Product Details
                    </h2>
                  </div>
                  <p className="fs-6" style={{ textAlign: "justify" }}>
                    {product.product_discription}
                  </p>
                  <h2 className="fs-4 text-start">Description</h2>
                  <p className="fs-6 line-clamp-2 fw-light">
                    {product.product_discription}
                  </p>
                </div>
                <div
                  className="d-flex gap-3 pb-1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    onClick={handleAddToCart}
                    className="btn btn-primary my-2  px-5"
                  >
                    Add to cart
                  </button>
                  <Link to="/checkout" style={{ width: "150px" }}>
                    <button
                      className="btn btn-primary   w-100"
                      onClick={handleBuy}
                    >
                      Buy Now
                    </button>
                  </Link>
                </div>
                {/* <div className="d-flex flex-column gap-1">
                  <h2 className="fs-4 text-start">Description</h2>
                  <ul className="list-unstyled d-flex flex-column gap-1 fs-6">
                    <li>
                      <span>→ </span>100% Cotton
                    </li>
                    <li>
                      <span>→ </span>32 Layer Print
                    </li>
                    <li>
                      <span>→ </span>Coloring Layer
                    </li>
                  </ul>
                </div> */}
                <div className="d-flex flex-column gap-1">
                  <h2 className="fs-4 text-start">Shipping Information</h2>
                  <ul
                    className="list-unstyled d-flex flex-column gap-1"
                    style={{ fontSize: "16px" }}
                  >
                    <li className="d-flex gap-4">
                      <span style={{ width: "80px" }}>Shipping: </span>
                      <span>Free Expeditions International</span>
                    </li>
                    <li className="d-flex gap-4">
                      <span style={{ width: "80px" }}>Estimated: </span>
                      <span>Estimated arrival on 17-20 March 2024</span>
                    </li>
                    <li className="d-flex gap-4">
                      <span style={{ width: "80px" }}>Delivery: </span>
                      <span>From Mumbai East</span>
                    </li>
                    <li className="d-flex gap-4">
                      <span style={{ width: "80px" }}>Payment: </span>
                      <div className="d-flex gap-2">
                        <img
                          src={paypalIcon}
                          alt="PayPal"
                          style={{ width: "20px" }}
                        />
                        <img
                          src={mastercardIcon}
                          alt="MasterCard"
                          style={{ width: "20px" }}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )
      )}
    </>
  );
}

export default RightSection;
