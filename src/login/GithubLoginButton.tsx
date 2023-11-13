import { FC } from "react";
import github_logo from '../assets/github-mark-white.svg';

import './GithubLoginButton.css';

interface GitHubLoginButtonProps {
  onClick: () => Promise<void>;
}

export const GitHubLoginButton: FC<GitHubLoginButtonProps> = (props: GitHubLoginButtonProps) => {

  return (
    <button onClick={props.onClick} className="gh-login-button">
      <img src={github_logo} height={24} color="white" />
      <span>Log in with GitHub</span>
    </button>
  )
}
