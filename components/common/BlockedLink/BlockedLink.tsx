import { ReactNode } from 'react';
import Link from 'next/link';

interface ConditionalLinkProps {
  children: ReactNode;
  href: string;
  isBlocked?: boolean;
  className?: string;
}

export const BlockedLink = ({
  children,
  href,
  isBlocked = false,
  className,
}: ConditionalLinkProps) => {
  if (isBlocked) {
    return <span className={className}>{children}</span>;
  }

  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
};
