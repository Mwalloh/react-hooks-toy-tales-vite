import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
	const [toys, setToys] = useState([]);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		fetch("http://localhost:3001/toys")
			.then((res) => {
				if (!res.ok) {
					throw new Error(`An error occurred with status: ${res.status}`);
				}

				return res.json();
			})
			.then((allToys) => setToys(allToys))
			.catch((error) => console.log(`ERROR: ${error}`));
	}, []);

	function handleClick() {
		setShowForm((showForm) => !showForm);
	}

	return (
		<>
			<Header />
			{showForm ? <ToyForm toys={toys} setToys={setToys}/> : null}
			<div className="buttonContainer">
				<button onClick={handleClick}>Add a Toy</button>
			</div>
			<ToyContainer toys={toys}/>
		</>
	);
}

export default App;
