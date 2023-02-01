import { useState, useEffect } from "react"
import RenderApp from "./RenderApp"

export default function App() {
	const INITIAL_IDLE = 0.05
	const INITIAL_CLICK = 1
	const INITIAL_CLICKMSG_LENGTH = 3
	const INITIAL_IDLE_COST = 20
	const INITIAL_CLICK_COST = 20

	const [score, setScore] = useState(0)
	const [idleMultiplier, setIdleMultiplier] = useState(INITIAL_IDLE)
	const [clickMultiplier, setClickMultiplier] = useState(INITIAL_CLICK)
	const [message, setMessage] = useState("")
	const [clickMessages, setClickMessages] = useState([])
	const clickMessagesLength = INITIAL_CLICKMSG_LENGTH
	const [idleMenu, setIdleMenu] = useState(false)
	const [clickMenu, setClickMenu] = useState(false)
	const [saveMenu, setSaveMenu] = useState(false)
	const [idleStore, setIdleStore] = useState([])
	const [clickStore, setClickStore] = useState([])
	const [buttonVisible, setButtonVisible] = useState(true)

	function createClickStore(num) {
		const store = []
		for (
			let i = clickStore.length === 0 ? 1 : clickStore.length - 1;
			i <= clickStore.length + num;
			i++
		) {
			store.push({
				name: `Click Upgrade ${i}`,
				cost: INITIAL_CLICK_COST * Math.pow(10, i - 1),
				multiplier: Number(1.15 + (i - 1) * 0.05).toFixed(2),
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
			let i = idleStore.length === 0 ? 1 : idleStore.length - 1;
			i <= idleStore.length + num;
			i++
		) {
			store.push({
				name: `Idle Upgrade ${i}`,
				cost: INITIAL_IDLE_COST * Math.pow(10, i - 1),
				multiplier: Number(1.1 + (i - 1) * 0.05).toFixed(2),
				level: 0,
			})
		}
		if (store.length > 0) {
			setIdleStore([...idleStore, ...store])
		} else {
			setIdleStore(idleStore)
		}
	}

	function increaseScore(multiplier) {
		setScore(score + multiplier)
	}

	function handleClick() {
		increaseScore(clickMultiplier)
		setClickMessages([
			...clickMessages,
			<span key={clickMessages.length}>
				{"+" + FormatNumber(clickMultiplier)}
			</span>,
		])
	}

	function FormatNumber(number) {
		const ONEK = 1000
		const MIL = ONEK * 100
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
			case number < ONEK - 1:
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
		if (score > upgradeName.cost) {
			setScore(score - upgradeName.cost)
			const updatedStore = idleStore.map((upgrade, index) => {
				if (upgrade === upgradeName) {
					if (upgrade.level % 20 === 0) {
						return {
							...upgrade,
							cost: Number(upgrade.cost * 2).toFixed(1),
							multiplier: Number(upgrade.multiplier * 1.1).toFixed(2),
							level: upgrade.level + 1,
						}
					} else {
						return {
							...upgrade,
							cost: Number(upgrade.cost * 1.5).toFixed(1),
							level: upgrade.level + 1,
						}
					}
				}
				return upgrade
			})
			setIdleMultiplier(idleMultiplier * upgradeName.multiplier)
			setIdleStore(updatedStore)
		} else {
			setMessage("Not enough Money")
		}
	}

	function handleClickUpgrade(upgradeName) {
		if (score > upgradeName.cost) {
			setScore(score - upgradeName.cost)

			const updatedStore = clickStore.map((upgrade, index) => {
				if (upgrade === upgradeName) {
					if (upgrade.level % 20 === 0) {
						return {
							...upgrade,
							cost: Number(upgrade.cost * 2).toFixed(1),
							multiplier: Number(upgrade.multiplier * 1.1).toFixed(2),
							level: upgrade.level + 1,
						}
					} else {
						return {
							...upgrade,
							cost: Number(upgrade.cost * 1.5).toFixed(1),
							level: upgrade.level + 1,
						}
					}
				}
				return upgrade
			})
			setClickMultiplier(clickMultiplier * upgradeName.multiplier)
			setClickStore(updatedStore)
		} else setMessage("Not enough Money")
	}

	const saveFile = () => {
		const gameData = {
			score: score,
			idleMultiplier: idleMultiplier,
			clickMultiplier: clickMultiplier,
			idleStore: idleStore,
			clickStore: clickStore,
		}
		localStorage.setItem("gameData", JSON.stringify(gameData))
		setMessage("Game Saved")
	}

	const loadFile = () => {
		const gameData = JSON.parse(localStorage.getItem("gameData"))
		setScore(gameData.score)
		setIdleMultiplier(gameData.idleMultiplier)
		setClickMultiplier(gameData.clickMultiplier)
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
		// useEffect hook to set up an interval which increases score by idleMultiplier every 50ms
		const timer = setInterval(() => increaseScore(idleMultiplier), 50)
		// return value of useEffect is used to clear the interval when score changes
		return () => clearInterval(timer)
	}, [score])

	useEffect(() => {
		const timer = setInterval(
			() => {
				setClickMessages(clickMessages.slice(1))
			},
			clickMessages.length <= clickMessagesLength ? 200 : 100
		)
		return () => {
			clearInterval(timer)
		}
	}, [clickMessages])

	return (
		<>
			<RenderApp
				score={score}
				idleMultiplier={idleMultiplier}
				FormatNumber={FormatNumber}
				clickMultiplier={clickMultiplier}
				clickMessages={clickMessages}
				buttonVisible={buttonVisible}
				setButtonVisible={setButtonVisible}
				idleMenu={idleMenu}
				setIdleMenu={setIdleMenu}
				clickMenu={clickMenu}
				setClickMenu={setClickMenu}
				saveMenu={saveMenu}
				setSaveMenu={setSaveMenu}
				handleClick={handleClick}
				handleClickUpgrade={handleClickUpgrade}
				handleIdleUpgrade={handleIdleUpgrade}
				setIdleStore={setIdleStore}
				clickStore={clickStore}
				idleStore={idleStore}
				saveFile={saveFile}
				loadFile={loadFile}
				deleteFile={deleteFile}
				message={message}
				setMessage={setMessage}
			/>
		</>
	)
}
