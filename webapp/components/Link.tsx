import NextLink, { LinkProps } from 'next/link';

export const Link: React.FC<LinkProps & { children?: React.ReactNode }> = (props) => (
  <span className="text-fuchsia-500" css={{ ':hover': { textDecoration: 'underline' } }}>
    <NextLink {...props} />
  </span>
);
