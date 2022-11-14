import './App.css'
import { useRef, useEffect, useState, PureComponent } from 'react'
import { cleanResponse, parseResponse } from './ParseResponse.js'
import { applyContext } from './Context.js'
import { isObjectVisible, isActionUnlocked, defaultActions } from './Permission.js'
import { performAction } from './PerformAction.js'
import { RobotSpawningRoom } from './objects/RobotSpawning/RobotSpawningRoom.js'
import { Conversation } from './Conversation.js'
import { mapNameToObject } from './ObjectMapping'

function App() {
  const [context, _setContext] = useState(RobotSpawningRoom)
  const [prompt, setPrompt] = useState(context.describe.prompt)
  const [response, _setResponse] = useState("")
  const [inventory, _setInventory] = useState({})
  const [savedInventory, _setSavedInventory] = useState({})
  const [permissions, _setPermissions] = useState(defaultActions)
  const [errorState, _setErrorState] = useState(null)
  const [preferredObject, _setPreferredObject] = useState(null)
  const [countdownDisplay, setCountdownDisplay] = useState(null)
  const [showPrompt, setShowPrompt] = useState(true)
  const [conversation, setConversation] = useState(null)
  const responseRef = useRef(response)
  const contextRef = useRef(context)
  const inventoryRef = useRef(inventory)
  const permissionsRef = useRef(permissions)
  const errorStateRef = useRef(errorState)
  const preferredObjectRef = useRef(preferredObject)
  const savedInventoryRef = useRef(savedInventory)
  const setResponse = value => {
    responseRef.current = value
    _setResponse(value)
  }
  const setContext = value => {
    contextRef.current = value
    _setContext(value)
  }
  const setInventory = value => {
    inventoryRef.current = value
    _setInventory(value)
  }
  const setPermissions = value => {
    permissionsRef.current = value
    _setPermissions(value)
  }
  const setErrorState = value => {
    errorStateRef.current = value
    _setErrorState(value)
  }
  const setPreferredObject = value => {
    preferredObjectRef.current = value
    _setPreferredObject(value)
  }
  const setSavedInventory = value => {
    savedInventoryRef.current = value
    _setSavedInventory(value)
  }

  const performSequence = sequence => {
    if (sequence.type != "countdown" && sequence.type != "conversation") {
      console.warn("SEQUENCE NOT YET IMPLEMENTED")
      return null
    } else if (sequence.type == "countdown") {
      setTimeout(() => {
        setCountdownDisplay(sequence.message)
        let countdown = sequence.duration
        let count = 1
        while (countdown >= 1) {
          const localCount = count
          const localCountdown = countdown
          setTimeout(() => {
            setCountdownDisplay(localCountdown)
            if (localCountdown == 1) {
              setTimeout(() => {
                setCountdownDisplay("!!!!!")
                setTimeout(() => {
                  resolveCountdown(sequence)
                }, 1000)
              }, 1000)
            }
          }, 1000 * localCount)
          countdown = countdown - 1
          count = count + 1
        }
      }, 3000)
    } else if (sequence.type == "conversation") {
      setTimeout(() => {
        setShowPrompt(false)
        const conv = mapNameToObject(sequence.name)
        setConversation(conv)
      }, 2000)
    }
  }

  const resolveCountdown = (sequence) => {
    setCountdownDisplay(null)
    if (sequence.requirement == "leaveRoom" && contextRef.current.name != sequence.room) {
      setPrompt(`${sequence.successMessage} ${contextRef.current.describe.prompt}`)
    } else {
      setPrompt(sequence.failureMessage)
      setTimeout(() => {
        die()
      }, 3000)
    }
  }

  const endConversation = (savedInventory) => {
    setConversation(null)
    setPrompt(context.describe.prompt)
    setShowPrompt(true)
    setSavedInventory(savedInventory)
  }

  const die = () => {
    setShowPrompt(false)
    setTimeout(() => {
      setContext(RobotSpawningRoom)
      setPrompt(context.describe.prompt)
      setResponse("")
      // TODO: Saved Inventory should bring permissions along with it
      setInventory(savedInventoryRef.current)
      setPermissions(defaultActions)
      setErrorState(null)
      setPreferredObject(null)
      setCountdownDisplay(null)
      setShowPrompt(true)
    }, 5000)
  }

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault()
        if (errorStateRef.current) {
          const {action, object} = errorStateRef.current
          const words = cleanResponse(responseRef.current)
          const {modifiers} = parseResponse(words)
          const modifier = modifiers[0]
          let contextualObject
          try {
            contextualObject = applyContext(contextRef.current, inventoryRef.current, permissionsRef.current, object, modifier, preferredObjectRef.current)
          } catch (_) {
            setPrompt(`Response not understood. \n ${contextRef.current.describe.prompt}`)
            setResponse("")
            setPreferredObject(null)
            return
          }
          if (!contextualObject) {
            setPrompt(`That doesn't exist here. \n ${contextRef.current.describe.prompt}`)
            setResponse("")
            setPreferredObject(null)
            return
          }
          const permissionedObject = isObjectVisible(permissionsRef.current, contextualObject) ? contextualObject : null
          if (!permissionedObject) {
            setPrompt(`That doesn't exist here. \n ${contextRef.current.describe.prompt}`)
            setResponse("")
            setPreferredObject(null)
            return
          }
          const {updatedPrompt, updatedContext, updatedInventory, updatedPreferredObject, updatedPermissions, sequence} = performAction(action, permissionedObject, contextRef.current, inventoryRef.current, permissionsRef.current)
          if (sequence) {
            performSequence(sequence)
          }
          setContext(updatedContext || contextRef.current)
          setInventory(updatedInventory)
          setPreferredObject(updatedPreferredObject)
          setPermissions(updatedPermissions)
          const promptToSet = updatedContext ? `${updatedPrompt} ${updatedContext.describe.prompt}` : updatedPrompt
          setPrompt(promptToSet)
          setResponse("")
          setErrorState(null)
          return
        }
        const words = cleanResponse(responseRef.current)
        const {actions, objects, modifiers} = parseResponse(words)
        const action = actions[0] || "describe"
        const object = action != "back" ? (objects[0] || preferredObjectRef?.current?.name) : 'room'
        const modifier = modifiers[0]
        const permissionedAction = isActionUnlocked(permissionsRef.current, action) ? action : null
        if (!object || !permissionedAction) {
          setPrompt(`Response not understood. \n ${contextRef.current.describe.prompt}`)
          setResponse("")
          setPreferredObject(null)
          return
        }
        let contextualObject
        try {
          contextualObject = applyContext(contextRef.current, inventoryRef.current, permissionsRef.current, object, modifier, preferredObjectRef.current)
        } catch (err) {
          setPrompt(err)
          setErrorState({ action: permissionedAction, object: object })
          setResponse("")
          setPreferredObject(null)
          return
        }
        if (!contextualObject) {
          setPrompt(`That doesn't exist here. \n ${contextRef.current.describe.prompt}`)
          setResponse("")
          setPreferredObject(null)
          return
        }
        const permissionedObject = isObjectVisible(permissionsRef.current, contextualObject) ? contextualObject : null
        if (!permissionedObject) {
          setPrompt(`That doesn't exist here. \n ${contextRef.current.describe.prompt}`)
          setResponse("")
          setPreferredObject(null)
          return
        }
        const {updatedPrompt, updatedContext, updatedInventory, updatedPreferredObject, updatedPermissions, sequence} = performAction(permissionedAction, permissionedObject, contextRef.current, inventoryRef.current, permissionsRef.current)
        if (sequence) {
          performSequence(sequence)
        }
        setContext(updatedContext || contextRef.current)
        setInventory(updatedInventory)
        setPreferredObject(updatedPreferredObject)
        setPermissions(updatedPermissions)
        const promptToSet = updatedContext ? `${updatedPrompt} ${updatedContext.describe.prompt}` : updatedPrompt
        setPrompt(promptToSet)
        setResponse("")
      }
    }
    document.addEventListener("keydown", listener)
    return () => {
      document.removeEventListener("keydown", listener)
    }
  }, [])

  // TODO: load page with focus on text box
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Robot Game
        </p>
      </header>
      <div className="MidScreen">
        {countdownDisplay !== null && (
          <h1>{countdownDisplay}</h1>
        )}
      </div>
      <div id="Conversation">
        {
          !!conversation && (
            <Conversation
              conversation={conversation}
              endConversation={endConversation}
              inventory={inventory}
              savedInventory={savedInventory}
            />
          )
        }
        {
          showPrompt && (
            <div>
              <p>{prompt}</p>
              <input type="text" value={response} onChange={e=>{setResponse(e.target.value)}} />
            </div>
          )
        }
      </div>

    </div>
  );
}

export default App;
