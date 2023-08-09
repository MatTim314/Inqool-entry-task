export interface User {
    empty: boolean,
  username: string;
  bio: string;
  avatar_url: string;
  following: number;
  followers: number;
  public_repos_count: number;
  orgs_count: number,
  url: string;
}


export default User;