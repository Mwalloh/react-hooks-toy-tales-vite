import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, setToys }) {

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
					/>
				);
			})}
		</div>
	);
}

export default ToyContainer;
