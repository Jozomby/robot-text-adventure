export const Pod2 = {
    "name": "Pod2",
    "type": "pod",
    "describe": {
        "prompt": "The pod is set into the wall, and doesn't quite go all the way to the ceiling. While the other pod has flashing lights, this one does not. There are hinges and a handle, so you could probably open it.",
        "prefer": true
    },
    "open": {
        "prompt": "The front of the pod swings open easily, revealing an open interior that is empty except for a lighter lying at the bottom.",
        "addPermission": "GetLighter"
    },
    "burn": {
        "prompt": "It doesn't seem to be flammable"
    }
}