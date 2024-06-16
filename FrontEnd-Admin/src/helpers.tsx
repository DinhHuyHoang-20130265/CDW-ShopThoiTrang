export function checkPermission(permissionsCheck: string[], permission: string): boolean {
    return permissionsCheck.indexOf("ROLE_SUPER_ADMIN") > -1 || (permissionsCheck.indexOf(permission) > -1 && permissionsCheck.indexOf("ROLE_ADMIN") > -1);
}
