import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Filter from "../../components/Filter.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StarRatings from "../../components/ProductInfo/StarRatings.jsx";
import { useContext } from "react";
import myContext from "../../components/context/MyContext.js";
import cartIcon from "../../assets/cart-icon.svg";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import {
  addToCart,
  hideSnackbarForWishlist,
  showSnackbarForWishlist,
} from "../../components/redux/Slices/CartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {
  showSnackbar,
  hideSnackbar,
  addItemToWishlist,
} from "../../components/redux/Slices/CartSlice.js";
import { RxLapTimer } from "react-icons/rx";


const Accessories = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();
  const [selectedSizes, setSelectedSizes] = useState({});


  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFiltered, setCategoryFiltered] = useState([]);

  const [recommendedHeading, setRecommendedHeading] = useState(false);

  const context = useContext(myContext);
  const {
    selectedCategory,
    setSelectedCategory,
    accessoriesCategory,
    setAccessoriesCategory,
    products,
    selectedPrice,
    setSearchQuery,
    offer,
    isNewProduct,
  } = context;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const suggestedData = queryParams.get("suggestion");
  const category = queryParams.get("category");
  console.log("catagory",category);
  console.log("selected",selectedCategory);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleAddToCart = (product, index, selectedSize) => {
    // Ensure that the selected size is used, or default to the first size
    const size = selectedSize || product.product_size.split(",")[0];
    const color = product.product_color1.split(",")[0]; // Assuming color is managed similarly

    const productWithCoordinates = {
      ...product,
      product_size: size,
      product_color1: color,
      // coordinates,
    };

    dispatch(addToCart(productWithCoordinates));
    dispatch(showSnackbar({ message: "Product added successfully!", index }));

    // Wait for 1 second, then hide snackbar
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 1000);
  };
  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prevState) => ({
      ...prevState,
      [productId]: size,
    }));
  };

  // Handle add to cart click
  const handleAddToCartClick = (product, index) => {
    // Get the selected size, or default to the first size
    const selectedSize =
      selectedSizes[product.id] || product.product_size.split(",")[0];
    handleAddToCart(product, index, selectedSize);
  };

  // for wishlist button
  const [wishlistClicked, setWishlistClicked] = useState(
    Array(products.length).fill(false)
  );
  const handleWishListToCart = (product, index) => {
    const newWishlistClicked = [...wishlistClicked];
    newWishlistClicked[index] = !newWishlistClicked[index];
    setWishlistClicked(newWishlistClicked);

    dispatch(addItemToWishlist(product));
    dispatch(
      showSnackbarForWishlist({ message: "Item added to wishlist!", index })
    );
    setTimeout(() => {
      dispatch(hideSnackbarForWishlist());
    }, 1000); // Hide after 3 seconds
  };

  if (selectedCategory !== "") {
    const url = `/category?selectedCategory=${encodeURIComponent(
      selectedCategory
    )}`;
    navigate(url);
  }
  
  useEffect(() => {
    setSearchQuery("");
    setSelectedCategory("");
    let productsToFilter = products;
    console.log("selectcategory",selectedCategory);
    if (category) {
      if (category === 'Other') {
        productsToFilter = products.filter(product => 
          !['Men', 'Women', 'Kids'].some(term => 
            Object.values(product).some(value => 
              typeof value === 'string' && value.includes(term)
            )
          )
        );  
        console.log("other",productsToFilter);
      } else if (category === 'Offer') {
        productsToFilter = products.filter(product => 
          product.offers && product.offers > 0
        );
        console.log("offer",productsToFilter);
      } else if (category === 'BestDeals') {
        productsToFilter = products.filter(product => 
          product.offers && product.offers >= 50
        );
        console.log("bestDels",productsToFilter);
      } else {
        productsToFilter = products.filter(product => 
          product.category === category
        );
      }
    }
    if (
      accessoriesCategory === "Mens" ||
      accessoriesCategory === "Womens" ||
      accessoriesCategory === "Kids"
    ) {
      if (accessoriesCategory.toLowerCase() === "mens") {
        setSelectedCategory("");
        productsToFilter = productsToFilter.filter(
          (product) =>
            (product.category && product.category.toLowerCase().startsWith("men")) ||
            (product.product_name && product.product_name.toLowerCase().startsWith("men"))
        );
      } else if (accessoriesCategory.toLowerCase() === "womens") {
        setSelectedCategory("");
        productsToFilter = productsToFilter.filter(
          (product) =>
            (product.category && product.category.toLowerCase().includes("women")) ||
            (product.product_name && product.product_name.toLowerCase().includes("women"))
        );
      } else if (accessoriesCategory.toLowerCase() === "kids") {
        productsToFilter = productsToFilter.filter(
          (product) =>
            (product.category && product.category.toLowerCase().includes("kids")) ||
            (product.product_name && product.product_name.toLowerCase().includes("kids"))
        );
      }
    }
  
    
    // Apply price filtering

    let filtered = [...productsToFilter]; 
    console.log("filterd",filtered);// Copy the accessories products array

    if (selectedPrice !== "" && selectedPrice !== "500 +") {
      const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

      const withinRangeProducts = filtered.filter((product) => {
        const price = parseInt(product.product_price);
        return price >= minPrice && price <= maxPrice;
      });

      const aboveRangeProducts = filtered.filter((product) => {
        const price = parseInt(product.product_price);
        return price > maxPrice;
      });

      let combinedProducts = [...withinRangeProducts, ...aboveRangeProducts];

      combinedProducts.sort(
        (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
      );

      const remainingProducts = filtered.filter((product) => {
        if (selectedPrice !== "") {
          const [minPrice] = selectedPrice.split("-").map(Number);
          const price = parseInt(product.product_price);
          return price < minPrice;
        } else {
          return true; // Include all products if no price range is selected
        }
      });

      remainingProducts.sort(
        (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
      );

      filtered = [...combinedProducts, ...remainingProducts];
    }

    if (selectedPrice === "500 +") {
      console.log("above 500");
      const above500Products = filtered.filter((product) => {
        const price = parseInt(product.product_price);
        return price >= 500;
      });

      above500Products.sort(
        (a, b) => parseFloat(b.product_price) - parseFloat(a.product_price)
      );

      const remainingProducts = filtered.filter((product) => {
        if (selectedPrice !== "") {
          let minPrice = 500;
          console.log("ELSE MIN", minPrice);
          const price = parseInt(product.product_price);
          return price < minPrice;
        } else {
          return true; // Include all products if no price range is selected
        }
      });
      console.log("ELSE REMAINING PROD", remainingProducts);

      remainingProducts.sort(
        (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
      );

      if (above500Products.length > 0) {
        filtered = [...above500Products, ...remainingProducts];
      } else {
        filtered = filtered;
      }
    }

    if (offer !== "") {
      const selectedOffer = parseInt(offer);

      const filteredByOffer = filtered.filter((product) => {
        // Assuming 'product_offer' is the property containing offer percentage
        const offerPercentage = parseInt(product.offers);
        return offerPercentage >= selectedOffer;
      });

      filteredByOffer.sort(
        (a, b) => parseFloat(a.offers) - parseFloat(b.offers)
      );

      filtered = filteredByOffer;
    }

    // If no products match the filters, set filtered products to all accessories of the selected category
    if (filtered.length === 0) {
      filtered = [...productsToFilter];
      filtered.sort(
        (a, b) => parseFloat(a.product_price) - parseFloat(b.product_price)
      );
    }

    // setFilteredProducts(filtered);
    const shuffledProducts = shuffleArray(filtered);
    setFilteredProducts(shuffledProducts);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer);

  }, [products, selectedPrice, accessoriesCategory,category]);

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  const userCords = user ? [user.lat, user.log] : null;
  const calculateDistance = (startLat, startLng, destLat, destLng) => {
    if (!startLat || !startLng || !destLat || !destLng) return Infinity;

    const degToRad = (degrees) => {
      return (degrees * Math.PI) / 180;
    };

    const startLatRad = degToRad(Number(startLat));
    const startLngRad = degToRad(Number(startLng));
    const destLatRad = degToRad(Number(destLat));
    const destLngRad = degToRad(Number(destLng));

    const earthRadius = 6371; // Radius of the Earth in kilometers

    const latDiffRad = destLatRad - startLatRad;
    const lngDiffRad = destLngRad - startLngRad;

    const a =
      Math.sin(latDiffRad / 2) * Math.sin(latDiffRad / 2) +
      Math.cos(startLatRad) *
        Math.cos(destLatRad) *
        Math.sin(lngDiffRad / 2) *
        Math.sin(lngDiffRad / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceInKm = earthRadius * c;

    console.log(
      `UserLat: ${startLat}, UserLong: ${startLng}, ProductLat: ${destLat}, ProductLong: ${destLng}`
    );
    console.log(distanceInKm.toFixed(2));
    return distanceInKm.toFixed(2);
  };

  return (
    <>
      <br />
      <br />
      {/* we are coming soon */}
      <div className="container">
        <h6>
          |<FaLocationDot className="fs-3 p-1" />
          Find Near You{" "}
        </h6>
        <div className="row">
          <Filter brand="Test" />

          <div className="col-md-10">
            <div className="row">
              {loading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="col-6 col-sm-4 col-md-6 col-lg-4 col-xl-3 py-2"
                  >
                    <Skeleton height={200} />
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={20} width="60%" />
                    <Skeleton height={20} width="40%" />
                    <Skeleton height={20} width="30%" />
                  </div>
                ))
              ) :filteredProducts.length === 0 ? (
                <div className="col-12 text-center py-5">
                  <h5>MINITGO is cooming soon with the  {category}.</h5>
                </div>
              ) :(
              filteredProducts?.map((product, index) => (
                <div
                  key={index}
                  className="col-6 col-sm-4 col-md-6 col-lg-4 col-xl-3 py-2"
                >
                  <div className="product-card">
                    <a
                      href={`/${product.pid}`}
                      target="_blank"
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      {/* update code by ganesh */}
                      <div
                        className="product-image"
                        style={{ position: "relative" }}
                      >
                        <img src={product.product_image1} alt="Product 1" />
                        <div
                          className="offer-tag text-center p-1 text-bold mt-2"
                          style={{
                            position: "absolute",
                            bottom: "15px",
                            right: "15px",
                            fontSize: "0.8rem",
                            padding: "1rem",
                            textDecorationColor: "HighlightText",
                            border: "2px solid",
                            borderRadius: "50px",
                            fontWeight: "bold",
                            backgroundColor:
                              product.offers === "0" ? "" : "#e8d9b7",
                            opacity: product.offers === "0" ? 0 : 0.5,
                          }}
                        >
                          {product.offers === "0"
                            ? "No Offer"
                            : `${product.offers}% Off`}
                        </div>
                      </div>
                      {/* code end by ganesh */}

                      <div className="product-content d-flex flex-column gap-1 pt-3  ">
                           
                            <div
                              style={{ fontSize: "14px" }}
                              className="d-flex justify-content-between"
                            >
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  justifyContent: "space-between",
                                  // gap:"20px"
                                }}
                              >
                                <span
                                  className="line-clamp-1"
                                  style={{ width: "50%" }}
                                >
                                  {product.client_name}
                                </span>
                                <span>
                                  <RxLapTimer style={{ marginRight: "5px" }} />
                                  <span style={{ color: "orange" }}>
                                    36 min
                                  </span>
                                </span>
                              </div>
                              <div>
                                {isNewProduct(product.date) && (
                                  <span
                                    className="btn  btn-secondary p-0 px-1"
                                    style={{
                                      color: "#ffc107",
                                      fontSize: "14px",
                                    }}
                                  >
                                    New
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* code start by ganesh */}
                          </div>
                          <div className="flex-container ">
                            <h6 className="fs-9 text-start">
                              <span className="fw-semibold">
                                {product.product_title}
                              </span>{" "}
                              |<span className="fw-bold"> Color:</span>{" "}
                              {product.product_color1} |
                              <span className="fw-bold">
                                {" "}
                                {product.material}
                              </span>{" "}
                            </h6>

                            <h5 className="mt-1 flext-item  ">
                              ₹{product.product_price}
                              <span className="text-decoration-line-through text-muted fs-6 fw-light">
                                599
                              </span>
                              <span
                                className="text-muted"
                                style={{
                                  fontSize: "13px",
                                }}
                              >
                                {" "}
                                {/* {product.product_stock} */}
                              </span>
                            </h5>
                            {/* code end by ganesh */}
                            <div>
                              <span
                                className=" fw-bold"
                                style={{ fontSize: "12px" }}
                              >
                                Available size:
                              </span>{" "}
                              {product.product_size.includes(",") ? (
                                <select
                                  className="px-1"
                                  style={{
                                    backgroundColor: "#d9725f",
                                    fontSize: "0.875rem",
                                    borderRadius: "5px",
                                  }}
                                  onChange={(e) =>
                                    handleSizeChange(product.id, e.target.value)
                                  }
                                  value={
                                    selectedSizes[product.id] ||
                                    product.product_size.split(",")[0]
                                  }
                                >
                                  {product.product_size
                                    .split(",")
                                    .map((size, index) => (
                                      <option key={index} value={size}>
                                        {size}
                                      </option>
                                    ))}
                                </select>
                              ) : (
                                <span
                                  className="px-1"
                                  style={{
                                    backgroundColor: "#d9725f",
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  {product.product_size}
                                </span>
                              )}
                            </div>
                            <div>
                              <span
                                className=" fw-bold"
                                style={{
                                  fontSize: "12px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "10px",
                                }}
                              >
                                {product.product_stock <= 1
                                  ? "Only one left"
                                  : "In stock"}
                                <div
                                  style={{
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    background: "#d9725f",
                                  }}
                                ></div>
                              </span>
                            </div>
                          </div>
                          {cart.snackbar.open &&
                          cart.snackbar.index === index && (
                            <div
                              style={{ fontSize: "12px" }}
                              className="border text-center rounded w-75 mx-auto"
                            >
                              {cart.snackbar.message}
                            </div>
                          )}
                        {/* </a> */}
                    </a>

                    <div className="cart-btn px-1">
                    <button
                          onClick={() => handleAddToCartClick(product, index)}
                          className="btn btn-primary my-2   px-2 "
                      >
                        Add to cart
                      </button>
                    <button
                            className={`btn ${
                              wishlistClicked[index]
                                ? "btn-success"
                                : "btn-primary"
                            } w-21 my-2`}
                            // style={{ height: "20px", fill: "white" }}
                            onClick={() => handleWishListToCart(product, index)}
                          >
                            ❤
                          </button>
                      
                    </div>
                  </div>
                </div>
              )))}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default Accessories;
