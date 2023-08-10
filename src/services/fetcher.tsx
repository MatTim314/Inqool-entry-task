import axiosInstance from "./base";
import User from "../types/User";
import Repository from "../types/Repository";
import Organization from "../types/Organization";
import { AxiosResponse } from "axios";
import { Endpoints } from "@octokit/types";

export const getUserData = async (user: string): Promise<User> => {
  type UserResponse = Endpoints["GET /user"]["response"];
  type OrgsListResponse = Endpoints["GET /users/{username}/orgs"]["response"];

  const response: AxiosResponse = await axiosInstance.get<UserResponse>(
    `/users/${user}`
  );
  const orgCount: AxiosResponse = await axiosInstance.get<OrgsListResponse[]>(
    `/users/${user}/orgs`
  );

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
};

export const getUserRepos = async (user: string): Promise<Repository[]> => {
  type RepositoryListResponse = Endpoints["GET /users/{username}/repos"]["response"]["data"];

  const repositories: Repository[] = [];

  const perPage = 30; // Number of repositories to fetch per page
  let page: number = 1;
  let fetchedRepos: RepositoryListResponse = [];
  let response: AxiosResponse;

  do {
    response = await axiosInstance.get<RepositoryListResponse>(
      `/users/${user}/repos?per_page=${perPage}&page=${page}`
    );
    fetchedRepos = response.data;
    repositories.push(
      ...fetchedRepos.map((repo) => {
        const repository: Repository = {
          name: repo.name,
          description: repo.description,
          language: repo.language,
          updated_at: repo.updated_at,
          url: repo.html_url,
          ssh_url: repo.ssh_url,
        };
        repository.name = repository.name.toUpperCase();
        if(repository.updated_at){
          const date = new Date(repository.updated_at);
          repository.updated_at = date.toLocaleDateString();
          if (date.toLocaleDateString() == new Date().toLocaleDateString()) {
            repository.updated_at = "Today";
          }
        }
        return repository;
      })
    );
    page++;
  } while (fetchedRepos.length === perPage);

  return repositories;
};


export const getUserOrgs = async (user: string): Promise<Organization[]> => {
  type OrgsListResponse = Endpoints["GET /users/{username}/orgs"]["response"]["data"]

  const organizations: Organization[] = [];

  const response = await axiosInstance.get<OrgsListResponse>(`/users/${user}/orgs`);

  const orgs: OrgsListResponse = response.data;
  orgs.map((repo) => {
    const organization: Organization = {
      login: repo["login"],
      description: repo["description"],
      avatar_url: repo["avatar_url"],
      html_url: `https://github.com/${repo["login"]}`,
    };


    organizations.push(organization);
  });

  return organizations;
};
