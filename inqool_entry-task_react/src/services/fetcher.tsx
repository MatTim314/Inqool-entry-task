
import axiosInstance from "./base";
import User from "../types/User";
import Repository from "../types/Repository";

export const getUserData = async (user: string): Promise<User> => {
  const response = await axiosInstance.get(`/users/${user}`);
  
  const returnUser: User = {
    empty: false,
    username: response.data.login,
    bio: response.data.bio,
    avatar_url: response.data.avatar_url,
    following: response.data.following,
    followers: response.data.followers,
    url: response.data.html_url,
  };
  console.log(returnUser);
  return returnUser;
}


export const getUserRepos = async (user: string): Promise<Repository[]> => {
  const response = await axiosInstance.get(`/users/${user}/repos`);

  return [];
};

export const getUserOrgs = async () => {};