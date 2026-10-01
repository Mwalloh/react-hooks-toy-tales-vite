import React, { useState } from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, setToys }) {
	function handleLikeToy(id) {
		const currentToy = toys.filter((toy) => toy.id === id);

		fetch(`http://localhost:3001/toys/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ likes: currentToy[0].likes + 1 }),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(
						`An error of has occurred with status: ${res.status}`,
					);
				}
				return res.json();
			})
			.then((data) => {
				return setToys((prev) =>
					prev.map((toy) =>
						toy.id === data.id ? { ...toy, likes: data.likes } : toy,
					),
				);
			})
			.catch((error) => console.log(error));
	}

	function handleDeleteToy(id) {
		fetch(`http://localhost:3001/toys/${id}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(
						`Error has occurred while deleting toy with status: ${res.status}`,
					);
				}
				return res.json();
			})
			.then(() => setToys((prev) => prev.filter((toy) => toy.id !== id)))
			.catch((error) => console.log(`ERROR: ${error}`));
	}

	return (
		<div id="toy-collection">
			{toys.map((toy) => {
				return (
					<ToyCard
						key={toy.id}
						name={toy.name}
						image={toy.image}
						likes={toy.likes}
						handleDeleteToy={handleDeleteToy}
						toyId={toy.id}
						handleLikeToy={handleLikeToy}
					/>
				);
			})}
		</div>
	);
}

export default ToyContainer;
