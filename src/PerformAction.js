import { mapNameToObject } from './ObjectMapping.js'

export function performAction(action, object, context, inventory, permissions) {
    const results = object[action]
    if (results.requirePermission && !permissions[results.requirePermission]) {
        return {updatedPrompt: results.insufficientPermissionsPrompt, updatedContext: null, updatedInventory: inventory, updatedPreferredObject: null, updatedPermissions: permissions}
    }
    const resultPrompt = results.prompt
    const resultContextName = results.context
    const resultContext = resultContextName ? mapNameToObject(resultContextName, permissions) : null
    const resultInventory = results.addInventory ? {...inventory, [results.addInventory]: true} : inventory
    const resultPreferredObject = results.prefer ? { name: object.type, ref: object } : null
    const addedPermissions = results.addPermission ? { ...permissions, [results.addPermission]: true } : permissions
    const removedPermissions = results.removePermission ? { ...addedPermissions, [results.removePermission]: false } : addedPermissions
    const sequence = results.sequence
    return {updatedPrompt: resultPrompt, updatedContext: resultContext, updatedInventory: resultInventory, updatedPreferredObject: resultPreferredObject, updatedPermissions: removedPermissions, sequence: sequence}
}