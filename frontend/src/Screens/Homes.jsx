import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../custom/Button";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/user.context";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
// import axiosInstance from "../config/axios";

function Homes() {
  const navigate = useNavigate();
  const [openCreateProjectModal, setOpenCreateProjectModal] =
    React.useState(false);
  const [projectName, setProjectName] = React.useState("");

  const { user } = useContext(UserContext);

  console.log("user", user);



  function logoutHandler() {
    axiosInstance
      .get("/users/logout")
      .then((res) => {
        navigate("/login");
        toast.success("User Logged out Successfully");
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          toast.error(err.response.data.errors[0].msg);
        }
        console.error(err.response.data);
      });
  }

  function userDataUi() {
    return (
      <>
        <div className="w-full m-2 max-w-md p-8  bg-gray-800 rounded-lg shadow-lg flex  items-center justify-between">
          <h1 className="text-center text-2xl"> Welcome to - Own AI</h1>
          <Button
            className={
              "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            }
            onClick={logoutHandler}
          >
            {" "}
            Logout{" "}
          </Button>
        </div>

        <div className="w-full  max-w-md p-2 bg-gray-700 rounded-lg shadow-lg flex  items-center justify-between">
          <div>
            <h1 className="text-center pb-4 text-2xl"> User Profile </h1>
            <h2 className="text-gray-900 ">
              Full Name:
              <span className="text-white pl-3 text-center">
                {user?.fullName}
              </span>
            </h2>
            <h2 className="text-gray-900">
              Email:
              <span className="text-white pl-3 text-center">
                {user?.email}
              </span>{" "}
            </h2>
            <h2 className="text-gray-900">
              {" "}
              Phone Number:
              <span className="text-white pl-3 text-center">
                {user?.phoneNumber}
              </span>
            </h2>
          </div>
        </div>
      </>
    );
  }

  const inputRef = useRef(null);

  useEffect(() => {
    if (openCreateProjectModal) {
      inputRef.current.focus();
    }
  }, [openCreateProjectModal]);

const handleCreateProject = () => {
  if (!projectName) {
    toast.error("Please Enter Project Name");
    return;
  }

  axiosInstance
    .post("/projects/create", { name: projectName })
    .then((res) => {
      console.log(res.data);
      toast.success(`Your ${projectName} Project Created`);
      closeProjectModal();
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.errors) {
        toast.error(err.response.data.errors[0].msg);
      } else {
        toast.error("Something went wrong");
      }
      console.error(err.response);
    });
};


  const openProjectModal = () => {
    // Handle create project logic here
    setOpenCreateProjectModal(true);
  };

  const closeProjectModal = () => {
    setOpenCreateProjectModal(false);
    setProjectName("");
  };

  function createProjectUi() {
    return (
      <div className="fixed z-100 inset-0 flex items-center justify-center h bg-black bg-opacity-50">
        <div className="bg-gray-500  p-6 h-56 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex align-center justify-between mb-4">
            <h2 className="text-2xl mb-4">Create New Project</h2>
            <IoMdClose
              className="text-white text-2xl relative bottom-4 -right-4 cursor-pointer "
              onClick={closeProjectModal}
            />
          </div>

          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
            className="w-full border border-2 outline-none border-white p-2 mb-4  rounded"
            ref={inputRef}
          />

          <div className="flex justify-center mt-5 gap-8">
            <button
              onClick={handleCreateProject}
              className="bg-green-500 hover:bg-green-700 w-40 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
            <button
              onClick={closeProjectModal}
              className="bg-red-500 w-40 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5  min-h-screen bg-gray-900 text-white">
      <main className="p-4">
        {/* ----- Projects Section ---- */}
        <div className="projects">
          <button
            className="btn-project  p-2 border-2 border-gray-500 rounded-lg gap-2 cursor-pointer  flex items-center justify-between "
            onClick={() => openProjectModal()}
          >
            New Project <CiBookmarkPlus className="text-white  text-2xl" />
          </button>
        </div>
      </main>

      {openCreateProjectModal && createProjectUi()}
    </div>
  );
}

export default Homes;
