import { useState } from "react"

export const useGameStates = () => {
	const INITIAL_IDLE = 0.05
	const INITIAL_CLICK = 1
	const INITIAL_IDLE_COST = 20
	const INITIAL_CLICK_COST = 20

	const [score, setScore] = useState(0)
	const [idleValue, setIdleValue] = useState(INITIAL_IDLE)
	const [clickValue, setClickValue] = useState(INITIAL_CLICK)
	const [message, setMessage] = useState("")
	const [clickMessages, setClickMessages] = useState([])
	const [idleMenu, setIdleMenu] = useState(false)
	const [clickMenu, setClickMenu] = useState(false)
	const [saveMenu, setSaveMenu] = useState(false)
	const [idleStore, setIdleStore] = useState([])
	const [clickStore, setClickStore] = useState([])
	const [buttonVisible, setButtonVisible] = useState(true)

	return {
        INITIAL_CLICK,
        INITIAL_IDLE,
        INITIAL_IDLE_COST,
        INITIAL_CLICK_COST,
		score,
        setScore,
		idleValue,
        setIdleValue,
		clickValue,
        setClickValue,
		message,
		setMessage,
		clickMessages,
        setClickMessages,
		idleMenu,
		setIdleMenu,
		clickMenu,
		setClickMenu,
		saveMenu,
		setSaveMenu,
		idleStore,
        setIdleStore,
		clickStore,
        setClickStore,
		buttonVisible,
		setButtonVisible,
	}
}
