import { useState, useEffect } from "react"

export default function App() {
	const INITIAL_IDLE = 0.05
	const INITIAL_CLICK = 1
	const INITIAL_CLICKMSG_LENGTH = 1
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

	function createClickStore() {
		let store = []
		for (let i = 1; i <= 11; i++) {
			store.push({
				name: `Click Upgrade ${i}`,
				cost: INITIAL_CLICK_COST * Math.pow(4, i - 1),
				multiplier: Number(1.1 + (i - 1) * 0.03).toFixed(2),
				level: 0,
			})
		}

		setClickStore(store)
	}

	function createIdleStore() {
		let store = []

		for (let i = 1; i <= 11; i++) {
			store.push({
				name: `Idle Upgrade ${i}`,
				cost: INITIAL_IDLE_COST * Math.pow(4, i - 1),
				multiplier: Number(1.05 + (i - 1) * 0.03).toFixed(2),
				level: 0,
			})
		}

		setIdleStore(store)
	}

	function increaseScore(multiplier) {
		setScore(score + multiplier)
	}

	function handleClick() {
		increaseScore(clickMultiplier)
		setClickMessages([
			...clickMessages,
			<span key={clickMessages.length}>
				{"+" + Number(clickMultiplier).toFixed(2)}
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
				return number.toFixed(2)
		}
	}

	function handleIdleUpgrade(upgradeName) {
		if (score > upgradeName.cost) {
			setScore(score - upgradeName.cost)
			setIdleMultiplier(idleMultiplier * upgradeName.multiplier)
			const updatedStore = idleStore.map((upgrade, index) => {
				if (upgrade === upgradeName) {
					if (index !== 0 && upgrade.level % 20 === 0) {
						return {
							...upgrade,
							cost: Number(upgrade.cost * 1.15).toFixed(1),
							multiplier: Number(upgrade.multiplier * 1.05).toFixed(1),
							level: upgrade.level + 1,
						}
					} else {
						return {
							...upgrade,
							cost: Number(upgrade.cost * 1.15).toFixed(1),
							level: upgrade.level + 1,
						}
					}
				}
				return upgrade
			})
			setIdleStore(updatedStore)
		} else {
			setMessage("Not enough Money")
		}
	}

	function handleClickUpgrade(upgradeName) {
		if (score > upgradeName.cost) {
			setScore(score - upgradeName.cost)
			setClickMultiplier(clickMultiplier * upgradeName.multiplier)
			const updatedStore = clickStore.map((upgrade, index) => {
				if (upgrade === upgradeName) {
					if (index !== 0 && upgrade.level % 20 === 0) {
						return {
							...upgrade,
							cost: Number(upgrade.cost * 1.15).toFixed(1),
							multiplier: Number(upgrade.multiplier * 1.05).toFixed(1),
							level: upgrade.level + 1,
						}
					} else {
						return {
							...upgrade,
							cost: Number(upgrade.cost * 1.15).toFixed(1),
							level: upgrade.level + 1,
						}
					}
				}
				return upgrade
			})
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
		createIdleStore()
		createClickStore()
	}, [])

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
		<div className="flex h-screen w-screen flex-row items-center justify-center gap-2 bg-slate-500 p-2 font-poppins">
			<div className="flex h-full w-full flex-col place-content-between items-start bg-white p-0 ">
				{/* <----------------------------Top Row-------------------------------------> */}
				<div className="flex h-24 w-full flex-col items-center gap-2 bg-gray-500 p-0">
					<div className=" h-fit w-fit rounded-xl bg-gray-300 bg-opacity-50 p-2">
						<h1>Score: {FormatNumber(score)}</h1>
						<h1>{Number(idleMultiplier * 20).toFixed(2)} Coins/s </h1>
						<h1>{Number(clickMultiplier).toFixed(2)} Coins/click</h1>
					</div>
				</div>
				{/* <----------------------------Center Row-------------------------------------> */}
				<div className="z-0 flex h-full w-full flex-col items-center justify-end overflow-scroll bg-white p-2">
					{clickMessages.map((msg, index) => {
						return (
							<span
								key={index}
								className="absolute bottom-[200px] animate-slideup text-2xl text-black md:bottom-[200px]"
							>
								{msg}
							</span>
						)
					})}
					{/* <----------------------------Click Button-------------------------------------> */}
					{buttonVisible && (
						<button
							className="h-32 w-32 rounded-full bg-gray-400"
							onClick={handleClick}
						>
							Click!
						</button>
					)}
					{idleMenu && (
						/* Displays a button for each object in IdleStore */
						<div className="flex h-full w-full flex-col p-3 text-sm">
							{idleStore.map((upgrade, index) => (
								<div
									key={index}
									className="flex flex-row bg-gray-300 px-5 py-3"
								>
									<span className="mr-auto text-left">
										Level: {upgrade.level}
										<br />
										Price: {FormatNumber(upgrade.cost)}
										<br />
										Multiplier: {upgrade.multiplier}
									</span>
									<button
										className="w-24 rounded-xl bg-gray-600 p-2 text-right text-white"
										onClick={() => {
											handleIdleUpgrade(upgrade)
										}}
									>
										Buy {upgrade.name}
									</button>
								</div>
							))}
						</div>
					)}

					{clickMenu && (
						/* Displays a button for each object in ClickStore */
						<div className="flex h-full w-full flex-col p-3 text-sm">
							{clickStore.map((upgrade, index) => (
								<div
									key={index}
									className="flex flex-row bg-gray-300 px-5 py-3"
								>
									<span className="mr-auto w-fit text-left">
										Level: {upgrade.level}
										<br />
										Price: {FormatNumber(upgrade.cost)}
										<br />
										Multiplier: {upgrade.multiplier}
									</span>
									<button
										className="w-24 rounded-xl bg-gray-600 p-2 text-right text-white"
										onClick={() => {
											handleClickUpgrade(upgrade)
										}}
									>
										Buy {upgrade.name}
									</button>
								</div>
							))}
						</div>
					)}

					{saveMenu && (
						<div className="absolute bottom-12 flex h-1/2 w-full flex-col bg-gray-500 p-3 text-sm md:bottom-16 md:h-[360px] md:w-[580px]">
							<button
								className="rounded-xl bg-gray-600 p-2 text-center text-white"
								onClick={saveFile}
							>
								Save
							</button>
							<br />
							<button
								className="rounded-xl bg-gray-600 p-2 text-center text-white"
								onClick={loadFile}
							>
								Load
							</button>
							<br />
							<button
								className="rounded-xl bg-gray-600 p-2 text-center text-white"
								onClick={deleteFile}
							>
								New
							</button>
						</div>
					)}
					{message !== "" && (
						<div className="flex -translate-x-2/4 -translate-y-1/2 flex-col items-center justify-end bg-slate-700 p-3 text-xl text-white">
							{message}
							<button onClick={() => setMessage("")}> X </button>
						</div>
					)}
				</div>
				{/* <-----------------------Bottom Row - Menu Items --------------------->*/}
				<div className="flex h-12 w-full flex-row items-start justify-center bg-gray-400 p-0">
					<button
						onClick={() => {
							idleMenu && setIdleMenu(false)
							saveMenu && setSaveMenu(false)
							setClickMenu(!clickMenu)
							setButtonVisible(clickMenu)
						}}
						className="box-border h-12 w-40 border border-gray-500"
					>
						Click Menu
					</button>
					<button
						onClick={() => {
							clickMenu && setClickMenu(false)
							saveMenu && setSaveMenu(false)
							setIdleMenu(!idleMenu)
							setButtonVisible(idleMenu)
						}}
						className="box-border h-12 w-40 border border-gray-500"
					>
						Idle Menu
					</button>
					<button
						onClick={() => {
							idleMenu ? setIdleMenu(false) : null
							clickMenu ? setClickMenu(false) : null
							setSaveMenu(!saveMenu)
							setButtonVisible(saveMenu)
						}}
						className="box-border h-12 w-40 border border-gray-500"
					>
						Save Menu
					</button>
					<button className="box-border h-12 w-40 border border-gray-500">
						Settings
					</button>
				</div>
			</div>
		</div>
	)
}
