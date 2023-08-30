const userInput = document.getElementById("user-input")
const sendButton = document.getElementById("send")
const chatDisplay = document.querySelector('.chatDisplay ul')
const API_KEY = "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";

const handleInput = () => {
    const message = userInput.value.trim();
    generateResponse(message);
    
    if (message !== ''){
        const userMessageItem = document.createElement('li');
        userMessageItem.className = "outgoing";
        userMessageItem.innerHTML = `
            <p class="userMessage">${message}</p>
            <span class="userIcon material-symbols-rounded">Face</span>
        `;

        chatDisplay.appendChild(userMessageItem);

        userInput.value = "";
        
    }
}

const generateResponse = (userMessage) => {
    const API_URL = "https://api.openai.com/v1/chat/completions"

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
        })
    }

    fetch(API_URL, requestOptions)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.log(error)
    })
}

sendButton.addEventListener("click", handleInput)
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
        e.preventDefault();
        handleChat();
    }
})