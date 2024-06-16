/**
 * when using [[...catchall]] route, Next generates requested path as ['like', 'this'] or undefined on root.
 * This function converts this uglyness to expected one. (['hi','foo'] -> "/hi/foo")
 */
export const pathParamToPath = (pathParam: string[] | undefined) => {
  return `/${pathParam ? pathParam.join('/') : ''}`;
};
