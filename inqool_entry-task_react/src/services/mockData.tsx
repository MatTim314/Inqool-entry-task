import { keyframes } from "@emotion/react";
import Repository from "../types/Repository";
import User from "../types/User";
import Organization from "../types/Organization";

export function mockUser() : User{
    let user : User = {
        empty: false,
        username: "Mock",
        bio: "Racism is a sick joke. Why would I hate people of other colors. I simply hate the dumbshit ones.",
        avatar_url: "",
        following: 12,
        followers: 8,
        url: ""
    }
    return user
}

export function mockReposData() : Repository[]{
    return [
        {
            name: "Bing",
            description: "It searches",
            language: "Rust",
            updated_at: "22.07.2023",
            url: "",
            ssh_url: "is this in your clipboard? good"
        },
        {
            name: "Shazam",
            description: "Music at your fingering",
            language: "Python",
            updated_at: "02.01.1998",
            url: "",
            ssh_url: "is this in your clipboard? good"
        }
    ]
}

export function mockOrgsData() : Organization[]{
    return [
        {
            login: "Cool org dot com",
            description: "We are cool, what more you want ahole",
            avatar_url: ""
        },
        {
            login: "Not so cool org",
            description: "Shell company for slovak politicians",
            avatar_url: ""
        }
    ]
}