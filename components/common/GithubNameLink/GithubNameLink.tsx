import styles from './GithubNameLink.module.scss';
import GhIcon from '../../../public/svg/gh-icon.svg';
import clsx from 'clsx';

interface GithubNameLinkProps {
  login: string;
  className?: string;
}

export const GithubNameLink = ({ login, className }: GithubNameLinkProps) => {
  return (
    <a
      data-cypress="ProfileUserGithubLink"
      target="_blank"
      rel="noreferrer noopener"
      className={clsx(styles.ghLink, className)}
      href={`https://github.com/${login}`}
    >
      <span className={styles.ghIcon} role="img" aria-label="Github icon">
        <GhIcon />
      </span>
      <span className={styles.login}>{login}</span>
    </a>
  );
};
