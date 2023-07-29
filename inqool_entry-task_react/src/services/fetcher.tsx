
import axiosInstance from "./base";
import User from "../types/User";

export const getUserData = async (user: string): Promise<User> => {
  const response = await axiosInstance.get(`/users/${user}`);
  
  const returnUser: User = {
    empty: false,
    username: response.data.login,
    bio: response.data.bio,
    avatar_url: response.data.avatar_url,
    following: response.data.following,
    followers: response.data.followers,
    url: response.data.url
  }
  console.log(returnUser);
  return returnUser;
}


export const getUserRepos = async () => { }

export const getUserOrgs = async () => {};