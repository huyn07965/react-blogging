import { createContext, useContext, useEffect, useRef, useState } from "react";
import socketIo from "socket.io-client";
import axios from "axios";

const AuthContext = createContext();
function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState([]);
  const [like, setLike] = useState(true);
  const [save, setSave] = useState(true);
  const [reload, setReload] = useState(true);
  const [follows, setFollows] = useState(true);
  const [signIn, setSignIn] = useState(true);
  const [event, setEvent] = useState();
  const [eventSave, setEventSave] = useState();
  const [eventLikeComment, setEventLikeComment] = useState();
  const socket = useRef(null);
  useEffect(() => {
    socket.current = socketIo("https://node-app-blogging.onrender.com");
    socket.current.on("notification", (notification) => {
      setEvent(notification);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);
  useEffect(() => {
    socket.current = socketIo("https://node-app-blogging.onrender.com");
    socket.current.on("notification-likeComment", (notification) => {
      setEventLikeComment(notification);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const value = {
    userInfo,
    setUserInfo,
    like,
    setLike,
    save,
    setSave,
    reload,
    setReload,
    follows,
    setFollows,
    signIn,
    setSignIn,
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      if (!token) setUserInfo("");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      axios
        .get("https://node-app-blogging.onrender.com/auth", { headers })
        .then((result) => setUserInfo(result.data))
        .catch((error) => console.log(error));
    };
    getData();
  }, [like, save, token, signIn, follows, event, eventSave, eventLikeComment]);

  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
