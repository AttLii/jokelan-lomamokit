export const areRelativePathsSame = (url1: string, url2: string) =>
  normalizePath(url1) === normalizePath(url2);

export const normalizePath = (path: string) => {
  // root route is defined to be empty string
  if (path === "") return path;

  let newPath = path;

  // remove starting slash
  if (path.at(0) === "/") {
    newPath = newPath.substring(1);
  }

  // remove trailing slash
  if (newPath.at(-1) === "/") {
    newPath = newPath.substring(0, newPath.length - 1);
  }

  return newPath;
};

export const fixRouteLoaderPathname = (pathname: string) => {
  let newPathname = pathname;
  // make sure pathname has starting slash
  if (newPathname.at(0) !== "/") {
    newPathname = `/${newPathname}`;
  }

  // bail early, if we are dealing with root path
  if (newPathname === "/") {
    return newPathname;
  }

  // remove /q-data.json (qwik link component issue)
  newPathname = newPathname.replace("/q-data.json", "");

  // remove trailing slash
  if (newPathname.at(-1) === "/") {
    newPathname = newPathname.substring(0, newPathname.length - 1);
  }

  return newPathname;
};
