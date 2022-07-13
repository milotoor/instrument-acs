import cn from 'classnames';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

type LinkProps = NextLinkProps & { children?: React.ReactNode; color?: string };

export const Link: React.FC<LinkProps> = ({ color = 'text-fuchsia-500', href, ...rest }) => (
  <span className={cn(color, 'hover:underline')}>
    {href.toString().startsWith('/') ? (
      <NextLink href={href} {...rest} />
    ) : (
      <a target="_blank" href={href.toString()} {...rest} />
    )}
  </span>
);
