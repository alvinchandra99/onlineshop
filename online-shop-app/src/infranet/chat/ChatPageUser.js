import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup, Input, InputGroupAddon } from "reactstrap";
import Moment from "moment";
import firebase from "../../Firebase";
import "./StyleChatRoom.css";

function ChatPageUser() {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [nickname, setNickname] = useState("");
  const [roomname, setRoomname] = useState("");
  const [newchat, setNewchat] = useState({
    roomname: "",
    nickname: "",
    message: "",
    date: "",
    type: "",
  });

  const room = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      setNickname(localStorage.getItem("username"));
      setRoomname(room);
      firebase
        .database()
        .ref("chats/")
        .orderByChild("roomname")
        .equalTo(roomname)
        .on("value", (resp) => {
          setChats([]);
          setChats(snapshotToArray(resp));
        });
    };

    fetchData();
  }, [room, roomname]);

  useEffect(() => {
    const fetchData = async () => {
      setNickname(localStorage.getItem("username"));
      setRoomname(room);
      firebase
        .database()
        .ref("roomusers/")
        .orderByChild("roomname")
        .equalTo(roomname)
        .on("value", (resp2) => {
          setUsers([]);
          const roomusers = snapshotToArray(resp2);
          setUsers(roomusers.filter((x) => x.status === "online"));
        });
    };

    fetchData();
  }, [room, roomname]);

  const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  };

  const submitMessage = (e) => {
    e.preventDefault();
    const chat = newchat;
    chat.roomname = roomname;
    chat.nickname = nickname;
    chat.date = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    chat.type = "message";
    const newMessage = firebase.database().ref("chats/").push();
    newMessage.set(chat);
    setNewchat({ roomname: "", nickname: "", message: "", date: "", type: "" });
  };

  const onChange = (e) => {
    e.persist();
    setNewchat({ ...newchat, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="m-auto" style={{ maxWidth: "500px" }}>
          <div className="card card-warning direct-chat direct-chat-warning">
            <div className="card-header">
              <h3>Message</h3>
            </div>
            <div className="card-body">
              <div className="direct-chat-messages">
                {chats.map((item, idx) => (
                  <div key={idx} className="MessageBox">
                    {item.type === "join" || item.type === "exit" ? (
                      <div className="ChatStatus">
                        <span className="ChatDate">{item.date}</span>
                        <span className="ChatContentCenter">
                          {item.message}
                        </span>
                      </div>
                    ) : (
                      <div className="ChatMessage">
                        <div
                          className={`${
                            item.nickname === nickname
                              ? "RightBubble"
                              : "LeftBubble"
                          }`}
                        >
                          {item.nickname === nickname ? (
                            <span className="MsgName">Me</span>
                          ) : (
                            <span className="MsgName">Admin</span>
                          )}
                          <span className="MsgDate"> at {item.date}</span>
                          <p>{item.message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer">
              <Form className="MessageForm" onSubmit={submitMessage}>
                <InputGroup>
                  <Input
                    type="text"
                    name="message"
                    id="message"
                    placeholder="Type message..."
                    value={newchat.message}
                    onChange={onChange}
                  />
                  <InputGroupAddon addonType="append">
                    <Button variant="primary" type="submit">
                      Send
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatPageUser;
