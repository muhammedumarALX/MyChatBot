const userInput = document.getElementById("user-input")
const sendButton = document.getElementById("send")
const chatDisplay = document.querySelector('.chatDisplay ul')

const handleInput = () => {
    const message = userInput.value.trim();
    
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

sendButton.addEventListener("click", handleInput)
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
        e.preventDefault();
        handleChat();
    }
})