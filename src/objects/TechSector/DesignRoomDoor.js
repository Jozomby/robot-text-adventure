export const DesignRoomDoor = {
    "name": "DesignRoomDoor",
    "type": "door",
    "describe": {
        "prompt": "The door is solid and metallic in construction.  It is not locked."
    },
    "open": {
        "prompt": "It swings open. You step through into the room beyond.",
        "context": {"default": "DesignRoom", "designRoomExplosive": "DesignRoomGotExplosive"}
    },
    "use": {
        "prompt": "It swings open. You step through into the room beyond.",
        "context": {"default": "DesignRoom", "designRoomExplosive": "DesignRoomGotExplosive"}
    },
    "goto": {
        "prompt": "It swings open. You step through into the room beyond.",
        "context": {"default": "DesignRoom", "designRoomExplosive": "DesignRoomGotExplosive"}
    },
    "burn": {
        "prompt": "It doesn't seem to be flammable"
    }
}