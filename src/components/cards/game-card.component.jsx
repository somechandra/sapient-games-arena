import React from "react";
import Card from "react-bootstrap/Card";

import "./game-card.styles.css";

const GameCard = props => {
  const {
    title,
    platform,
    score,
    genre,
    editorsChoice,
    releaseYear
  } = props.rec;
  return (
    <Card bg="light">
      <Card.Header>
        {title.length > 30 ? title.slice(0, 30).concat("...") : title}
      </Card.Header>
      <Card.Body>
        <Card.Title className="card-header-title">{platform}</Card.Title>
        <Card.Text className="game-card-text">
          <span className="game-card-text-title">Genre: </span>
          {genre}
        </Card.Text>
        <Card.Text className="game-card-text">
          <span className="game-card-text-title">Editors Choice: </span>
          {editorsChoice}
        </Card.Text>
        <Card.Text className="game-card-text">
          <span className="game-card-text-title">Score: </span>
          {score}
        </Card.Text>
        <Card.Text className="game-card-text">
          <span className="game-card-text-title">Release Year: </span>
          {releaseYear}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
