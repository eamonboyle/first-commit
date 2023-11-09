import React, { useState } from "react";

interface UserInputProps {
    onUsernameChange: (username: string) => void;
}

const UserInput: React.FC<UserInputProps> = ({ onUsernameChange }) => {
    const [username, setUsername] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = event.target.value;
        setUsername(newUsername);
        onUsernameChange(newUsername);
    };

    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <label htmlFor="username" className="">GitHub Username:</label>
            <input
                id="username"
                type="text"
                className="bg-gray-100 rounded-md border border-gray-300 p-1 px-2 w-96"
                value={username}
                onChange={handleInputChange}
                placeholder="Enter a GitHub username"
            />
        </div>
    );
};

export default UserInput;
