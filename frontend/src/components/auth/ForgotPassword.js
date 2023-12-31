import React,{useEffect, useState} from "react";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";


const ForgotPassword = () => {

    const [email,setEmail] = useState("")

    const navigate = useNavigate()

   const [forgotPassword,{isLoading,error, isSuccess}] = useForgotPasswordMutation()

   const {isAuthenticated} = useSelector(state => state.auth)

   useEffect(() => {

    if(isAuthenticated) {
      navigate("/")
    }
    if(error) {
        toast.error(error?.data?.message)
    }

    if(isSuccess) {
        toast.success("Email Sent Successfully")
        navigate("/login")
    }

  }, [error, isAuthenticated, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    forgotPassword({email});
  };

  return (
    <>
    <MetaData title={"Forgot Password"} />
    <div className="row wrapper">
      <div className="col-10 col-lg-4">
        <form
          className="shadow rounded-5 bg-body"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4" style={{textAlign:"center"}}>Forgot Password</h2>
          <div className="mt-3">
            <label htmlFor="email_field" className="form-label">
              Enter Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control rounded-5"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            id="forgot_password_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
            style={{backgroundColor:"#232f3e",borderRadius:"20px",color:"#f6ae84"}}
          >
            {isLoading ? (
                <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Sending...</span>
              </div>
            ) : (
              "Send Email"
            )}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default ForgotPassword;
