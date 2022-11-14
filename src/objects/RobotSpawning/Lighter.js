export const Lighter = {
    "name": "Lighter",
    "visibility": "GetLighter",
    "describe": {
        "prompt": "A handheld lighter. When you press the button, it emits a small flame from the top."
    },
    "get": {
        "prompt": "You pick up the lighter. This should come in handy if you find anything flammable.",
        "addInventory": "Lighter",
        "addPermission": "burn",
        "removePermission": "GetLighter"
    },
    "burn": {
        "prompt": "It doesn't seem to be flammable"
    }
}