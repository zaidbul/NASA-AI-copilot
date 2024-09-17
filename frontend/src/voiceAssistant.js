// src/voiceAssistant.js

// Initialize SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Event handler for processing the speech recognition result
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    // Send the transcribed text to the backend API
    sendMessageToBackend(transcript);
};

// Function to start listening to the user's speech
function startListening() {
    recognition.start();
}

// Function to use Speech Synthesis to speak the given text
function speak(text) {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
}

// Function to handle the response from the backend
function handleBackendResponse(responseText) {
    // Display the response in the UI
    const responseElement = document.getElementById('response');
    if (responseElement) {
        responseElement.innerText = responseText;
    }
    // Speak out the response
    speak(responseText);
}

// Function to send the transcribed message to the backend
function sendMessageToBackend(message) {
    fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
        handleBackendResponse(data.response);
    })
    .catch(error => console.error('Error:', error));
}

// Export functions for use in React components
export { startListening, handleBackendResponse };
