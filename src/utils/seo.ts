export const buildLocalUrlFromRelativePath = (pathname: string) => {
  const path = pathname === '/' ? '' : `${pathname}`;
  return `${process.env.NEXT_PUBLIC_ORIGIN}${path}`;
};
