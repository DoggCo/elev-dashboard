import { useState, useEffect, useRef } from "react";

export default function Timer() {
	const Ref = useRef(null);
	const [timer, setTimer] = useState("00:00:00");
	const [desiredTime, setDesiredTime] = useState(3600)

	const start = (e) => {
		const total = Date.parse(e) - Date.parse(new Date());
		if (total <= 0) {
			setTimer("00:00:00");
			return;
		}
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const hours = Math.floor((total / 1000 / 60 / 60) % 24);

		setTimer((hours > 9 ? hours : "0" + hours) +
			":" + (minutes > 9 ? minutes : "0" + minutes) +
			":" + (seconds > 9 ? seconds : "0" + seconds));
	};


	const clear = (e) => {
		const hours = Math.floor(desiredTime / 3600);
		const minutes = Math.floor((desiredTime % 3600) / 60);
		const seconds = desiredTime % 60;
		setTimer(`${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`);

		if (Ref.current) clearInterval(Ref.current);
		const id = setInterval(() => {
			start(e);
		}, 1000)
		Ref.current = id;
	};
	const getDead = () => {
		let dead = new Date();
		dead.setSeconds(dead.getSeconds() + desiredTime);
		return dead;
	}
	useEffect(() => {
		clear(getDead());
	}, [desiredTime])

	const clickReset = () => {
		clear(getDead());
	}
	return (
		<>
			{timer}
			<br />
			<button onClick={clear}>clear</button>
		</>
	)
}