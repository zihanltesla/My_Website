import React from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import TravelMap from "./TravelMap"; 

function Life() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <h1 className="project-heading" style={{ marginBottom: "30px" }}>
          Places <strong className="purple">I've Been</strong>
        </h1>
        <TravelMap />
        
      </Container>
    </Container>
  );
}

export default Life;
