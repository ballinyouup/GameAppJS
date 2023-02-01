export default function RenderApp({
	score,
	idleMultiplier,
	FormatNumber,
	clickMultiplier,
	clickMessages,
	buttonVisible,
	setButtonVisible,
	idleMenu,
	setIdleMenu,
	clickMenu,
	setClickMenu,
	saveMenu,
	setSaveMenu,
	handleClick,
	handleClickUpgrade,
	handleIdleUpgrade,
	idleStore,
	clickStore,
	saveFile,
	loadFile,
	deleteFile,
	message,
	setMessage,
}) {
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
		idleMenu ? setIdleMenu(false) : null
		clickMenu ? setClickMenu(false) : null
		setSaveMenu(!saveMenu)
		setButtonVisible(saveMenu)
	}
	return (
		<div className="flex h-screen w-screen flex-row items-center justify-center gap-2 bg-slate-500 p-2 font-poppins font-medium">
			<div className="flex h-full w-full flex-col place-content-between items-start bg-white p-0 ">
				{/* <----------------------------Top Row-------------------------------------> */}
				<div className="flex h-24 w-full flex-col items-center gap-2 bg-gray-500 p-0">
					<div className=" h-fit w-fit rounded-xl bg-gray-300 bg-opacity-50 p-2">
						<h1>Score: {FormatNumber(score)}</h1>
						<h1>{FormatNumber(idleMultiplier * 20)} Coins/s </h1>
						<h1>{FormatNumber(clickMultiplier)} Coins/click</h1>
					</div>
				</div>
				{/* <----------------------------Center Row-------------------------------------> */}
				<div className="flex h-full w-full flex-col items-center justify-end overflow-scroll bg-white p-2">
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
							className="h-32 w-32 rounded-full bg-gray-400"
							onClick={handleClick}
						>
							Click!
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
						<div className="z-20 flex h-full w-full flex-col p-3 text-sm">
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
						<div className="absolute bottom-12 z-20 flex h-1/2 w-full flex-col bg-gray-500 p-3 text-sm md:bottom-16 md:h-[360px] md:w-[580px]">
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
						<div className="absolute top-1/2 z-30 flex h-40 -translate-y-1/2 flex-col items-center justify-center bg-slate-700 p-3 text-xl text-white">
							{message}
							<button className="text-3xl" onClick={() => setMessage("")}>
								X
							</button>
						</div>
					)}
				</div>
				{/* <-----------------------Bottom Row - Menu Items --------------------->*/}
				<div className="flex h-12 w-full flex-row items-start justify-center bg-gray-400 p-0">
					<button
						onClick={handleClickMenu}
						className="box-border h-12 w-40 border border-gray-500"
					>
						Click Menu
					</button>
					<button
						onClick={handleIdleMenu}
						className="box-border h-12 w-40 border border-gray-500"
					>
						Idle Menu
					</button>
					<button
						onClick={handleSaveMenu}
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
