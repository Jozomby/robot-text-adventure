export const RobotSpawningRoom = {
    "name": "RobotSpawningRoom",
    "door": 'RobotSpawningDoor',
    "pod": ["Pod1", {"default": "Pod2", "burn": "Pod2WithBurn"}],
    "lighter": "Lighter",
    "describe": {
        "prompt": "The room is large and lined with two closed pods on the walls.  There is a single door leading from the room.  It is closed."
    },
    "burn": {
        "prompt": "It's an entire room.  You have a tiny lighter.  Good luck with that."
    }
}