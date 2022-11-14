export const DesignRoomGotExplosive = {
    "name": "DesignRoom",
    // This is a good opportunity to implement a terminal interface (probably multiple choice interface)
    "terminal": "DesignTerminal",
    "art": {"default": "DesignRoomArt", "burnedDesignRoomArt": "DesignRoomArtBurned"},
    "back": {
        "prompt": "You leave the room through the door you entered by.",
        "context": "ConstructionHallway"
    },
    "describe": {
        "prompt": "The room is on the smaller side, just a few paces across. There's a desk and chair, and some art on the walls. On the desk there is a computer terminal."
    },
    "burn": {
        "prompt": "That doesn't seem like a good idea."
    }
}