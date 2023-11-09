import React, { useState } from "react";
import UserInput from "./components/UserInput";
import CommitDisplay from "./components/CommitDisplay";

const App: React.FC = () => {
    const [username, setUsername] = useState("");

    const handleUsernameChange = (newUsername: string) => {
        setUsername(newUsername);
    };

    return (
        <div className="App container mx-auto py-24">
            <UserInput onUsernameChange={handleUsernameChange} />
            <CommitDisplay username={username} />
        </div>
    );
};

export default App;
