import { useState, useEffect } from "react"

export default function App() {
	const [score, setScore] = useState(0)
	const [idleMultiplier, setIdleMultiplier] = useState(0.05)
	const [clickMultiplier, setClickMultiplier] = useState(1)
	const [message, setMessage] = useState("")
	const [clickMessages, setClickMessages] = useState([])
	const clickMessagesLength = 5
	const [idleMenu, setIdleMenu] = useState(false)
	const [clickMenu, setClickMenu] = useState(false)
	const [saveMenu, setSaveMenu] = useState(false)
	const [idleStore, setIdleStore] = useState([
		{
			name: "Idle Upgrade 1",
			cost: 20,
			multiplier: 1.05,
			level: 0,
		},
		{
			name: "Idle Upgrade 2",
			cost: 1000,
			multiplier: 1.3,
			level: 0,
		},
		{
			name: "Idle Upgrade 3",
			cost: 10000,
			multiplier: 1.5,
			level: 0,
		},
		{
			name: "Idle Upgrade 4",
			cost: 500000,
			multiplier: 1.75,
			level: 0,
		},
		{
			name: "Idle Upgrade 5",
			cost: 10000000,
			multiplier: 2,
			level: 0,
		},
	])
	const [clickStore, setClickStore] = useState([
		{
			name: "Click Upgrade 1",
			cost: 20,
			multiplier: 1.1,
			level: 0,
		},
		{
			name: "Click Upgrade 2",
			cost: 1000,
			multiplier: 1.2,
			level: 0,
		},
		{
			name: "Click Upgrade 3",
			cost: 10000,
			multiplier: 1.6,
			level: 0,
		},
		{
			name: "Click Upgrade 4",
			cost: 500000,
			multiplier: 1.8,
			level: 0,
		},
		{
			name: "Click Upgrade 5",
			cost: 10000000,
			multiplier: 2,
			level: 0,
		},
	])
	const increaseScore = (multiplier) => {
		setScore(score + multiplier)
	}

	function handleClick() {
		increaseScore(clickMultiplier)
		if (clickMessages.length === clickMessagesLength) {
			clickMessages[0] = <span key={0}>{clickMultiplier}</span>
		} else {
			setClickMessages([
				...clickMessages,
				<span key={clickMessages.length}>{clickMultiplier}</span>,
			])
		}
	}

	function handleIdleUpgrade(upgradeName) {
		if (score > upgradeName.cost) {
			const updatedStore = idleStore.map((upgrade) => {
				if (upgrade === upgradeName) {
					return {
						...upgrade,
						cost: upgrade.cost * 2,
						level: upgrade.level + 1,
					}
				}
				return upgrade
			})
			setIdleStore(updatedStore)
			setScore(score - upgradeName.cost)
			setIdleMultiplier(idleMultiplier * upgradeName.multiplier)
		} else setMessage("Not enough Money")
	}

	function handleClickUpgrade(upgradeName) {
		if (score > upgradeName.cost) {
			const updatedStore = clickStore.map((upgrade) => {
				if (upgrade === upgradeName) {
					return {
						...upgrade,
						cost: upgrade.cost * 2,
						level: upgrade.level + 1,
					}
				}
				return upgrade
			})
			setClickStore(updatedStore)
			setScore(score - upgradeName.cost)
			setClickMultiplier(clickMultiplier * upgradeName.multiplier)
		} else setMessage("Not enough Money")
	}

	const saveFile = () => {
		const gameData = {
			score: score,
			idleMultiplier: idleMultiplier,
			clickMultiplier: clickMultiplier,
		}
		localStorage.setItem("gameData", JSON.stringify(gameData))
		setMessage("Game Saved")
	}

	const loadFile = () => {
		const gameData = JSON.parse(localStorage.getItem("gameData"))
		setScore(gameData.score)
		setIdleMultiplier(gameData.idleMultiplier)
		setClickMultiplier(gameData.clickMultiplier)
		setMessage("Game Loaded")
	}

	const deleteFile = () => {
		localStorage.removeItem("gameData")
		setMessage("Game Data Deleted")
	}

	useEffect(() => {
		// useEffect hook to set up an interval which increases score by idleMultiplier every 50ms
		const timer = setInterval(() => increaseScore(idleMultiplier), 50)
		// return value of useEffect is used to clear the interval when score changes
		return () => clearInterval(timer)
	}, [score])

	useEffect(() => {
		let timerId
		if (clickMessages.length) {
			timerId = setTimeout(() => {
				setClickMessages(clickMessages.slice(1))
			}, 300)
		}
		return () => {
			clearTimeout(timerId)
		}
	}, [clickMessages])

	return (
		<div className="flex h-screen w-screen flex-row items-center justify-center gap-2 bg-slate-500 p-2 font-poppins">
			<div className="flex h-full w-full flex-col place-content-between items-start bg-white p-0 md:h-[800px] md:w-[580px]">
				{/* <----------------------------Top Row-------------------------------------> */}
				<div className="flex h-24 w-full flex-col items-center gap-2 bg-gray-500 p-0">
					<div className=" h-fit w-fit rounded-xl bg-gray-300 bg-opacity-50 p-2">
						<h1>Score: {Number(score).toFixed(1)}</h1>
						<h1>{Number(idleMultiplier * 20).toFixed(1)} Coins/s </h1>
						<h1>{Number(clickMultiplier).toFixed(1)} Coins/click</h1>
					</div>
				</div>
				{/* <----------------------------Center Row-------------------------------------> */}
				<div className="z-0 flex h-full w-full flex-col items-center justify-end bg-white p-2">
					{clickMessages.map((msg, index) => {
						return (
							<span
								key={index}
								className="absolute bottom-[30%] animate-slideup text-2xl text-black md:bottom-[45%]"
							>
								{Number(msg).toFixed(1)}
							</span>
						)
					})}
					{/* <----------------------------Click Button-------------------------------------> */}
					<button
						className="h-32 w-32 rounded-full bg-gray-400"
						onClick={handleClick}
					>
						Click!
					</button>
					{idleMenu && (
						/* Displays a button for each object in ClickStore */
						<div className="absolute bottom-12 flex h-1/2 w-full flex-col bg-gray-500 p-3 text-sm md:bottom-16 md:h-[360px] md:w-[580px]">
							{idleStore.map((upgrade) => (
								<div className="flex flex-row bg-gray-300 px-5 py-3">
									<span className="mr-auto w-fit text-left">
										Level: {upgrade.level + " / "}
										Price: {upgrade.cost + " / "}
										<br />
										Multiplier: {upgrade.multiplier}
									</span>
									<button
										className="rounded-xl bg-gray-600 p-2 text-right text-white"
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
						<div className="absolute bottom-12 flex h-1/2 w-full flex-col bg-gray-500 p-3 text-sm md:bottom-16 md:h-[360px] md:w-[580px]">
							{clickStore.map((upgrade) => (
								<div className="flex flex-row bg-gray-300 px-5 py-3">
									<span className="mr-auto w-fit text-left">
										Level: {upgrade.level + " / "}
										Price: {upgrade.cost + " / "}
										<br />
										Multiplier: {upgrade.multiplier}
									</span>
									<button
										className="rounded-xl bg-gray-600 p-2 text-right text-white"
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
						<div className="absolute top-1/2 left-1/2 flex -translate-x-2/4 -translate-y-1/2 flex-col items-center justify-end bg-slate-700">
							{message}
							<button onClick={() => setMessage("")}> X </button>
						</div>
					)}
				</div>
				{/* <-----------------------Bottom Row - Menu Items --------------------->*/}
				<div className="flex h-12 w-full flex-row items-start bg-gray-400 p-0">
					<button
						onClick={() => {
							idleMenu && setIdleMenu(false)
							saveMenu && setSaveMenu(false)
							setClickMenu(!clickMenu)
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
