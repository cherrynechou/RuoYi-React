declare namespace API {

  type Role = {
    roleId: number;
    roleKey: string;
  }

  type CurrentUser = {
    isAdmin: boolean;
    userId: number;
    userName: string;
    nickName: string;
    avatarUrl: string;
    allPermissions?: [];
    admin: boolean;
    roles: string[];
  };

}