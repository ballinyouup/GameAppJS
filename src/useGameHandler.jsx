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

	function FormatNumber(
		number,
		letters = [
			"K",
			"M",
			"B",
			"T",
			"q",
			"Q",
			"s",
			"S",
			"N",
			"D",
			"aa",
			"AA",
			"bb",
			"BB",
			"cc",
			"CC",
			"dd",
			"DD",
			"ee",
			"EE",
			"ff",
			"FF",
			"gg",
			"GG",
			"hh",
			"HH",
			"ii",
			"II",
			"jj",
			"JJ",
			"kk",
			"KK",
			"ll",
			"LL",
			"mm",
			"MM",
			"nn",
			"NN",
			"oo",
			"OO",
			"pp",
			"PP",
			"qq",
			"QQ",
			"rr",
			"RR",
			"ss",
			"SS",
			"tt",
			"TT",
			"uu",
			"UU",
			"vv",
			"VV",
			"ww",
			"WW",
			"xx",
			"XX",
			"yy",
			"YY",
			"zz",
			"ZZ",
		]
	) {
		let result = number
		let letter = ""
		for (let i = 0; i < letters.length; i++) {
			if (number >= Math.pow(10, (i + 1) * 3)) {
				result = number / Math.pow(10, (i + 1) * 3)
				letter = letters[i]
			} else {
				break
			}
		}
		return Number(result).toFixed(1) + letter
	}

	function handleIdleUpgrade(upgradeName) {
		setClickMessages([])
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
		setClickMessages([])
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
		const timer = setTimeout(() => {
			clickMessages.length < 11
				? setClickMessages(clickMessages.slice(1))
				: setClickMessages([])
		}, 200)
		return () => {
			clearTimeout(timer)
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
