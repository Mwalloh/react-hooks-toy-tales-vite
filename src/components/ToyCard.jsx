import React from "react";

function ToyCard({ toyId, name, image, likes, handleDeleteToy }) {
	return (
		<div className="card" data-testid="toy-card">
			<h2>{name}</h2>
			<img src={image} alt={name} className="toy-avatar" />
			<p>{likes} Likes </p>
			<button className="like-btn">Like {"<3"}</button>
			<button className="del-btn" onClick={() => handleDeleteToy(toyId)}>
				Donate to GoodWill
			</button>
		</div>
	);
}

export default ToyCard;
