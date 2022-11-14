import Typo from 'typo-js'
import { compareActionWords } from './Actions.js'
import { compareObjectWords } from './Objects.js'
import { compareModifierWords } from './Modifiers.js'

const dictionary = new Typo('en_US', false, false, { dictionaryPath: "https://spellcheck-dictionaries.github.io" })

export function cleanResponse(response) {
    const cleanedResponse = response.replace(/[^\w\s\']|_/g, "")
                                    .replace(/\s+/g, " ");
    // Overrides for specific phrases
    if (cleanedResponse.includes("go back")) {
        return ["back"]
    }
    // End overrides
    const words = cleanedResponse.split(" ").map(word => getCorrectedWord(word))
    return words

}

export function parseResponse(words) {
    return words.reduce((accumulator, word) => {
        const action = compareActionWords(word)
        const object = compareObjectWords(word)
        const modifier = compareModifierWords(word)
        const actions = action ? [ ...accumulator.actions, action ] : accumulator.actions
        const objects = object ? [ ...accumulator.objects, object ] : accumulator.objects
        const modifiers = modifier ? [ ...accumulator.modifiers, modifier ] : accumulator.modifiers
        return {actions: actions, objects: objects, modifiers: modifiers}
    }, {actions: [], objects: [], modifiers: []})
}

const getCorrectedWord = word => {
    const is_spelled_correctly = dictionary.check(word)
    return is_spelled_correctly ? word : dictionary.suggest(word)[0]
}