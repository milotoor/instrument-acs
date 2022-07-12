import NextLink, { LinkProps } from 'next/link';

export const Link: React.FC<LinkProps & { children?: React.ReactNode }> = (props) => (
  <span className="text-fuchsia-500 hover:underline">
    <NextLink {...props} />
  </span>
);
