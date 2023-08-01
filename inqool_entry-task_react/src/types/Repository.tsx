export interface Repository {
  empty: boolean;
  username: string;
  bio: string;
  avatar_url: string;
  following: number;
  followers: number;
  url: string;
}

export default Repository;
