import Options from "./Options";
import Organization from "./Organization";
import Repository from "./Repository";
import User from "./User";

export interface RecentSearch {
    user: User,
    repositories: Repository[],
    organizations: Organization[],
    options: Options,
    error: string
  }
  
  export default RecentSearch;
  