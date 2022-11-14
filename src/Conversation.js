import { useState, useEffect, useRef, PureComponent } from 'react'
import { ConstructionHallwayLeft } from './objects/TechSector/ConstructionHallwayLeft'

export function Conversation(props) {
    const [current, _setCurrent] = useState(props.conversation.tree)
    const [path, _setPath] = useState([props.conversation.tree])
    const [selected, _setSelected] = useState(0)
    const [listDisplay, _setListDisplay] = useState(null)
    const [tempMessage, _setTempMessage] = useState(null)
    const [savedInventory, _setSavedInventory] = useState(props.savedInventory)
    const currentRef = useRef(current)
    const selectedRef = useRef(selected)
    const pathRef = useRef(path)
    const listDisplayRef = useRef(listDisplay)
    const tempMessageRef = useRef(tempMessage)
    const savedInventoryRef = useRef(savedInventory)
    const setCurrent = value => {
        currentRef.current = value
        if (!!value.options) {
            value.options = value.options.reduce((accumulator, option) => {
                if (option.prompt == "[$UNSAVED_INVENTORY]") {
                    const inventoryKeys = Object.keys(props.inventory)
                    const savedInventoryKeys = Object.keys(savedInventoryRef.current)
                    const unsavedKeys = inventoryKeys.filter(key => !savedInventoryKeys.includes(key))
                    const options = unsavedKeys.map(key => {
                        return { action: "addToSavedInventory", prompt: key }
                    })
                    return [...accumulator, ...options]
                } else {
                    if (Object.keys(savedInventoryRef.current).includes(option.prompt)) {
                        return accumulator
                    } else {
                        return [...accumulator, option]
                    }
                }
            }, [])
            _setCurrent(value)
        } else {
            _setCurrent(value)
        }
    }
    const setSelected = value => {
        selectedRef.current = value
        _setSelected(value)
    }
    const setPath = value => {
        pathRef.current = value
        _setPath(value)
    }
    const setListDisplay = value => {
        listDisplayRef.current = value
        _setListDisplay(value)
    }
    const setTempMessage = value => {
        tempMessageRef.current = value
        _setTempMessage(value)
    }
    const setSavedInventory = value => {
        savedInventoryRef.current = value
        _setSavedInventory(value)
    }

    const onOptionClick = (event) => {
        const optionId = parseInt(event.target.id.substring(6))
        setSelected(optionId)
        selectOption(optionId)
    }

    useEffect(() => {
        const listener = event => {
          if (event.code === "ArrowUp") {
            event.preventDefault()
            const newSelected = selectedRef.current > 0 ? selectedRef.current - 1 : 0
            setSelected(newSelected)
          } else if (event.code === "ArrowDown") {
            event.preventDefault()
            const newSelected = selectedRef.current < currentRef.current.options.length - 2 ? selectedRef.current + 1 : currentRef.current.options.length - 1
            setSelected(newSelected)
          } else if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault()
            selectOption(selectedRef.current)
          }
        }
        document.addEventListener("keydown", listener)
        return () => {
          document.removeEventListener("keydown", listener)
        }
      }, [])


    const selectOption = optionId => {
        setSelected(0)
        setListDisplay(null)
        setTempMessage(null)
        const option = currentRef.current.options[optionId]
        if (option.action == 'converse') {
            setPath([...path, option.converse])
            setCurrent(option.converse)
        } else if (option.action == 'list') {
            const listItems = option.list.reduce((accumulator, listItem) => {
                return accumulator ? accumulator + "\n\n" + listItem : listItem
            }, null)
            setListDisplay(listItems)
        } else if (option.action == 'back') {
            setCurrent(pathRef.current[pathRef.current.length - 2])
            setPath(pathRef.current.slice(0, pathRef.current.length - 1))
        } else if (option.action == "end") {
            props.endConversation(savedInventoryRef.current)
        } else if (option.action == "addToSavedInventory") {
            setSavedInventory({...savedInventoryRef.current, [option.prompt]: true})
            setTempMessage(`${option.prompt} added to schematic`)
            setCurrent({...currentRef.current, options: currentRef.current.options.filter(op => op.prompt != option.prompt)})
        }
    }

    const interpretVars = text => {
        if (text.includes("$SAVED_INVENTORY")) {
            const inventoryString = Object.keys(savedInventory).reduce((accumulator, item) => {
                return `${accumulator}\n${item}`
            }, "\n")
            return text.replaceAll("$SAVED_INVENTORY", inventoryString)
        }
        return text
    }

    return (
        <div>
            <p className="ConversationSequencePrompt">{tempMessage || listDisplay || interpretVars(current.prompt)}</p>
            <ul>
                {
                    current.options.map((option, index) => {
                        const classname = selected == index ? "selectedOption" : ""
                        return <li
                            id={`option${index}`}
                            className={classname}
                            onClick={onOptionClick}
                        >
                            {option.prompt}
                        </li>
                    })
                }
            </ul>
        </div>
    )
}