import { mapNameToObject } from "./ObjectMapping"

export function applyContext(context, inventory, permissions, object, modifier = null, preferredObject = null) {
    if (preferredObject && preferredObject.name == object) {
        return preferredObject.ref
    }
    if (inventory[object]) {
        return inventory[object]
    }
    if (object == "room") {
        return context
    }
    if (context[object]) {
        if (Array.isArray(context[object])) {
            if (!modifier) {
                throw `Which ${object}? There are ${context[object].length}`
            } else {
                if (modifier == "left" || modifier == "one") {
                    return mapNameToObject(context[object][0], permissions)
                } else if (modifier == "center" || modifier == "two") {
                    return mapNameToObject(context[object][1], permissions)
                } else if (modifier == "three") {
                    return mapNameToObject(context[object][2], permissions)
                } else if (modifier == "four") {
                    return mapNameToObject(context[object][3], permissions)
                } else if (modifier == "five") {
                    return mapNameToObject(context[object][4], permissions)
                } else if (context[object].length == 2 && modifier == "right") {
                    return mapNameToObject(context[object][1], permissions)
                } else if (context[object].length == 3 && modifier == "right") {
                    return mapNameToObject(context[object][2], permissions)
                }
            }
        } else {
            return mapNameToObject(context[object], permissions)
        }
    }
    return null
}