import React, { useState, useEffect, useRef } from 'react'

const Chat = ({socket, username, room}) => {

  const [currentMsg, setCurrentMsg] = useState("")

  const [msgList, setMsgList] = useState([])

  const sendMsg = async () => {
    if(currentMsg !== ""){
      const msgData = {
        id : Math.random(),
        room: room,
        authore: username,
        msg: currentMsg,
        time: new Date(Date.now()).getHours()%12 + ":" + new Date(Date.now()).getMinutes()
      }

      await socket.emit("send_message", msgData)

      setMsgList((list) => [...list, msgData])

      setCurrentMsg("")
    }

  }

  useEffect(() => {
    const handleReceiveMsg = (data) => {
      setMsgList((list) => [...list, data])
    }
    socket.on("receive_message", handleReceiveMsg)
  
    return () => {
      socket.off("receive_message", handleReceiveMsg)
    }
  }, [socket])

  const scrollref = useRef()

  useEffect(() => {
    scrollref.current.scrollTop = scrollref.current.scrollHeight
  }, [msgList])
  

  return (
    <>
      <div className="chatContainer">
        <h1>Welcome {username}</h1>
        <div className="chatBox">

          <div className='autoScrollBar' ref={scrollref} style={{height:"450px", overflowY:"auto"}}>
            {
              msgList.map((data) => (
                <div id={username == data.authore ? "you" : "other"} className="msgContent" key={data.id}>
                  <div>
                  <div className="msg" id={username == data.authore ? "y" : "o"}>
                    <p>{data.msg}</p>
                  </div>
                  <div className="msgDetail" >
                    <p>{data.authore}</p>
                    <p>{data.time}</p>
                  </div>
                  </div>
                </div>
              ))
            }
          </div>


          <div className="chatBody">
            <input type="text" onKeyPress={(e) => {e.key === "Enter" && sendMsg()}} value={currentMsg} onChange={(e) => setCurrentMsg(e.target.value)} name="" id="" placeholder='Enter your message'/>
            <button onClick={sendMsg}><i class="ri-send-plane-2-fill"></i></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat