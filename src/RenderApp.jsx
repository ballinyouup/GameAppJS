import { useGameHandler } from "./useGameHandler"

export default function RenderApp() {
	const {
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
	} = useGameHandler()
	function handleClickMenu() {
		idleMenu && setIdleMenu(false)
		saveMenu && setSaveMenu(false)
		setClickMenu(!clickMenu)
		setButtonVisible(clickMenu)
	}

	function handleIdleMenu() {
		clickMenu && setClickMenu(false)
		saveMenu && setSaveMenu(false)
		setIdleMenu(!idleMenu)
		setButtonVisible(idleMenu)
	}

	function handleSaveMenu() {
		idleMenu && setIdleMenu(false)
		clickMenu && setClickMenu(false)
		setSaveMenu(!saveMenu)
		setButtonVisible(saveMenu)
	}

	return (
		<div className="fixed flex h-full w-full flex-row justify-center gap-2 bg-black p-2 font-poppins font-medium md:items-center">
			<div className="flex w-full flex-col content-between bg-white p-0 md:h-full md:w-1/2">
				{/* <----------------------------Top Row-------------------------------------> */}
				<div className="flex w-full flex-col items-center gap-2 bg-gradient-to-b from-cyan-600 to-blue-800 p-2">
					<div className=" bg-gray h-fit w-fit rounded-xl p-2 text-white">
						<h1>Coins: {FormatNumber(score)}</h1>
						<h1>{FormatNumber(idleValue * 20)} Coins/s </h1>
						<h1>{FormatNumber(clickValue)} Coins/click</h1>
					</div>
				</div>

				{/* <----------------------------Center Row-------------------------------------> */}
				<div className="flex h-full w-full flex-col items-center justify-end overflow-auto">
					{/* <---------------------------Game Container-----------------------------------> */}
					<div className="relative h-full w-full bg-purple-500"></div>
					{clickMessages.map((msg, index) => {
						return (
							<span
								key={index}
								className="absolute bottom-[200px] z-0 animate-slideup text-2xl text-black md:bottom-[200px]"
							>
								{msg}
							</span>
						)
					})}
					{/* <----------------------------Click Button-------------------------------------> */}
					{buttonVisible && (
						<button
							className="h-32 w-full bg-gradient-to-b from-cyan-600 to-blue-800 active:shadow-inner active:shadow-black"
							onClick={handleClick}
						>
							<img className="m-auto h-12 w-12" src="click.png" />
						</button>
					)}
					{idleMenu && (
						/* Displays a button for each object in IdleStore */
						<div className="z-20 flex h-full w-full flex-col p-3 text-sm">
							{idleStore.map((upgrade, index) => (
								<div
									key={index}
									className="flex flex-row bg-gray-300 px-5 py-3"
								>
									<span className="mr-auto w-1/4 text-left">
										Level: {upgrade.level}
										<br />
										Price: {FormatNumber(upgrade.cost)}
										<br />
										Value: {FormatNumber(upgrade.value * 20)}
										<br />
										<div
											className={
												upgrade.level === 0 || upgrade.level === 10
													? "hidden w-full bg-gray-800"
													: "w-full bg-gray-800"
											}
										>
											<div
												className="h-4 bg-green-700"
												style={{
													width: upgrade.level * 10,
												}}
											/>
										</div>
									</span>
									{upgrade.level > 9 ? (
										<span className="h-fit rounded-xl bg-gray-800 p-2 text-right text-white">
											MAX LEVEL
										</span>
									) : (
										<button
											className="w-24 rounded-xl bg-gray-600 p-2 text-right text-white"
											onClick={() => {
												handleIdleUpgrade(upgrade)
											}}
										>
											Buy {upgrade.name}
										</button>
									)}
								</div>
							))}
						</div>
					)}

					{clickMenu && (
						/* Displays a button for each object in ClickStore */
						<div className="z-20 flex h-full w-full flex-col p-3 text-sm">
							{clickStore.map((upgrade, index) => (
								<div
									key={index}
									className="flex flex-row bg-gray-300 px-5 py-3"
								>
									<span className="mr-auto w-1/4 text-left">
										Level: {upgrade.level}
										<br />
										Price: {FormatNumber(upgrade.cost)}
										<br />
										Value: {FormatNumber(upgrade.value * 20)}
										<br />
										<div
											className={
												upgrade.level === 0 || upgrade.level === 10
													? "hidden w-full bg-gray-800"
													: "w-full bg-gray-800"
											}
										>
											<div
												className="h-4 bg-green-700"
												style={{
													width: upgrade.level * 10,
												}}
											/>
										</div>
									</span>
									{upgrade.level > 9 ? (
										<span className="h-fit rounded-xl bg-green-800 p-2 text-right text-white">
											MAX LEVEL
										</span>
									) : (
										<button
											className="w-24 rounded-xl bg-gray-600 p-2 text-right text-white"
											onClick={() => {
												handleClickUpgrade(upgrade)
											}}
										>
											Buy {upgrade.name}
										</button>
									)}
								</div>
							))}
						</div>
					)}

					{saveMenu && (
						<div className="fixed z-20 flex h-1/2 w-11/12 flex-col bg-gray-500 p-3 text-sm sm:w-2/5">
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
						<button
							className="absolute top-1/2 z-30 flex h-40 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-blue-800 p-3 text-xl text-white"
							onClick={() => setMessage("")}
						>
							{message}
							<img className="mt-4 w-10" src="close.png" />
						</button>
					)}
				</div>
				{/* <-----------------------Bottom Row - Menu Items --------------------->*/}
				<div className="flex h-12 w-full flex-row items-center justify-center bg-gradient-to-b from-cyan-600 to-blue-800 p-0 text-white">
					<button
						onClick={handleClickMenu}
						className="box-border h-12 w-full sm:w-40"
					>
						Click Menu
					</button>
					<button
						onClick={handleIdleMenu}
						className="box-border h-12 w-full sm:w-40"
					>
						Idle Menu
					</button>
					<button
						onClick={handleSaveMenu}
						className="box-border h-12 w-full sm:w-40"
					>
						Save Menu
					</button>
				</div>
			</div>
		</div>
	)
}
