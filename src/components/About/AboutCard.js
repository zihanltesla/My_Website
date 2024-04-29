import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Zihan Liu </span>, you can also call me <span className="purple">Hanky  </span>!
            <br />
            I come from China and am currently study at University of Zurich.
            <br />
            I have completed BSc in <span className="purple"> Electrical and Electronic Engineering </span>
            in <span className="purple">Xiamen University Malaysia</span>
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games    🎮
            </li>
            <li className="about-activity">
              <ImPointRight /> Watching Movie   🎬
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling   🎒
            </li>
            <li className="about-activity">
              <ImPointRight /> Hiking   🧗
            </li>
            <li className="about-activity">
              <ImPointRight /> Ski!   🎿
            </li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
