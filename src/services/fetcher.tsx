
import axiosInstance from "./base";
import User from "../types/User";
import Repository from "../types/Repository";
import Organization from "../types/Organization";
import { AxiosResponse } from "axios";




export const getUserData = async (user: string): Promise<User> => {
  const response : AxiosResponse = await axiosInstance.get(`/users/${user}`);
  const orgCount : AxiosResponse = await axiosInstance.get(`/users/${user}/orgs`);

  const returnUser: User = {
    empty: false,
    username: response.data.login,
    bio: response.data.bio,
    avatar_url: response.data.avatar_url,
    following: response.data.following,
    followers: response.data.followers,
    public_repos_count: response.data.public_repos,
    orgs_count: orgCount.data.length,
    url: response.data.html_url,
  };
  return returnUser;
}


export const getUserRepos = async (user: string): Promise<Repository[]> => {

  let repositories: Repository[] = [];
  
  const perPage = 30; // Number of repositories to fetch per page
  let page : number = 1;
  let fetchedRepos : Object[] = [];
  let response : AxiosResponse;

  do {
    response = await axiosInstance.get(
      `/users/${user}/repos?per_page=${perPage}&page=${page}`
    );
    fetchedRepos = fetchedRepos.concat(response.data);
    page++;
  } while (response.data.length === perPage);

  

  let repos: Object[] = fetchedRepos;
  repos.map((repo: any) => {
    const repository: Repository = {
      name: repo["name"],
      description: repo["description"],
      language: repo["language"],
      updated_at : repo["updated_at"],
      url: repo["html_url"],
      ssh_url : repo["ssh_url"]
    }
    repository.name = repository.name.toUpperCase();
    let date = new Date(repository.updated_at)
    repository.updated_at = date.toLocaleDateString();
    if (date.toLocaleDateString() == (new Date()).toLocaleDateString()) {
      repository.updated_at = "Today";
    }
    repositories.push(repository);
})

  return repositories;
};

export const getUserOrgs = async (user: string): Promise<Organization[]> => {  
  let organizations: Organization[] = [];

  let response = await axiosInstance.get(`/users/${user}/orgs`);

  let orgs: Object[] = response.data;
  orgs.map((repo: any) => {
    const organization: Organization = {
      login: repo["login"],
      description: repo["description"],
      avatar_url: repo["avatar_url"],
      html_url: `https://github.com/${repo["login"]}`
    };

    organizations.push(organization);
  });

  return organizations;
};;