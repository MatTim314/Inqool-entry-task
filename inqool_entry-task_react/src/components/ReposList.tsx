import React, { useEffect } from 'react'
import { getUserRepos } from "../services/fetcher";
import User from '../types/User';
import Repository from '../types/Repository'

interface MyComponentProps {
  user: User;
}

function ReposList({user} : MyComponentProps) {
  let repos = [];

  useEffect(() => {
    const repos: Repository[] = getUserRepos(user.username);
  }, []);
  return (
    <div>ReposList</div>
  )
}

export default ReposList