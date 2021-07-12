import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Jumbotron, Spinner, ListGroup, ListGroupItem } from "reactstrap";
import Moment from "moment";
import firebase from "../../Firebase";

function RoomList() {
  const [room, setRoom] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [nickname, setNickname] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      setNickname(localStorage.getItem("username"));
      firebase
        .database()
        .ref("rooms/")
        .on("value", (resp) => {
          setRoom([]);
          setRoom(snapshotToArray(resp));
          setShowLoading(false);
        });
    };

    fetchData();
  }, []);

  const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  };

  const enterChatRoom = (roomname) => {
    const chat = {
      roomname: "",
      nickname: "",
      message: "",
      date: "",
      type: "",
    };
    chat.roomname = roomname;
    chat.nickname = nickname;
    chat.date = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    chat.message = "Halo Admin disini, Ada yang bisa dibantu?";
    const newMessage = firebase.database().ref("chats/").push();
    newMessage.set(chat);

    firebase
      .database()
      .ref("roomusers/")
      .orderByChild("roomname")
      .equalTo(roomname)
      .on("value", (resp) => {
        let roomuser = [];
        roomuser = snapshotToArray(resp);
        const user = roomuser.find((x) => x.nickname === nickname);
        if (user !== undefined) {
          const userRef = firebase.database().ref("roomusers/" + user.key);
          userRef.update({ status: "online" });
        } else {
          const newroomuser = { roomname: "", nickname: "", status: "" };
          newroomuser.roomname = roomname;
          newroomuser.nickname = nickname;
          newroomuser.status = "online";
          const newRoomUser = firebase.database().ref("roomusers/").push();
          newRoomUser.set(newroomuser);
        }
      });

    history.push("/chatroom/" + roomname);
  };

  return (
    <div>
      {showLoading && <Spinner color="primary" />}
      <Jumbotron>
        <h3>{nickname} </h3>
        <h2>Room List</h2>
        <div>
          <Link to="/addroom">Add Room</Link>
        </div>
        <div className="card-body">
          <div className="direct-chat-messages">
            <ListGroup>
              {room.map((item, idx) => (
                <ListGroupItem
                  key={idx}
                  action
                  onClick={() => {
                    enterChatRoom(item.roomname);
                  }}
                >
                  {item.roomname}
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </div>
      </Jumbotron>
    </div>
  );
}

export default RoomList;
