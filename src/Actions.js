// The list of available actions.  Keep this up-to-date!  Every object should implement these actions.
//
// describe
// use
// open
// get
// goto
// back
// burn
// explode


exports.compareActionWords = word => {
    return words[word]
}

const words = {
    "open": "open",
    "opens": "open",
    "use": "use",
    "press": "use",
    "sit": "use",
    "login": "use",
    "log": "use",
    "sign": "use",
    "sigin": "use",
    "get": "get",
    "grab": "get",
    "pick": "get",
    "retrieve": "get",
    "take": "get",
    "describe": "describe",
    "look": "describe",
    "see": "describe",
    "around": "describe",
    "appear": "describe",
    "go": "goto",
    "goo": "goto",
    "walk": "goto",
    "approach": "goto",
    "turn": "goto",
    "back": "back",
    "leave": "back",
    "depart": "back",
    "backward": "back",
    "backwards": "back",
    "return": "back",
    "run": "back",
    "burn": "burn",
    "ignite": "burn",
    "light": "burn",
    "fire": "burn",
    "inflame": "burn",
    "explode": "explode",
    "blow": "explode",
    "detonate": "explode"
}