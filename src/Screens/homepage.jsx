// require('dotenv').config();

import React, { useState } from "react";
import AutosizeTextarea from "react-autosize-textarea";

export const HomePage = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); // State to store selected files

  const handleChange = (event) => {
    setValue(event.target.value);
  };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     setSelectedFiles(Array.from(files).filter((file) => isValidFileType(file))); // Filter for valid PDF and CSV files
//   };

    const handleFileChange = (event) => {
        const Files = Array.from(event.target.files).filter((file) =>
        ["application/pdf", "text/csv"].includes(file.type)
        );
        setSelectedFiles(Files);
        console.log(Files);
    };

  const isValidFileType = (file) => {
    const allowedExtensions = [".pdf", ".csv"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  };

  const handleButtonClick = async () => {
    // Add the user's message first
    console.log(selectedFiles);
   

    const formData = new FormData();
    formData.append("session_id", ""); // Replace with your actual session ID
    formData.append("chat_id", ""); // Replace with your actual chat ID

    // Add selected files to the formData
    selectedFiles.forEach((file) => {
        console.log(file);
        formData.append("files", file);
      });

    formData.append("text", value); // Add the user's message as text

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: value, sender: "User" },
    ]);

    // Clear the input field
    setValue("");
    // Send the API request using fetch with POST method and formData
    const response = await fetch("http://localhost:5001/ais/uploadGenerate/uploadAndChat", {
      method: "POST",
      body: formData,
    });

    const botResponse = await response.json();

    // Add the bot's response
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: botResponse.text, sender: "Assistant" },
    ]);
  };

  return (
    <div id="cg">
      <div className="card-pg">
        <div className="row">
          {/* <div className="col-xs-12">
            <div className="col-xs-12"> */}
          <div className="about-text">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className="card-card">
              <div className="cg-text ">
                <div className="chats">
                  <div className="bot">
                    <img src="img/AI.svg" alt="AI" width={28} height={28} />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <h4>
                      <strong> Assistant</strong>
                    </h4>
                  </div>

                  <p className="responses">
                    Experiance the power of Assistant for real-time
                    conversation, and data analysis. <br />
                  </p>
                  <br />

                  <div className="bot">
                    <img
                      src="img/user-128.svg"
                      alt="AI"
                      width={28}
                      height={28}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <h4>
                      <strong> User</strong>
                    </h4>
                  </div>

                  <p className="responses">
                    given the following PDF file, explain the concept of condense matter physics analysis. <br />
                  </p>
                  {messages.map((message, index) => (
                    <div key={index}>
                      <br />
                      <div
                        className={message.sender === "User" ? "bot" : "bot"}
                      >
                        <img
                          src={
                            message.sender === "User"
                              ? "img/user-128.svg"
                              : "img/AI.svg"
                          }
                          alt="AI"
                          width={28}
                          height={28}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <h4>
                          <strong> {message.sender}</strong>
                        </h4>
                      </div>
                      <p className="responses">{message.text}</p>
                    </div>
                  ))}
                  <div className="prompt-section">
                    <AutosizeTextarea
                      className="input-text"
                      value={value}
                      onChange={handleChange}
                      placeholder="type your prompt here"
                    />
                    &nbsp;&nbsp;&nbsp;
                    <label htmlFor="file-upload">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.csv"
                        id="file-upload"
                        onChange={handleFileChange}
                        style={{ display: "none" }} // Hide the default file input
                      />
                      <img src="img/doc.svg" alt="doc" width={28} height={28} />
                    
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                      className="prompt-button"
                      onClick={handleButtonClick}
                    >
                      <img
                        src="img/up-arrow.svg"
                        alt="AI"
                        width={28}
                        height={28}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  );
};
