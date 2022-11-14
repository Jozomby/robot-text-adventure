import { RobotSpawningDoor } from './objects/RobotSpawning/RobotSpawningDoor'
import { RobotSpawningRoom } from './objects/RobotSpawning/RobotSpawningRoom'
import { Pod1 } from './objects/RobotSpawning/Pod1'
import { Pod2 } from './objects/RobotSpawning/Pod2'
import { Pod2WithBurn } from './objects/RobotSpawning/Pod2WithBurn'
import { Lighter } from './objects/RobotSpawning/Lighter'
import { ConstructionHallway } from './objects/TechSector/ConstructionHallway'
import { ConstructionHallwayLeft } from './objects/TechSector/ConstructionHallwayLeft'
import { DesignRoomDoor } from './objects/TechSector/DesignRoomDoor'
import { DesignRoom } from './objects/Design/DesignRoom'
import { DesignRoomGotExplosive } from './objects/Design/DesignRoomGotExplosive'
import { DesignRoomArt } from './objects/Design/DesignRoomArt'
import { DesignRoomArtBurned } from './objects/Design/DesignRoomArtBurned'
import { DesignRoomExplosive } from './objects/Design/DesignRoomExplosive'
import { DesignTerminalConversation } from './objects/Design/DesignTerminalConversation'
import { DesignTerminal } from './objects/Design/DesignTerminal'
import { ConstructionHallwayRight } from './objects/TechSector/ConstructionHallwayRight'
import { ConstructionHallwayBarricade } from './objects/TechSector/ConstructionHallwayBarricade'
import { ConstructionHallwayRightNoBarricade } from './objects/TechSector/ConstructionHallwayRightNoBarricade'

export function mapNameToObject(name, permissions) {
    if (typeof(name) == "string") {
        return mapping[name]
    } else {
        const permissionedName = Object.keys(name).reduce((accumulator, key) => {
            if (permissions[key]) {
                return name[key]
            } else {
                return accumulator
            }
        }, name.default)
        return mapping[permissionedName]
    }
}

const mapping = {
    'RobotSpawningDoor': RobotSpawningDoor,
    'RobotSpawningRoom': RobotSpawningRoom,
    'Pod1': Pod1,
    'Pod2': Pod2,
    'Pod2WithBurn': Pod2WithBurn,
    'Lighter': Lighter,
    'ConstructionHallway': ConstructionHallway,
    'ConstructionHallwayLeft': ConstructionHallwayLeft,
    'DesignRoomDoor': DesignRoomDoor,
    'DesignRoom': DesignRoom,
    'DesignRoomGotExplosive': DesignRoomGotExplosive,
    'DesignRoomArt': DesignRoomArt,
    'DesignRoomArtBurned': DesignRoomArtBurned,
    'DesignRoomExplosive': DesignRoomExplosive,
    'DesignTerminal': DesignTerminal,
    'DesignTerminalConversation': DesignTerminalConversation,
    'ConstructionHallwayRight': ConstructionHallwayRight,
    'ConstructionHallwayBarricade': ConstructionHallwayBarricade,
    'ConstructionHallwayRightNoBarricade': ConstructionHallwayRightNoBarricade
}