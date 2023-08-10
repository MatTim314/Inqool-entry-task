export interface Repository {
  name: string;
  description: string | null;
  language: string | null | undefined;
  updated_at: string | null | undefined;
  url: string | null;
  ssh_url: string | undefined;
}

export default Repository;
