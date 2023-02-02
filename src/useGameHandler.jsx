import { useEffect } from "react"
import { useGameStates } from "./useGameStates"

export const useGameHandler = () => {
	const {
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
	} = useGameStates()

	function createClickStore(num) {
		const store = []
		for (
			let i = clickStore.length === 0 ? 1 : clickStore.length + 1;
			i <= clickStore.length + num;
			i++
		) {
			store.push({
				name: `Click Upgrade ${i}`,
				cost: INITIAL_CLICK_COST * Math.pow(10, i - 1),
				value: Math.pow(10, i - 1),
				level: 0,
			})
		}
		if (store.length > 0) {
			setClickStore([...clickStore, ...store])
		} else {
			setClickStore(clickStore)
		}
	}

	function createIdleStore(num) {
		const store = []
		for (
			let i = idleStore.length === 0 ? 1 : idleStore.length + 1;
			i <= idleStore.length + num;
			i++
		) {
			store.push({
				name: `Idle Upgrade ${i}`,
				cost: INITIAL_IDLE_COST * Math.pow(10, i - 1),
				value: Math.pow(10, i - 1) / 20,
				level: 0,
			})
		}
		if (store.length > 0) {
			setIdleStore([...idleStore, ...store])
		} else {
			setIdleStore(idleStore)
		}
	}

	function increaseScore(value) {
		setScore(score + value)
	}

	function handleClick() {
		increaseScore(clickValue)
		setClickMessages([
			...clickMessages,
			<span key={clickMessages.length}>{"+" + FormatNumber(clickValue)}</span>,
		])
	}

	function FormatNumber(number) {
		const ONEK = 1000
		const MIL = ONEK * ONEK
		const BIL = MIL * ONEK
		const TRIL = BIL * ONEK
		const QUAD = TRIL * ONEK
		const QUINT = QUAD * ONEK
		const SEXT = QUINT * ONEK
		const SEPT = SEXT * ONEK
		const OCTI = SEPT * ONEK
		const NONI = OCTI * ONEK
		const DECI = NONI * ONEK
		switch (true) {
			case number < ONEK:
				return Number(number).toFixed(2)
			case number < MIL:
				return Number(number / ONEK).toFixed(1) + "K"
			case number < BIL:
				return Number(number / MIL).toFixed(1) + "M"
			case number < TRIL:
				return Number(number / BIL).toFixed(1) + "B"
			case number < QUAD:
				return Number(number / TRIL).toFixed(1) + "T"
			case number < QUINT:
				return Number(number / QUAD).toFixed(1) + "q"
			case number < SEXT:
				return Number(number / QUINT).toFixed(1) + "Q"
			case number < SEPT:
				return Number(number / SEXT).toFixed(1) + "sx"
			case number < OCTI:
				return Number(number / SEPT).toFixed(1) + "Sp"
			case number < NONI:
				return Number(number / OCTI).toFixed(1) + "Oc"
			case number < DECI:
				return Number(number / NONI).toFixed(1) + "Non"
			case number > DECI:
				return Number(number / DECI).toFixed(1) + "D"
			default:
				return Number(number).toFixed(2)
		}
	}

	function handleIdleUpgrade(upgradeName) {
		if (score >= upgradeName.cost) {
			setScore(score - upgradeName.cost)
			const updatedStore = idleStore.map((upgrade) => {
				if (upgrade === upgradeName) {
					return {
						...upgrade,
						cost: Number(upgrade.cost * 1.25).toFixed(2),
						level: upgrade.level + 1,
					}
				}
				return upgrade
			})

			if (upgradeName.level === 9) {
				setIdleValue(idleValue * 2)
				setIdleStore(updatedStore)
			} else {
				setIdleValue(idleValue + upgradeName.value)
				setIdleStore(updatedStore)
			}
		} else {
			setMessage("Not enough Money")
		}
	}

	function handleClickUpgrade(upgradeName) {
		if (score >= upgradeName.cost) {
			setScore(score - upgradeName.cost)
			const updatedStore = clickStore.map((upgrade) => {
				if (upgrade === upgradeName) {
					return {
						...upgrade,
						cost: Number(upgrade.cost * 1.25).toFixed(2),
						level: upgrade.level + 1,
					}
				}
				return upgrade
			})
			if (upgradeName.level === 9) {
				setClickValue(clickValue * 2)
				setClickStore(updatedStore)
			} else {
				setClickValue(clickValue + upgradeName.value)
				setClickStore(updatedStore)
			}
		} else setMessage("Not enough Money")
	}

	const saveFile = () => {
		const gameData = {
			score: score,
			idleValue: idleValue,
			clickValue: clickValue,
			idleStore: idleStore,
			clickStore: clickStore,
		}
		localStorage.setItem("gameData", JSON.stringify(gameData))
		setMessage("Game Saved")
	}

	const loadFile = () => {
		const gameData = JSON.parse(localStorage.getItem("gameData"))
		setScore(gameData.score)
		setIdleValue(gameData.idleValue)
		setClickValue(gameData.clickValue)
		setIdleStore(gameData.idleStore)
		setClickStore(gameData.clickStore)
		setMessage("Game Loaded")
	}

	const deleteFile = () => {
		localStorage.removeItem("gameData")
		setMessage("Game Data Deleted")
	}

	useEffect(() => {
		createIdleStore(5)
		createClickStore(5)
	}, [])

	useEffect(() => {
		if (idleStore.length > 0 && idleStore[idleStore.length - 1].level === 1) {
			createIdleStore(5)
		}
	}, [idleStore])

	useEffect(() => {
		if (
			clickStore.length > 0 &&
			clickStore[clickStore.length - 1].level === 1
		) {
			createClickStore(5)
		}
	}, [clickStore])

	useEffect(() => {
		// useEffect hook to set up an interval which increases score by idleValue every 50ms
		const timer = setInterval(() => increaseScore(idleValue), 50)
		// return value of useEffect is used to clear the interval when score changes
		return () => clearInterval(timer)
	}, [score])

	useEffect(() => {
		const timer = setInterval(() => {
			setClickMessages(clickMessages.slice(1))
		}, 200)
		return () => {
			clearInterval(timer)
		}
	}, [clickMessages])

	return {
		score,
		idleValue,
		clickValue,
		message,
		setMessage,
		clickMessages,
		idleMenu,
		setIdleMenu,
		clickMenu,
		setClickMenu,
		saveMenu,
		setSaveMenu,
		idleStore,
		clickStore,
		buttonVisible,
		setButtonVisible,
		handleClick,
		FormatNumber,
		handleIdleUpgrade,
		handleClickUpgrade,
		saveFile,
		loadFile,
		deleteFile,
	}
}
