export function isObjectVisible(permissions, object) {
    if (object.visibility) {
        if (permissions[object.visibility]) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}

export function isActionUnlocked(permissions, action) {
    return !!permissions[action]
}

export const defaultActions = {
    describe: true,
    open: true,
    get: true,
    goto: true,
    back: true,
    use: true
}
