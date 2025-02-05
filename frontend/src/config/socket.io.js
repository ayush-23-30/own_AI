import { io } from 'socket.io-client'; // Ensure you're using the correct socket.io import

let socketInstance = null;


export const initializeSocket = (projectid) => {
  const apiUrl = import.meta.env.VITE_API_URL; // Extract the API URL from the environment variable
  
  if (!apiUrl) {
    console.error("VITE_API_URL is not defined in your environment variables.");
    return;
  }

  socketInstance = io(apiUrl, {
    auth: {
      token: localStorage.getItem('token'),
    },
    query : {
      projectid
    }
  });

  socketInstance.on("connect", () => {
    console.log("Socket connected:", socketInstance.id);
  });

  socketInstance.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });
};


export const receiveMessage = (eventName, cb) => {
  if (socketInstance) {
    socketInstance.on(eventName, cb);
  } else {
    console.error("Socket instance is not initialized.");
  }
};

export const SendMessage = (eventName, data) => {
  if (socketInstance) {
    socketInstance.emit(eventName, data);
  } else {
    console.error("Socket instance is not initialized.");
  }
};
