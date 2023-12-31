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
            <p class="userMessage"></p>
            <span class="userIcon material-symbols-rounded">Face</span>
        `;

        userMessageItem.querySelector('p').textContent = message;
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
        const botMessage = data.choices[0].message.content;
            console.log(botMessage)
        const botMessageItem = document.createElement('li')
        botMessageItem.className ="incoming";
        botMessageItem.innerHTML = `
        <span class="botIcon material-symbols-rounded">smart_toy</span>
        <p class="botMessage"></p>
        `;

        botMessageItem.querySelector('p').textContent = botMessage;
        chatDisplay.appendChild(botMessageItem)
    })
    .catch(error => {

        const failed = error.message;
        console.log(failed)
        const failedMessage = document.createElement("li")
        failedMessage.className = "incoming";
        failedMessage.innerHTML = `
        <span class="errBotIcon material-symbols-rounded">smart_toy</span>
        <p class="errMessage">Oops!!!</p>
        `;

        failedMessage.querySelector('p').textContent = "Oops!!! An error occurred: " + failed
        chatDisplay.appendChild(failedMessage)
    })
}

sendButton.addEventListener("click", handleInput)
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
        e.preventDefault();
        handleInput();
    }
})
