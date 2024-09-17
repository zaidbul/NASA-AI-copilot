// App.js (or any React component)
import React from 'react';
import { startListening } from './voiceAssistant'; // Adjust path as needed

function App() {
    return (
        <div className="App">
            <button onClick={startListening}>Speak</button>
            <div id="response"></div>
        </div>
    );
}

export default App;
