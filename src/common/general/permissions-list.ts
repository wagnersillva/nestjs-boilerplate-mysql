const commonPermissions = ['create', 'read', 'view', 'update'];
const modules = ['user'];

const agroupModulePermission = (moduleName: string, permission: string) => `${moduleName}-${permission}`;

const getCommonCrudPermissions = (moduleName: string) => (
    commonPermissions.map((permission: string) => 
        agroupModulePermission(moduleName, permission)
    )
)

export const getModulesPermissions = () => modules.map(getCommonCrudPermissions).flat();