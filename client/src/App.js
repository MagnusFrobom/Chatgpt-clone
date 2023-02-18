import './App.css';
import './normal.css';
import { useState } from 'react';

function App() {

    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState([{
      user: "gpt",
      message: "Let me help you!"
  },{
    user: "You",
    message: "Use me"
  }]);

  async function handleSubmit(e){
      e.preventDefault();
    setChatLog([...chatLog, { user: "me", message: `${input}`
    } ])
      setInput("");
      const response = await fetch("http://localhost:3080/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: chatLog.map((message) => message.message).join("")
          })
        });
      const data = await response.json();
      setChatLog([...chatLog, { user: "gpt", message: `${data.message}`} ])
      console.log(data.message);
  }

  return (
    <div className="App">
      <aside className="left-sidemenu">
        <div className="side-menu-button">
        <span>+</span>  New chat
        </div> 
      </aside>
      <section className="chatbox">
        <div className="chat-log">
        {chatLog.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
          <div className="chat-message chatgpt">
            <div className="chat-message-center">
              <div className="avatar chatgpt">
                
              </div>
              <div className="message">
                I'm your AI!
              </div>
            </div>
          </div>  

        </div>

        <div className="chat-input-holder">
        <form onSubmit={handleSubmit}>

        <input
        rows="1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="chat-input-text-area">
        </input>
        </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
          {message.user === "gpt" && 
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx={50} cy={50} r={50} fill="#4C4C4C" />
            <rect x={20} y={35} width={60} height={35} rx={5} ry={5} fill="#4C4C4C" />
            <ellipse cx={50} cy={35} rx={30} ry={20} fill="#4C4C4C" />
            <path fill="#F8F8F8" d="m50 65 10 10H40z" />
            <text
              x={50}
              y={50}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize={35}
              fontWeight="bold"
              fontFamily="sans-serif"
              fill="#FFF"
            >
              {"YOU"}
            </text>
          </svg>
          }
          </div>
        <div className="message">
          Hi there!
        </div>
      </div>
      </div>
  )
}


export default App;


// AI SVG LOGO
/* 
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx={50} cy={50} r={50} fill="#4C4C4C" />
  <rect x={25} y={25} width={50} height={50} rx={5} ry={5} fill="#F8F8F8" />
  <path fill="#F8F8F8" d="m50 10 40 70H10z" />
  <text
    x={50}
    y={50}
    textAnchor="middle"
    alignmentBaseline="middle"
    fontSize={45}
    fontWeight="bold"
    fontFamily="sans-serif"
  >
    {"AI"}
  </text>
</svg> */
