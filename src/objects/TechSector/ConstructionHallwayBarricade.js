export const ConstructionHallwayBarricade = {
    "name": "ConstructionHallwayBarricade",
    "describe": {
        "prompt": "The barricade is made up mostly of furniture. Everything has been wedged so tightly in place that you don't think you could dismantle it. It reaches all the way up to the ceiling - there's no room to climb across."
    },
    "burn": {
        "prompt": "Even though everything is wood, it's all painted or varnished, and it isn't catching fire."
    },
    "explode": {
        "prompt": "You take out the bomb you picked up earlier and set it near the barricade. You take a deep breath, then use your lighter to light the fuse.",
        "requirePermission": "burn",
        "insufficientPermissionsPrompt": "You fiddle with the bomb for a bit, but can't figure out how to make it go off without some way to light the fuse.",
        "removePermission": "explode",
        "addPermission": "constructionBarricadeRemoved",
        "sequence": {
            "type": "countdown",
            "duration": 5,
            "message": "RUN!",
            "requirement": "leaveRoom",
            "room": "ConstructionHallwayRight",
            "failure": "die",
            "failureMessage": "The explosion rips apart the barricade, and you with it.",
            "success": null,
            "successMessage": "You feel the vibration of the explosion through the floor and the air around you. You stumble, but you're unhurt."
        }
    }
}