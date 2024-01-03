"use client";
import styles from "./page.module.css";
import { io } from "socket.io-client";
import { useState } from "react";
import ChatPage from "@/components/page";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setroomId] = useState("");
  
  var socket: any;
  socket = io("http://localhost:3001");
  
  const handleJoin = () => {
    if (userName !== "" && roomId !== "") {
      console.log(userName, "userName", roomId, "roomId");
      socket.emit("join_room", roomId);
      setShowSpinner(true);
      // You can remove this setTimeout and add your own logic
      setTimeout(() => {
        setShowChat(true);
        setShowSpinner(false);
      }, 4000);
    } else {
      alert("Please fill in Username and Room Id");
    }
  };
  
  return (
    <div>
    <div
    className={styles.main_div}
    style={{ display: showChat ? "none" : "" }}
    >
    <input
    className={styles.main_input}
    type="text"
    placeholder="Username"
    onChange={(e) => setUserName(e.target.value)}
    disabled={showSpinner}
    />
    <input
    className={styles.main_input}
    type="text"
    placeholder="room id"
    onChange={(e) => setroomId(e.target.value)}
    disabled={showSpinner}
    />
    <button className={styles.main_button} onClick={() => handleJoin()}>
    {!showSpinner ? (
      "Join"
      ) : (
        <div className={styles.loading_spinner}></div>
        )}
        </button>
        </div>
        <div style={{ display: !showChat ? "none" : "" }}>
        <ChatPage socket={socket} roomId={roomId} username={userName} />
        </div>
        </div>
        );
      }
      