import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import myContext from "./context/MyContext";

function ResetPassword({ setLoginModal }) {
  const context = useContext(myContext);

  const { forgetPasswordModal, setForgetPasswordModal } = context;

  const [resetEmail, setResetEmail] = useState("");

  const [updatePasswordModal, setUpdatePasswordModal] = useState(false);
  const [founUserID, setFoundUserID] = useState("");

  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const closeForgetPasswordModal = () => {
    setForgetPasswordModal(false);
    setResetEmail("");
  };

  const closeUpdatePasswordModal = () => {
    setUpdatePasswordModal(false);
    setShowOTP(true);
  };

  const [timer, setTimer] = useState(30);
  const [sendOTPagain, setSendOTPagain] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [OTP, setOTP] = useState("");
  const [userData, setuserData] = useState(null);

  const [emailData, setEmailData] = useState({
    from: "minitgo@minitgo.com", // Initialize with an empty string or default if needed
    to: "",
    subject: "",
    text: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };
  async function handleEmail(resetEmail) {
    setTimer(150);
    setShowOTP(true);
    setSendOTPagain(true);

    try {
      const response = await fetch("https://minitgo.com/api/fetch_login.php");
      const results = await response.json();
      console.log("result",results);

        const foundUser = results.find((user) => user.email === emailData.to);
        console.log("founduser", foundUser);

        if (foundUser) {
          setFoundUserID(foundUser.id);
          setuserData(foundUser);
          console.log("founduser", foundUser);

          console.log("founduserid", founUserID);

          const newOTP = generateOTP();
          setOTP(newOTP);
          console.log("NEW OTP", newOTP);

          sendOTPtoEmail(newOTP);
          console.log("emaildata_to", emailData.to);

          const emailDataWithPhoneAndOTP = {
            ...emailData,
            to: foundUser.email, // Assuming emailData.to is set to the found user's email
            subject: `OTP: ${newOTP}`,
            text: `Your OTP is: ${newOTP}`,
          };

          console.log("emailDataWithPhoneAndOTP", emailDataWithPhoneAndOTP);

          try {
            const emailResponse = await axios.post(
              "http://localhost:3001/send-email",
              emailDataWithPhoneAndOTP
            );
            console.log(emailResponse.status);

            if (emailResponse.status === 200) {
              toast.success("Message successfully sent", {
                autoClose: 1000,
                hideProgressBar: true,
                onClose: () => {
                  // navigate('/'); // Uncomment if navigation is needed
                },
              });
            }
          } catch (error) {
            console.error("Error sending email:", error);
            toast.error("Error sending email: " + error.message, {
              autoClose: 1000,
              hideProgressBar: true,
            });
          }
        } else {
          console.log("User does not exist");
          toast.error("User does not exist", {
            autoClose: 1000,
            hideProgressBar: true,
          });
        }
      
    } catch (error) {
      console.error("Failed to fetch user information:", error);
      toast.error("Failed to fetch user information: " + error.message, {
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  }

  useEffect(() => {
    let intervalId;

    if (showOTP && sendOTPagain) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            // Stop the timer and reset sendOTPagain after 30 seconds
            clearInterval(intervalId);
            setSendOTPagain(false);
            return 30; // Reset the timer back to 30
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, [showOTP, sendOTPagain]);

  function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("GENERATED OTP:", otp);
    return otp.toString();
    // return otp
  }

  function handleOTP() {
    setTimer(30);
    setShowOTP(true);
    console.log("SHOW OTP", showOTP);
    setSendOTPagain(true);
    toast.success("OTP sent successfully", {
      autoClose: 1000,
      hideProgressBar: true,
    });
  }

  function sendOTPtoEmail(OTP) {
    if (OTP) {
      handleOTP();
    }
  }

  // function handleEmail(e) {
  //   e.preventDefault();

  //   console.log("RESET", resetEmail);
  //   axios
  //     .get("https://minitgo.com/api/fetch_login.php")
  //     .then((response) => {
  //       if (response.data && response.data.length > 0) {
  //         const allUsers = response.data;

  //         const foundUser = allUsers.find(
  //           (user) => user.email === resetEmail // Use resetEmail instead of data.email
  //         );

  //         if (foundUser) {
  //           setFoundUserID(foundUser.id)
  //           const newOTP = generateOTP();
  //           setOTP(newOTP)
  //           console.log("NEW OTP", newOTP);
  //           sendOTPtoEmail(newOTP);
  //         } else {
  //           console.log("User does not exist");
  //           toast.error("User does not exist", {
  //             autoClose: 1000,
  //             hideProgressBar: true,
  //           });
  //           return;
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch user information:", error);
  //     });
  // }

  function handleSendOTPAgain() {
    setSendOTPagain(true);
    const newOTP = generateOTP();
    setOTP(newOTP);
    sendOTPtoEmail(newOTP);
  }

  function verifySentOTP(e) {
    e.preventDefault();

    // Gather all the OTP input fields' values
    const otpInputs = document.querySelectorAll(".otp-input");
    let enteredOTP = "";

    otpInputs.forEach((input) => {
      enteredOTP += input.value;
    });

    console.log("ENTERED OTP:", enteredOTP);
    console.log("OTP:", OTP);

    if (enteredOTP === OTP) {
      setUpdatePasswordModal(true);
      toast.success("OTP verified Successfully", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      setShowOTP(false);
      return;
    } else {
      toast.error("Incorrect OTP", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }
  }

  async function hanldeUpdatePassword(e) {
    e.preventDefault();
    console.log("UPDATE", password);
    console.log("CONFIRMED", confirmedPassword);

    if (password === "" || confirmedPassword === "") {
      toast.error("All fields are required", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    } else if (
      (password.length < 8 || password.length > 12) &&
      (confirmedPassword.length < 8 || password.length > 12)
    ) {
      toast.error("Password must be between 8 and 12 characters long", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    } else if (password !== confirmedPassword) {
      toast.error("Both password must be same", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    } else {
      const updatedData = { ...userData, password };

      // console.log(updatePasswordData.id, updatePasswordData.password);
      console.log("updatedData",updatedData);
      

      axios
        .post(
          "https://minitgo.com/api/update_user.php",
          JSON.stringify(updatedData),
          {}
        )
        .then((response) => {
          console.log(response);

          if (
            response.data &&
            response.data.message === "Data updated successfully." &&
            response.data.status === true
          ) {
            console.log("RES", response.data);
            toast.success("Password Updated Successfully", {
              autoClose: 1000,
              hideProgressBar: true,
            });

            setShowOTP(false);
            setForgetPasswordModal(false);
            setUpdatePasswordModal(false);
            setLoginModal();
          } else {
            toast.error("Server Error", {
              autoClose: 1000,
              hideProgressBar: true,
            });
          }
        })
        .catch((error) => {
          console.error("Failed to updated password:", error);
        });
      // console.log("userdata",userData);
      
      // const updatedData = {
      //   id: userData.id, // Include only necessary fields
      //   password: password,
      //   // Add any other necessary fields from userData, but avoid spreading the entire object
      // };

      // try {
      //   const response = await fetch(
      //     "https://minitgo.com/api/update_user.php",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(updatedData), // This should now be safe to stringify
      //     }
      //   );

      //   const result = await response.json();

      //   if (response.ok) {
      //     toast.success("Password reset successfully!");

      //     // Clear user data and logout
      //     // localStorage.removeItem("user");
      //     // navigate("/");
      //   } else {
      //     toast.error("Error updating password: " + result.message);
      //   }
      // } catch (error) {
      //   toast.error("Error updating password: " + error.message);
      //   console.log("Error updating password: " + error.message);
      // }
    }
  }

  return (
    <div className=" w-100 ">
      {/* Email verificaiton start */}

      {updatePasswordModal ? (
        <Modal
          show={updatePasswordModal}
          onHide={closeUpdatePasswordModal}
          aria-labelledby="example-custom-modal-styling-title"
          className=" bg-opacity w-100 "
        >
          <Modal.Header closeButton style={{ backgroundColor: "#fff5f5" }}>
            <Modal.Title id="example-custom-modal-styling-title">
              Update Password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="p-0 rounded rounded-bottom rounded-4 d-flex w-100 "
            style={{ minWidth: "22rem", backgroundColor: "#fff5f5" }}
          >
            <div className=" px-4  py-5 m-0 w-100">
              <div className="text-center">
                <h4 style={{ fontWeight: "bold", fontSize: "30px" }}>
                  Reset Password
                </h4>
              </div>
              <div className="card-body mt-4">
                <form>
                  <div className="">
                    <label htmlFor="password">New Password</label>
                    <input
                      type="password"
                      className="form-control rounded-5 w-100"
                      id="password"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control rounded-5 w-100"
                      id="confirmPassword"
                      placeholder="Confirm new password"
                      value={confirmedPassword}
                      onChange={(e) => setConfirmedPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-l px-5 rounded-5 mt-3"
                    onClick={hanldeUpdatePassword}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <>
          {showOTP ? (
            <Modal show={showOTP} onHide={() => setShowOTP(false)}>
              <Modal.Header closeButton style={{ backgroundColor: "#fff5f5" }}>
                <Modal.Title>OTP Verification</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: "#fff5f5" }}>
                <p>OTP has been sent to {resetEmail}</p>
                <ul
                  className="d-flex gap-1  justify-content-start   p-0 "
                  style={{ listStyle: "none" }}
                >
                  <input
                    type="text"
                    className=" otp-input p-1 rounded-pill border text-center"
                    style={{ width: "30px", outline: "none" }}
                    maxLength={1}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        e.target.previousElementSibling
                      ) {
                        if (e.target.value === "") {
                          e.target.previousElementSibling.focus();
                        }
                      } else if (
                        e.key.length === 1 &&
                        e.target.nextElementSibling
                      ) {
                        if (e.target.value !== "") {
                          e.target.nextElementSibling.focus();
                        }
                      }
                    }}
                  />

                  <input
                    type="text"
                    className="otp-input p-1 rounded-pill border text-center"
                    style={{ width: "30px", outline: "none" }}
                    maxLength={1}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        e.target.previousElementSibling
                      ) {
                        if (e.target.value === "") {
                          e.target.previousElementSibling.focus();
                        }
                      } else if (
                        e.key.length === 1 &&
                        e.target.nextElementSibling
                      ) {
                        if (e.target.value !== "") {
                          e.target.nextElementSibling.focus();
                        }
                      }
                    }}
                  />

                  <input
                    type="text"
                    className="otp-input p-1 rounded-pill border text-center"
                    style={{ width: "30px", outline: "none" }}
                    maxLength={1}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        e.target.previousElementSibling
                      ) {
                        if (e.target.value === "") {
                          e.target.previousElementSibling.focus();
                        }
                      } else if (
                        e.key.length === 1 &&
                        e.target.nextElementSibling
                      ) {
                        if (e.target.value !== "") {
                          e.target.nextElementSibling.focus();
                        }
                      }
                    }}
                  />

                  <input
                    type="text"
                    className="otp-input p-1 rounded-pill border text-center"
                    style={{ width: "30px", outline: "none" }}
                    maxLength={1}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        e.target.previousElementSibling
                      ) {
                        if (e.target.value === "") {
                          e.target.previousElementSibling.focus();
                        }
                      } else if (
                        e.key.length === 1 &&
                        e.target.nextElementSibling
                      ) {
                        if (e.target.value !== "") {
                          e.target.nextElementSibling.focus();
                        }
                      }
                    }}
                  />

                  <input
                    type="text"
                    className="otp-input p-1 rounded-pill border text-center"
                    style={{ width: "30px", outline: "none" }}
                    maxLength={1}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        e.target.previousElementSibling
                      ) {
                        if (e.target.value === "") {
                          e.target.previousElementSibling.focus();
                        }
                      } else if (
                        e.key.length === 1 &&
                        e.target.nextElementSibling
                      ) {
                        if (e.target.value !== "") {
                          e.target.nextElementSibling.focus();
                        }
                      }
                    }}
                  />

                  <input
                    type="text"
                    className=" otp-input p-1 rounded-pill border text-center"
                    style={{ width: "30px", outline: "none" }}
                    maxLength={1}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        e.target.previousElementSibling
                      ) {
                        if (e.target.value === "") {
                          e.target.previousElementSibling.focus();
                        }
                      } else if (
                        e.key.length === 1 &&
                        e.target.nextElementSibling
                      ) {
                        if (e.target.value !== "") {
                          e.target.nextElementSibling.focus();
                        }
                      }
                    }}
                  />
                </ul>
                <div className="w-75 text-center fs-3">00:{timer}</div>
                <div className="mt-2 text-center" style={{ fontSize: "14px" }}>
                  Didn't get it?{" "}
                  {timer === 30 && (
                    <span
                      className="underline"
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={handleSendOTPAgain}
                    >
                      Send OTP Again
                    </span>
                  )}
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <button
                    className="btn btn-success px-4"
                    onClick={verifySentOTP}
                  >
                    Verify
                  </button>
                </div>
              </Modal.Body>
            </Modal>
          ) : (
            <Modal
              show={forgetPasswordModal}
              onHide={closeForgetPasswordModal}
              aria-labelledby="example-custom-modal-styling-title "
              className=" bg-opacity w-100 "
            >
              <Modal.Header
                closeButton
                style={{ backgroundColor: "#fff5f5" }}
              ></Modal.Header>
              <Modal.Body
                className="p-0 rounded rounded-bottom d-flex w-100 "
                style={{ minWidth: "22rem", backgroundColor: "#fff5f5" }}
              >
                <div className=" px-4  py-5 m-0 w-100">
                  <div className="text-center">
                    <h4 style={{ fontWeight: "bold", fontSize: "30px" }}>
                      Reset Password
                    </h4>
                  </div>
                  <div className="card-body mt-4">
                    <form>
                      <div className="">
                        <label htmlFor="resetEmail">Email address</label>
                        <input
                          type="email"
                          className="form-control rounded-5 w-100"
                          placeholder="Enter email"
                          name="to"
                          value={emailData.to}
                          onChange={handleChange}
                        />
                      </div>
                      <button
                        type="button"
                        style={{ whiteSpace: "nowrap", width: "250px" }}
                        className="btn btn-primary btn-l px-3 rounded-5 "
                        onClick={handleEmail}
                      >
                        Send Confirmation Code
                      </button>
                    </form>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          )}
        </>
      )}

      {/* Email verifcation end */}

      {/* 
      SendOTP starts here */}

      {/* Send OTP ends here */}

      {/* UpdatePassowrd starts here */}

      {/* UpdatePassowrd ends here */}
    </div>
  );
}

export default ResetPassword;
