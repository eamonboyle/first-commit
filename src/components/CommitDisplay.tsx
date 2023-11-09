import React, { useEffect, useState } from "react";
import { Commit } from "../types";
import { getFirstCommit } from "../api/github";

interface CommitDisplayProps {
    username: string;
}

const CommitDisplay: React.FC<CommitDisplayProps> = ({ username }) => {
    const [commit, setCommit] = useState<Commit | null>(null);

    useEffect(() => {
        if (username) {
            getFirstCommit(username)
                .then((commit) => setCommit(commit))
                .catch((err) => console.error(err));
        }
    }, [username]);

    if (!commit) {
        return <div className="text-center mt-4">No commit data available</div>;
    }

    return (
        <div className="flex flex-col items-center mt-4 bg-white rounded-lg p-6">
            <a href={commit.userUrl} target="_blank" rel="noopener noreferrer">
                <img src={commit.avatarUrl} alt={commit.author} className="w-20 h-20 rounded-full mb-4" />
            </a>
            <h2 className="text-2xl font-semibold mb-2">First Commit</h2>
            <p className="text-gray-700">
                <span className="font-semibold">Message:</span> {commit.message}
            </p>
            <p className="text-gray-700">
                <span className="font-semibold">Author:</span>{" "}
                <a href={commit.userUrl} target="_blank" rel="noopener noreferrer">
                    {commit.author}
                </a>
            </p>
            <p className="text-gray-700">
                <span className="font-semibold">Date:</span> {new Date(commit.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
                <span className="font-semibold">Repo:</span>{" "}
                <a href={commit.repoUrl} target="_blank" rel="noopener noreferrer">
                    {commit.repo}
                </a>
            </p>
            <p className="text-gray-700">
                <a href={commit.commitUrl} target="_blank" rel="noopener noreferrer">
                    Link to commit
                </a>
            </p>
        </div>
    );
};

export default CommitDisplay;
