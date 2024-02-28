import React, { useState } from "react";

import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:1000");

const App = () => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const [showChat, setShowChat] = useState(false);

  const handleSubmit = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
      {!showChat && (
        <div className="join_room">
          

          <form>
            <div style={{textAlign:"center", marginBottom: "40px"}}><h3>Join Chat Room</h3></div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Enter Your Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                autocomplete="off"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Code
              </label>
              <input
                type="number"
                class="form-control"
                id="exampleInputPassword1"
                autocomplete="off"
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>
           
            <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      )}

      {showChat && <Chat socket={socket} username={userName} room={room} />}
    </>
  );
};

export default App;
