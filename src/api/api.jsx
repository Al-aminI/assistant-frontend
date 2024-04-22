
export const fetchBotResponse = async (userMessage) => {
       const response = await fetch("http://localhost:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
            },
      body: JSON.stringify({
        
       userMessage,

      }),
    });
    // console.log(response.json());
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    const botResponse = await response.json();
  //   console.log(botResponse);
    return botResponse;
  };