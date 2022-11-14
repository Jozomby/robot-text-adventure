export const Pod1 = {
    "name": "Pod1",
    "type": "pod",
    "describe": {
        "prompt": "The pod is set into the wall, and doesn't quite go all the way to the ceiling. There are lights flashing, but no interface or buttons that you can see.  There are hinges and a handle, so you could probably open it.",
        "prefer": true
    },
    "open": {
        "prompt": "The pod doesn't budge at all.  It must be locked.",
        "context": "RobotSpawningRoom"
    },
    "burn": {
        "prompt": "It doesn't seem to be flammable"
    }
}