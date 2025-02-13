import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/user.context";
import { useLocation, useParams } from "react-router-dom";
import {
  initializeSocket,
  receiveMessage,
  sendMessage,
} from "../config/socket.io";
import Markdown from "markdown-to-jsx";
// import hljs from "highlight.js";
import { getWebContainer } from "../config/webcontainer";
import axiosInstance from "../config/axios";

import { MdGroups2 } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { IoIosPersonAdd, IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

function SyntaxHighlightedCode(props) {
  const ref = useRef(null);

  React.useEffect(() => {
    if (ref.current && props.className?.includes("lang-") && window.hljs) {
      window.hljs.highlightElement(ref.current);

      // hljs won't reprocess the element unless this attribute is removed
      ref.current.removeAttribute("data-highlighted");
    }
  }, [props.className, props.children]);

  return <code {...props} ref={ref} />;
}

const Project = () => {
  const location = useLocation();

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(new Set()); // Initialized as Set
  const [project, setProject] = useState(location.state.project);
  console.log("oeds ",project);
  
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const messageBox = React.createRef();

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]); // New state variable for messages
  const [fileTree, setFileTree] = useState({});

  const [currentFile, setCurrentFile] = useState(null);
  const [openFiles, setOpenFiles] = useState([]);

  const [webContainer, setWebContainer] = useState(null);
  const [iframeUrl, setIframeUrl] = useState(null);

  const [runProcess, setRunProcess] = useState(null);


  
  const projectId = useParams().id;
  console.log(projectId);

  const handleUserClick = (id) => {
    setSelectedUserId((prevSelectedUserId) => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }

      return newSelectedUserId;
    });
  };

  function addCollaborators() {
    axiosInstance
      .put("/projects/add-user", {
        projectId: projectId,
        users: Array.from(selectedUserId),
      })
      .then((res) => {
        console.log(res.data);
        // setIsModalOpen(false);
        closeProjectModal()
        toast.success('User Added Successfully');

      })
      .catch((err) => {
        console.log(err);
        toast.failed('Failed to Add User');
      });
  }

  const send = () => {
    sendMessage("project-message", {
      message,
      sender: user,
    });
    setMessages((prevMessages) => [...prevMessages, { sender: user, message }]); // Update messages state
    setMessage("");
  };
console.log("messgaaess", messages);

  function WriteAiMessage(message) {
    const messageObject = JSON.parse(message);

    return (
      <div className="overflow-auto bg-slate-950 text-white rounded-sm p-2">
        <Markdown
          children={messageObject.text}
          options={{
            overrides: {
              code: SyntaxHighlightedCode,
            },
          }}
        />
      </div>
    );
  }

  useEffect(() => {
    initializeSocket(projectId);

    if (!webContainer) {
      getWebContainer().then((container) => {
        setWebContainer(container);
        console.log("container started");
      });
    }

    receiveMessage("project-message", (data) => {
      console.log(data);

      if (data.sender._id == "ai") {
        const message = JSON.parse(data.message);

        console.log(message);

        webContainer?.mount(message.fileTree);

        if (message.fileTree) {
          setFileTree(message.fileTree || {});
        }
        setMessages((prevMessages) => [...prevMessages, data]); // Update messages state
      } else {
        setMessages((prevMessages) => [...prevMessages, data]); // Update messages state
      }
    });

    axiosInstance
      .get(`/projects/get-project/${projectId}`)
      .then((res) => {
        console.log(res.data.project);

        setProject(res.data.project);
        setFileTree(res.data.project.fileTree || {});
      });

      axiosInstance
      .get("/users/all")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function saveFileTree(ft) {
    axiosInstance
      .put("/projects/update-file-tree", {
        projectId: projectId,
        fileTree: ft,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Removed appendIncomingMessage and appendOutgoingMessage functions

    const [openCreateProjectModal, setOpenCreateProjectModal] =
      React.useState(false);

  const [isOpen, setIsOpen] = useState(false);

  function scrollToBottom() {
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  }
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

const projectData = useLocation().state;

function createProjectUi() {
    if (users) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
              <div className="flex align-center justify-between mb-4">
                            <h2 className="text-2xl mb-4 text-black">
                              Add User To Collaborate
                            </h2>
                            <IoMdClose
                              className="text- text-2xl cursor-pointer"
                              onClick={closeProjectModal}
                            />
                          </div>
            {/* </header> */}
            <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`user cursor-pointer hover:bg-slate-200 ${
                    Array.from(selectedUserId).indexOf(user._id) != -1
                      ? "bg-slate-200"
                      : ""
                  } p-2 flex gap-2 items-center`}
                  onClick={() => handleUserClick(user._id)}
                >
                  <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                          <FaUserCircle   className="ri-user-fill absolute"/>
                  </div>
                  <h1 className="font-semibold text-lg">{user.email}</h1>
                </div>
              ))}
            </div>
            <button
              onClick={addCollaborators}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-md"
            >
              Add Collaborators
            </button>
          </div>
        </div>
      );
    } else {
      return <p>Loading users...</p>;
    }
  }
  
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
          <div className="message-box  border-t-[1.5px] absolute w-full border-y-neutral-800 bottom-0 shadow-lg" ref={messageBox}>
            <div className="input-feild flex relative">
              <input
                type="text"
                value={message}
                placeholder="Enter message"
                onChange={(e) => setMessage(e.target.value)}
                className="bg-blue-500 outline-none
                pl-2 text-black placeholder:text-black placeholder:text-md w-full h-10"
              />
              <div className="absolute bottom-[11px] pr-2 right-0 flex justify-center  ">
                <button onClick={send}>
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
          <div className="conversation-area  pb-4 flex-grow flex flex-col h-full relative">
          <div
            ref={messageBox}
            className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.sender?._id === "ai" ? "max-w-80" : "max-w-52"
                } ${
                  msg.sender?._id == user?._id.toString() && "ml-auto"
                }  message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}
              >
                <small className="opacity-65 text-xs">{msg.sender?.email}</small>
                <div className="text-sm">
                  {msg.sender?._id === "ai" ? (
                    WriteAiMessage(msg.message)
                  ) : (
                    <p>{msg.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      );
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
               {project?.users &&
                project?.users.map((user) => (
                  <div
                    key={user?._id}
                    className="flex gap-2 items-center p-2 bg-white rounded-lg shadow-md w-full hover:bg-gray-300"
                  >
                    <FaUserCircle />
                    <li className="text-lg font-medium">{user?.email}</li>
                  </div>
                ))}
              
              </ul>
            </div>
          </div>
        );
      }

  return (
    <main className="h-screen bg-green-100 flex">
      

<main className="h-screen w-scree flex ">
        <section className="left-side relative h-full min-w-60 bg-blue-300 ">
          {sideSectionHeaderUI()}
          {chatBoxArea()}
          {chatSendingArea()}
          {sideUserselectionPlannel()}
        </section>
      </main>

      {openCreateProjectModal && createProjectUi()}

      <section className="right bg-blue-400 flex-grow h-full flex">
        <div className="explorer h-full max-w-64 min-w-52 bg-blue-200">
          <div className="file-tree w-full">
            {Object.keys(fileTree).map((file, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentFile(file);
                  setOpenFiles([...new Set([...openFiles, file])]);
                }}
                className="tree-element cursor-pointer p-2 px-4 flex items-center gap-2 bg-slate-300 w-full"
              >
                <p className="font-semibold text-lg">{file}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="code-editor flex flex-col flex-grow h-full shrink">
          <div className="top flex justify-between w-full">
            <div className="files flex">
              {openFiles.map((file, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFile(file)}
                  className={`open-file cursor-pointer p-2 px-4 flex items-center w-fit gap-2 bg-slate-300 ${
                    currentFile === file ? "bg-slate-400" : ""
                  }`}
                >
                  <p className="font-semibold text-lg">{file}</p>
                </button>
              ))}
            </div>

            <div className="actions flex gap-2">
              <button
                onClick={async () => {
                  await webContainer.mount(fileTree);

                  const installProcess = await webContainer.spawn("npm", [
                    "install",
                  ]);

                  installProcess.output.pipeTo(
                    new WritableStream({
                      write(chunk) {
                        console.log(chunk);
                      },
                    })
                  );

                  if (runProcess) {
                    runProcess.kill();
                  }

                  let tempRunProcess = await webContainer.spawn("npm", [
                    "start",
                  ]);

                  tempRunProcess.output.pipeTo(
                    new WritableStream({
                      write(chunk) {
                        console.log(chunk);
                      },
                    })
                  );

                  setRunProcess(tempRunProcess);

                  webContainer.on("server-ready", (port, url) => {
                    console.log(port, url);
                    setIframeUrl(url);
                  });
                }}
                className="p-2 px-4 bg-slate-400 text-white cursor-pointer capitalize font-bold"
              >
                Run
              </button>
            </div>
          </div>
          <div className="bottom flex flex-grow max-w-full shrink overflow-auto">
            {fileTree[currentFile] && (
              <div className="code-editor-area h-full overflow-auto flex-grow bg-slate-50">
                <pre className="hljs h-full">
                  <code
                    className="hljs h-full outline-none"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const updatedContent = e.target.innerText;
                      const ft = {
                        ...fileTree,
                        [currentFile]: {
                          file: {
                            contents: updatedContent,
                          },
                        },
                      };
                      setFileTree(ft);
                      saveFileTree(ft);
                    }}
                    dangerouslySetInnerHTML={{
                      __html: hljs.highlight(
                        "javascript",
                        fileTree[currentFile].file.contents
                      ).value,
                    }}
                    style={{
                      whiteSpace: "pre-wrap",
                      paddingBottom: "25rem",
                      counterSet: "line-numbering",
                    }}
                  />
                </pre>
              </div>
            )}
          </div>
        </div>

        {iframeUrl && webContainer && (
          <div className="flex min-w-96 flex-col h-full">
            <div className="address-bar">
              <input
                type="text"
                onChange={(e) => setIframeUrl(e.target.value)}
                value={iframeUrl}
                className="w-full p-2 px-4 bg-slate-200"
              />
            </div>
            <iframe src={iframeUrl} className="w-full h-full"></iframe>
          </div>
        )}
      </section>

      
    </main>
  );
};

export default Project;


// message code section

{/* <section className="left relative flex flex-col h-screen min-w-96 bg-slate-300">

        
        <header className="flex justify-between items-center p-2 px-4 w-full bg-slate-100 absolute z-10 top-0">
          <button className="flex gap-2" onClick={() => setIsModalOpen(true)}>
          <IoMdClose className="ri-add-fill mr-1"/>
            <p>Add collaborator</p>
          </button>
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className="p-2"
          >
            <IoIosPersonAdd className="ri-group-fill"></IoIosPersonAdd>
          </button>
        </header>
        
        <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative">
          <div
            ref={messageBox}
            className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.sender._id === "ai" ? "max-w-80" : "max-w-52"
                } ${
                  msg.sender._id == user._id.toString() && "ml-auto"
                }  message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}
              >
                <small className="opacity-65 text-xs">{msg.sender.email}</small>
                <div className="text-sm">
                  {msg.sender._id === "ai" ? (
                    WriteAiMessage(msg.message)
                  ) : (
                    <p>{msg.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="inputField w-full flex absolute bottom-0">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 px-4 border-none outline-none flex-grow"
              type="text"
              placeholder="Enter message"
            />
            <button onClick={send} className="px-5 bg-slate-950 text-white">
              <IoSend className="ri-send-plane-fill"/>
            </button>
          </div>
        </div>
        <div
          className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          } top-0`}
        >
          <header className="flex justify-between items-center px-4 p-2 bg-slate-200">
            <h1 className="font-semibold text-lg">Collaborators</h1>

            <button
              onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
              className="p-2"
            >
              <IoMdClose className="ri-close-fill"></IoMdClose>
            </button>
          </header>
          <div className="users flex flex-col gap-2">
            {project?.users &&
              project?.users.map((user) => {
                return (
                  <div className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
                    <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                    <FaUserCircle className="ri-user-fill absolute"/>
                    </div>
                    <h1 className="font-semibold text-lg">{user.email}</h1>
                  </div>
                );
              })}
          </div>
        </div>
      </section> */}

      // {isModalOpen && (
      //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      //     <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
      //       <header className="flex justify-between items-center mb-4">
      //         <h2 className="text-xl font-semibold">Select User</h2>
      //         <button onClick={() => setIsModalOpen(false)} className="p-2">
      //         <IoIosPersonAdd className="ri-close-fill"/>
      //         </button>
      //       </header>
      //       <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
      //         {users.map((user) => (
      //           <div
      //             key={user.id}
      //             className={`user cursor-pointer hover:bg-slate-200 ${
      //               Array.from(selectedUserId).indexOf(user._id) != -1
      //                 ? "bg-slate-200"
      //                 : ""
      //             } p-2 flex gap-2 items-center`}
      //             onClick={() => handleUserClick(user._id)}
      //           >
      //             <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
      //                     <FaUserCircle   className="ri-user-fill absolute"/>
      //             </div>
      //             <h1 className="font-semibold text-lg">{user.email}</h1>
      //           </div>
      //         ))}
      //       </div>
      //       <button
      //         onClick={addCollaborators}
      //         className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md"
      //       >
      //         Add Collaborators
      //       </button>
      //     </div>
      //   </div>
      // )}