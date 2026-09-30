import React, { useState } from "react";

function ToyForm({ toys, setToys }) {
	const [toyName, setToyName] = useState("");
	const [toyImage, setToyImage] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:3001/toys", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: toyName, image: toyImage, likes: 0 }),
			});

			if (!res.ok) {
				throw new Error(`Error occurred with status ${res.status}`);
			}
      
			const newToy = await res.json();

			return setToys([...toys, newToy]);
		} catch (error) {
			console.log(`ERROR while creating image: ${error}`);
		}
	}

	return (
		<div className="container">
			<form className="add-toy-form" onSubmit={handleSubmit}>
				<h3>Create a toy!</h3>
				<input
					type="text"
					name="name"
					value={toyName}
					onChange={(e) => setToyName(e.target.value)}
					placeholder="Enter a toy's name..."
					className="input-text"
				/>
				<br />
				<input
					type="text"
					name="image"
					value={toyImage}
					onChange={(e) => setToyImage(e.target.value)}
					placeholder="Enter a toy's image URL..."
					className="input-text"
				/>
				<br />
				<input
					type="submit"
					name="submit"
					value="Create New Toy"
					className="submit"
				/>
			</form>
		</div>
	);
}

export default ToyForm;
