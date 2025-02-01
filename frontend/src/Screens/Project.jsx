import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MdGroups2 } from "react-icons/md";
import { IoAddCircle, IoAddSharp, IoSend } from "react-icons/io5";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { IoIosPersonAdd, IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axiosInstance from "../config/axios";

const messages = [
  { id: 1, text: "Hello!", sender: "Alice" },
  { id: 2, text: "Hi there!", sender: "Bob" },
  { id: 3, text: "How are you?", sender: "Alice" },
  {
    id: 4,
    text: "I'm good, thanks! How about you? helllo saklj I'm good, thanks! How about you? helllo saklj I'm good, thanks! How about you?  ",
    sender: "Bob",
  },
  { id: 1, text: "Hello!", sender: "Alice" },
  { id: 2, text: "Hi there!", sender: "Bob" },
  { id: 3, text: "How are you?", sender: "Alice" },
  {
    id: 4,
    text: "I'm good, thanks! How about you? helllo saklj I'm good, thanks! How about you? helllo saklj I'm good, thanks! How about you?  ",
    sender: "Bob",
  },
];

function Project() {
  const [textMessage, setTextMessage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [openCreateProjectModal, setOpenCreateProjectModal] =
    React.useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [users, setUser] = useState([]);
  const [thisProjectData, setThisProjectData] = useState([]);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const openProjectModal = () => {
    // Handle create project logic here
    setOpenCreateProjectModal(true);
  };

  const closeProjectModal = () => {
    setOpenCreateProjectModal(false);
  };

  useEffect(() => {
    axiosInstance
      .get("users/all")
      .then((res) => {
        // console.log("res all user", res.data.users);
        if (Array.isArray(res.data.users)) {
          setUser(res.data.users);
        } else {
          console.error("Expected 'users' to be an array");
        }
      })
      .catch((err) => {
        console.error("Error fetching users", err);
      });
  }, []);
  useEffect(() => {
    axiosInstance
      .get(`/projects/project/${projectId}`,
    )
      .then((res) => {
        
          console.log("resdata", res.data.project.users);
          setThisProjectData(res.data?.project?.users);
        
      })
      .catch((err) => {
        console.error("Error fetching users", err);
      });
  }, []);

console.log("thiss", thisProjectData);

  console.log("user res", users);

  // console.log("selec", selectedUserId);

  const projectId = useParams().id;
  console.log(projectId);

  const projectData = useLocation().state;
  console.log("projetData", projectData);
  console.log("projetData users", projectData.users);

  function sideSectionHeaderUI() {
    return (
      <header className="flex p-2 px-2 w-full bg-blue-500 justify-between items-center ">
        <div className="text-black font-medium capitalize text-xl ">
          {projectData?.name}
        </div>
        <div className="flex gap-2">
          <div
            className="p-2 rounded-full cursor-pointer bg-gray-200 "
            onClick={togglePanel}
          >
            <MdGroups2 className="text-black text-2xl" />
          </div>
          <div
            className="w-10  flex justify-center items-center rounded-full cursor-pointer bg-gray-200 "
            onClick={openProjectModal}
          >
            <IoIosPersonAdd className="text-black text-xl" />
          </div>
        </div>
      </header>
    );
  }

  function chatSendingArea() {
    return (
      <>
        <div className="message-box  border-t-[1.5px] absolute w-full border-y-neutral-800 bottom-0 shadow-lg">
          <div className="input-feild flex relative">
            <input
              type="text"
              value={textMessage}
              placeholder="Enter message"
              onChange={(e) => setTextMessage(e.target.value)}
              className="bg-blue-500 outline-none
              pl-2 text-black placeholder:text-black placeholder:text-md w-full h-10"
            />
            <div className="absolute bottom-[11px] pr-2 right-0 flex justify-center  ">
              <button>
                <IoSend className="text-black cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  function chatBoxArea() {
    return (
      <div className="flex flex-col  max-h-[90vh] p-4  bg-blue-300 w-80 overflow-y-auto">
        <div className="flex-1">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-5 ${
                message.sender === "Alice" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`font-bold ${
                  message.sender === "Alice"
                    ? "text-blue-600"
                    : "text-green-600"
                }`}
              >
                {message.sender}
              </div>
              <div
                className={`inline-block p-2 rounded-lg mb-[1px] ${
                  message.sender === "Alice" ? "bg-blue-600" : "bg-green-400"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }


  const handleUserSelect = (userId) => {
    setSelectedUserId([...selectedUserId, userId]);
  };

  const handleAddCollaborator = () => {
    if (selectedUserId.length > 0) {
      console.log("Selected User IDs:", selectedUserId);
     
      // setSelectedUserId([]);
      axiosInstance
      .put("/projects/add-user", {
        projectId: projectId,
        users: Array.from(selectedUserId),
      })
      .then((res) => {
        console.log("res", res.data);
        toast.success(`Collaborators added successfully!`);
        closeProjectModal();
        // closeProjectModal();
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      toast.error("Please select at least one user to add as a collaborator!");
      closeProjectModal();
      setSelectedUserId([]);
    }
  };

  function createProjectUi() {
    if (users) {
      return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-gray-500 max-h-96 p-6 rounded-lg shadow-lg max-w-md w-full overflow-y-auto">
            <div className="flex align-center justify-between mb-4">
              <h2 className="text-2xl mb-4 text-white">
                Add User To Collaborate
              </h2>
              <IoMdClose
                className="text-white text-2xl cursor-pointer"
                onClick={closeProjectModal}
              />
            </div>

            {/* User List */}
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user?._id}
                  className={`flex gap-2 items-center p-2 text-black bg-white rounded-lg shadow-md w-full hover:bg-gray-300 cursor-pointer
                    
                      ${
                        Array.from(selectedUserId).indexOf(user._id)
                          ? "bg-gray-300"
                          : ""
                      } ${
                    selectedUserId.indexOf(user._id) !== -1
                      ? "bg-gray-300"
                      : "bg-white"
                  }
                  `}
                  onClick={() => handleUserSelect(user._id)}
                >
                  <FaUserCircle className="text-xl" />
                  <li className="text-lg font-medium list-none">
                    {user?.email}
                  </li>
                </div>
              ))}
            </div>

            {/* Add Collaborator Button */}
            <div className="flex justify-center mt-5 gap-8">
              <button
                onClick={handleAddCollaborator}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Collaborators
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return <p>Loading users...</p>;
    }
  }

  function sideUserselectionPlannel() {
    return (
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-slate-400 shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold"> Project contributions </h2>
          <button className="cursor-pointer" onClick={togglePanel}>
            <FaTimes className="text-black" />
          </button>
        </div>

        <div className="p-1 text-black">
          <h2 className="text-lg font-bold mb-2">Users</h2>
          <ul className="space-y-2">
            {thisProjectData?.map((users)=>(
            <div key={users?._id} className="flex gap-2 items-center p-2 bg-white rounded-lg shadow-md w-full hover:bg-gray-300">
              <FaUserCircle />
              <li className="text-lg font-medium"> 
                {users?.email}
              </li>
            </div>
            )) }
         
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-5 min-h-screen bg-gray-900 text-white">
      <main className="h-screen w-screen flex ">
        <section className="left-side relative h-full min-w-60 bg-blue-300 ">
          {sideSectionHeaderUI()}
          {chatBoxArea()}
          {chatSendingArea()}
          {sideUserselectionPlannel()}
        </section>
      </main>

      {openCreateProjectModal && createProjectUi()}
    </div>
  );
}

export default Project;
