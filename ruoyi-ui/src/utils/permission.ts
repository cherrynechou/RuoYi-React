export function matchPermission(permissions: string[] | undefined, value: any): boolean {
  if (permissions === undefined) return false;
  const type = typeof value;
  if (type === 'string') {
    return matchPerm(permissions, value);
  }
  return matchPerms(permissions, value);
}

export function matchPerm(permissions: string[], checkValue: string) {
  if (checkValue && checkValue.length > 0) {
    const all_permission = '*:*:*';
    const hasPermission = permissions.some((permission) => {
      return all_permission === permission || checkValue === permission;
    });

    if (!hasPermission) {
      return false;
    }
    return true;
  }
  return false;
}

// /**
//  * 字符权限校验
//  * @param {Array} value 校验值
//  * @returns {Boolean}
//  */
export function matchPerms(permissions: string[], checkValues: string[]) {
  if (checkValues && checkValues.length > 0) {
    const all_permission = '*:*:*';
    const hasPermission = permissions.some((permission) => {
      return all_permission === permission || checkValues.includes(permission);
    });
    if (!hasPermission) {
      return false;
    }
    return true;
  }
  return false;
}



/**
 * 角色权限校验
 * @param roles
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkRole(roles: API.Role[] | undefined, value: string[]) {
  if (roles && value && value.length > 0) {
    for (let i = 0; i < roles?.length; i++) {
      for (let j = 0; j < value?.length; j++) {
        if (value[j] === roles[i].roleKey) {
          return true;
        }
      }
    }
  }
  console.error(`need roles! Like checkRole="['admin','editor']"`);
  return false;
}
