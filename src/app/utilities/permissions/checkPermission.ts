export function checkPermission(permissionToCheck) {
  let permissions: Array<string> = JSON.parse(localStorage.getItem('permissions'));
  if (!permissions) {
    permissions = [];
  }
  let permissionExist = permissions.filter((permission) => {
    return permission == permissionToCheck;
  });

  return permissionExist.length > 0;
}
