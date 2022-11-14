export const ConstructionHallway = {
    "name": "ConstructionHallway",
    "door": "DesignRoomDoor",
    "describe": {
        "prompt": "The hallway stretches to the left and right. To the left, it ends in a single door. To the right, it turns and you cannot see beyond that. Behind you is the room where you awoke."
    },
    "back": {
        "prompt": "You return to the room you woke up in.",
        "context": "RobotSpawningRoom"
    },
    "burn": {
        "prompt": "It doesn't seem to be flammable"
    },
    "left": "ConstructionHallwayLeft",
    "right": {"default": "ConstructionHallwayRight", "constructionBarricadeRemoved": "ConstructionHallwayRightNoBarricade"}
}