import Dropdown from "react-bootstrap/Dropdown";
import cartIcon from "../assets/cart-icon.svg";
import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../components/redux/Slices/CartSlice.js";
import { FiFilter } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";

import Filter from "./Filter.jsx";
import myContext from "./context/MyContext";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaLocationCrosshairs } from "react-icons/fa6";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

export default function Catlog({ latitude, longitude }) {
  const [mobileView, setMobileView] = useState(false);
  const totalQuantity = useSelector(selectTotalQuantity);
  const [addressDisplay, setAddressDisplay] = useState("");
  const context = useContext(myContext);

  const { products, addressStore, officeAddressStore, loginSuccess } = context;
  const [selectedAddress, setSelectedAddress] = useState(addressStore);
  const signInData = localStorage.getItem("user");
  const parsedSignInData = JSON.parse(signInData)|| {};
  const fullAddress = parsedSignInData?.Address || '';
  const addressWords = fullAddress.split(``);
  console.log("addresswords",addressWords);
  
  const truncatedAddress = `${addressWords.slice(0, 15).join('')}...`;

  console.log(truncatedAddress);
  

  console.log("parsedSignInData", parsedSignInData);
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [locality, setLocality] = useState("");
  // const fetchAddress = async (lat, lng) => {
  //   const apiKey = "cF25ivfihp3P9dJIhL3mUOTgeCqKjAhb";
  //   const url = `https://api.geocodify.com/v2/reverse?api_key=${apiKey}&lat=${lat}&lng=${lng}`;

  //   try {
  //     const response = await axios.get(url);
  //     console.log("response", response);
  //     const data = response.data;
  //     console.log("address details", data);

  //     if (
  //       data &&
  //       data.response &&
  //       data.response.features &&
  //       data.response.features.length > 0
  //     ) {
  //       // Loop through each feature in the array
  //       for (const feature of data.response.features) {
  //         const address = feature.properties;

  //         if (address.postalcode) {
  //           console.log("Postal code found:", address.postalcode);
  //           return {
  //             name: address.name || "",
  //             houseNumber: address.house_number || "",
  //             neighbourhood: address.neighbourhood || "",
  //             street: address.street || "",
  //             pincode: address.postalcode || "",
  //             country: address.country || "",
  //             county: address.county || "",
  //             region: address.region || "",
  //             locality: address.locality || "",
  //           };
  //         }
  //       }

  //       console.log("No postal code found in any of the address objects.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching address:", error);
  //   }
  //   return null;
  // };
  const fetchAreaData = async () => {
    try {
      const response = await axios.get("https://minitgo.com/api/areas.php");
      return response.data;
    } catch (error) {
      console.error("Error fetching area data:", error);
      return [];
    }
  };
  const fetchAddress = async (lat, lng) => {
    const apiKey = "cF25ivfihp3P9dJIhL3mUOTgeCqKjAhb";
    const url = `https://api.geocodify.com/v2/reverse?api_key=${apiKey}&lat=${lat}&lng=${lng}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (
        data &&
        data.response &&
        data.response.features &&
        data.response.features.length > 0
      ) {
        for (const feature of data.response.features) {
          const address = feature.properties;

          if (address.postalcode) {
            const fetchedAddress = {
              name: address.name || "",
              label: address.label || "",
              street: address.street || "",
              pincode: address.postalcode || "",
              country: address.country || "",
              county: address.county || "",
              region: address.region || "",
              locality: address.locality || "",
            };

            // Fetch area data and check availability
            const areaData = await fetchAreaData();
            const matchingArea = areaData.find(
              (area) =>
                area.pincode === fetchedAddress.pincode 
                // area.colony.toLowerCase() ===
                //   fetchedAddress.neighbourhood.toLowerCase()
            );

            if (!matchingArea) {
              // toast.error("Minitgo is not available in this area.");
              console.log("Minitgo is not available in this area.");
              
            } else {
              // Process the fetched address as needed
              console.log("Fetched address:", fetchedAddress);
            }

            return fetchedAddress;
          }
        }
      }

      console.log("No postal code found in any of the address objects.");
    } catch (error) {
      console.error("Error fetching address:", error);
    }

    return null;
  };

  useEffect(() => {
    if (latitude && longitude) {
      const fetchAndSetAddress = async () => {
        const fetchedAddress = await fetchAddress(latitude, longitude);
        if (fetchedAddress) {
          setStreet(fetchedAddress.name);

          // Concatenate the fetched address into a single string
          const fullAddress = `${fetchedAddress.label},${fetchedAddress.pincode}`;

          // Split the full address into an array of words
          const addressWords = fullAddress.split("");

          // Get the first two words and set them as the address
          const truncatedAddress = addressWords.slice(0, 15).join("") + "...";
          console.log(truncatedAddress);
          
          // const storedUserData = JSON.parse(localStorage.getItem("user")) || {};

          // Update only the address field
          // storedUserData.address = truncatedAddress;

          // Store the updated user data back in localStorage
          // localStorage.setItem("user", JSON.stringify(storedUserData));
          setAddress(truncatedAddress);
          console.log("turncatedAddress",address);
          

          // Set the other address components
          setPincode(fetchedAddress.pincode);
          setCountry(fetchedAddress.country);
          setRegion(fetchedAddress.region);
          setLocality(fetchedAddress.locality);

          // Optionally, setIsLocationFetched(true) or truncateText("addressDisplay", 2)
        }
      };

      fetchAndSetAddress().catch((err) => {
        console.error("Failed to fetch location:", err.message);
        // Optionally, setError(err.message);
      });
    }
  }, [latitude, longitude]);

  const location = useLocation();
  const showFilter = () => {
    useEffect(() => {
      const display =
        selectedAddress === officeAddressStore
          ? officeAddressStore
          : addressStore;

      setAddressDisplay(display);
    }, [selectedAddress, addressStore, officeAddressStore]);

    return (
      location.pathname === "/products" ||
      location.pathname === "/mens-category" ||
      location.pathname === "/womens-category" ||
      location.pathname === "/accessories" ||
      location.pathname === "/category"
    );
  };

  const locationHy = useLocation();
  const showHyDropdown = () => {
    const regexPattern = /^\/\d+$/; // Adjust the pattern if your :id is not purely numeric

    // Check if location pathname is not '/signin' or '/register'
    return (
      locationHy.pathname === "/" ||
      // locationHy.pathname === "/mens-category" ||
      // location.pathname === "/womens-category" ||
      // location.pathname === "/accessories" ||
      // location.pathname === "/category" ||
      location.pathname === "/about" ||
      location.pathname === "/connect" ||
      location.pathname === "/orders" ||
      location.pathname === "/updates" ||
      location.pathname === "/partner" ||
      location.pathname === "/contact" ||
      location.pathname === "/help" ||
      location.pathname === "/checkout" ||
      location.pathname === "/cart" ||
      regexPattern.test(location.pathname) || // Matches paths like "/123", "/456", etc.

      // location.pathname === `/:${id}` ||
      location.pathname === "/blog"
    );
  };

  // State to manage the dropdown title
  const locationHY = (
    <>
      <CiLocationArrow1 /> Hyderabad
    </>
  );

  const [dropdownTitle, setDropdownTitle] = useState(locationHY);

  // Function to handle the dropdown item click
  const handleDropdownItemClick = (option) => {
    // Update the dropdown title based on the selected item
    setDropdownTitle(option);
  };

  const handleAddressTypeChange = (addressType) => {
    setSelectedAddress(addressType);
  };
  const displayAddress = parsedSignInData?.address ? parsedSignInData.address : address;

  return (
    <>
      <div className="catlog filter ">
        {/* code start by ganesh  */}
        <div className="inr-catlog catlog-names  text-center  container-fluid px-0">
          <div className="nav-link  cat-nav hidden md:flex pd-2 d-none d-md-flex justify-content-evenly w-100      new-catlog align-items-center">
            {/* code end by ganesh */}
            <div className="dropdown  rounded text-white">
              <p className="btn  m-0 " type="button">
                <FaLocationDot
                  className="fs-4 p-1 mb-1"
                  style={{ color: "white" }}
                />
                {/* <span > Delivery Address</span> */}

                <span
                  id="addressDisplay"
                  style={{ color: "#dfd7d7", fontSize: "16px" }}
                >
                  {/* {parsedSignInData.Address} */}
                  {/* {parsedSignInData?.address || address} */}
                  {/* {truncatedAddress || address} */}
                  {parsedSignInData?.Address ? truncatedAddress : address}
                  </span>
              </p>
              {/* <ul className="dropdown-menu" aria-labelledby="locationDropdown">
                <li>
                  <a className={`dropdown-item ${addressDisplay && selectedAddress === addressStore ? 'active' : ''}`} href="#" onClick={() => handleAddressTypeChange(addressStore)}>

                    <span   >Home Address</span><br />
                    <FaLocationDot className="fs-5 p-1 mb-1" />
                    {addressStore}
                  </a>
                </li>
                <li>
                  <a className={`dropdown-item ${addressDisplay && selectedAddress === officeAddressStore ? 'active' : ''}`} href="#" onClick={() => handleAddressTypeChange(officeAddressStore)}>
                    <span className="">Office Address</span><br />
                    <FaLocationDot className="fs-5 p-1 mb-1" />
                    {officeAddressStore}
                  </a>
                </li>
              </ul> */}
            </div>
            {/* added [fontSize: "16px", textDecoration:"none" ,paddingTop:"2px",fontWeight:"bolder"] by sonali */}
            <Link
              to={{ pathname: "/accessories", search: `?category=Accessories` }}
              style={{
                color: "#dfd7d7",
                fontSize: "16px",
                textDecoration: "none",
                paddingTop: "2px",
                fontWeight: "bolder",
              }}
            >
              <span className="mt-3 ">Fashion</span>
            </Link>
            <Link
              to={{
                pathname: "/mens-category",
                search: `?category=Men's Fashion`,
              }}
              style={{
                color: "#dfd7d7",
                fontSize: "14px",
                textDecoration: "none",
                paddingTop: "2px",
                fontWeight: "bolder",
              }}
            >
              {" "}
              <span className="mt-1  ">Mens</span>
            </Link>
            <Link
              to={{
                pathname: "/womens-category",
                search: `?category=Women's Fashion`,
              }}
              style={{
                color: "#dfd7d7",
                fontSize: "14px",
                textDecoration: "none",
                paddingTop: "2px",
                fontWeight: "bolder",
              }}
            >
              <span className="mt-1 ">Women's Kids</span>
            </Link>
            {/* <Link
              style={{ color: "#dfd7d7", fontSize: "14px", textDecoration: "none", paddingTop: "2px", fontWeight: "bolder" }}
            ><span className="mt-1 ">others</span></Link> */}
            <Link
              to={{
                pathname: "/accessories",
                search: `?category=Other`,
              }}
              style={{
                color: "#dfd7d7",
                fontSize: "14px",
                textDecoration: "none",
                paddingTop: "2px",
                fontWeight: "bolder",
              }}
            >
              <span className="mt-1 ">Other</span>
            </Link>
            <Link
              to={{
                pathname: "/accessories",
                search: `?category=BestDeals`,
              }}
              style={{
                color: "#dfd7d7",
                fontSize: "14px",
                textDecoration: "none",
                paddingTop: "2px",
                fontWeight: "bolder",
              }}
            >
              <span className="mt-1 ">Best deals</span>
            </Link>
            <Link
              to={{
                pathname: "/accessories",
                search: `?category=Offer`,
              }}
              style={{
                color: "#dfd7d7",
                fontSize: "14px",
                textDecoration: "none",
                paddingTop: "2px",
                fontWeight: "bolder",
              }}
            >
              {" "}
              <span className="mt-1 ">Offers</span>
            </Link>
          </div>

          {/* Add the image and dropdown for mobile view */}
          {showHyDropdown() && (
            //   {/* // code start by ganesh */}
            //   <div className="dropdown d-down ">
            //     {/* code end by ganesh */}
            //     <button className="btn dropdown-toggle " type="button" id="mobileLocationDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            //       {/* {parsedSignInData.address} */}
            //     </button>
            //     <ul className="dropdown-menu" aria-labelledby="mobileLocationDropdown">
            //       <li><a className="dropdown-item" href="#">Hyderabad</a></li>
            //       <li><a className="dropdown-item" href="#">Mumbai</a></li>
            //       <li><a className="dropdown-item" href="#">Delhi</a></li>
            //       <li><a className="dropdown-item" href="#">Banglore</a></li>
            //     </ul>

            //   </div>
            //   {/* <span>
            //     <img src="https://cdn.pixabay.com/photo/2016/11/21/16/55/high-heels-1846436_640.jpg" className="m-0 p-0 homeCatlogImg" style={{ height: "4rem", width: "12rem" }} />
            //   </span> */}
            //
            <div className="dropdown nav-link cat-nav d-md-none d-flex justify-content-between w-100 align-items-center text-white">
              <div className="dropdown  rounded text-white">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="locationDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {parsedSignInData ? (
                    <>
                      <FaLocationDot className="fs-4 p-1 text-white" />
                      <span
                        id="addressDisplay"
                        className="fw-bold"
                        style={{ color: "#fff", fontSize: "0.8rem" }}
                      >
                        {" "}
                        {address.length > 10
                          ? address.substring(0, 12) + "..."
                          : address}
                      </span>
                    </>
                  ) : (
                    <>
                      <FaLocationDot className="fs-4 p-1 text-white" />
                      <span
                        id="addressDisplay"
                        className="fw-bold"
                        style={{ color: "#fff", fontSize: "0.8rem" }}
                      >
                        Hyderabad
                      </span>
                    </>
                  )}
                </button>
                {/* <ul className="dropdown-menu" aria-labelledby="locationDropdown">
                <li>
                  <a className={`dropdown-item ${addressDisplay && selectedAddress === addressStore ? 'active' : ''}`} href="#" onClick={() => handleAddressTypeChange(addressStore)}>

                    <span   >Home Address</span><br />
                    <FaLocationDot className="fs-5 p-1 mb-1" />
                    {addressStore}
                  </a>
                </li>
                <li>
                  <a className={`dropdown-item ${addressDisplay && selectedAddress === officeAddressStore ? 'active' : ''}`} href="#" onClick={() => handleAddressTypeChange(officeAddressStore)}>
                    <span className="">Office Address</span><br />
                    <FaLocationDot className="fs-5 p-1 mb-1" />
                    {officeAddressStore}
                  </a>
                </li>
              </ul> */}
              </div>
              <Link style={{ textDecoration: "none" }} to={"/products"}>
                <span
                  className=" text-white fw-bold"
                  style={{ fontSize: "0.8rem" }}
                >
                  Find near you
                </span>
              </Link>
              <Link style={{ textDecoration: "none" }} to={"/increase"}>
                <span
                  className="text-white fw-bold"
                  style={{ fontSize: "0.8rem", paddingRight: "30px" }}
                >
                  Become partner
                </span>
              </Link>
            </div>
          )}

          {/* Add the filter button for mobile view */}
          {showFilter() && (
            // code start by ganesh
            <div className=" filter-btn ">
              <button
                className="btn  rounded-pill px-4"
                data-bs-toggle="modal"
                data-bs-target="#filterModal"
                onClick={() => setMobileView(true)}
              >
                Filter
              </button>
              <Link style={{ textDecoration: "none" }} to={"/products"}>
                <span
                  className=" text-white fw-bold"
                  style={{ fontSize: "0.8rem" }}
                >
                  Find near you
                </span>
              </Link>
              <Link style={{ textDecoration: "none" }} to={"/increase"}>
                <span
                  className="text-white fw-bold"
                  style={{ fontSize: "0.8rem", paddingRight: "30px" }}
                >
                  Become partner
                </span>
              </Link>
            </div>

            // code end by ganesh
          )}
        </div>

        {/* filter modal */}
        <div
          className="modal fade bottom"
          id="filterModal"
          tabIndex="-1"
          aria-labelledby="filterModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable filter-modal">
            <div className="modal-content">
              <div className="modal-header btn_close">
                <h5 className="modal-title" id="filterModal">
                  Filter
                </h5>
                <button
                  type="button"
                  className="btn_inner"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Save
                </button>
              </div>
              <div className="modal-body">
                <Filter mobileView={mobileView} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal end */}
    </>
  );
}
