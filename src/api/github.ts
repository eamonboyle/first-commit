import axios from "axios";
import { Commit } from "../types";

const GITHUB_API_URL = "https://api.github.com";

export const getFirstCommit = async (username: string): Promise<Commit> => {
    const userResponse = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    const avatarUrl = userResponse.data.avatar_url;
    const userUrl = userResponse.data.html_url;

    const reposResponse = await axios.get(`${GITHUB_API_URL}/users/${username}/repos?sort=created&direction=asc`);

    if (reposResponse.data.length === 0) {
        throw new Error(`No repos found for user ${username}`);
    }

    const firstRepo = reposResponse.data[0];
    const repoUrl = firstRepo.html_url;
    const commitsResponse = await axios.get(
        `${GITHUB_API_URL}/repos/${username}/${firstRepo.name}/commits?direction=asc&sort=asc`
    );

    if (commitsResponse.data.length === 0) {
        throw new Error(`No commits found for repo ${firstRepo.name}`);
    }

    const firstCommit = commitsResponse.data[0];
    const commitUrl = firstCommit.html_url;
    return {
        message: firstCommit.commit.message,
        author: firstCommit.commit.author.name,
        date: firstCommit.commit.author.date,
        repo: firstRepo.name,
        avatarUrl: avatarUrl,
        userUrl: userUrl, // Add the user URL here
        repoUrl: repoUrl, // Add the repo URL here
        commitUrl: commitUrl, // Add the commit URL here
    };
};
