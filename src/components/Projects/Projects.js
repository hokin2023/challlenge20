import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import { PROJECTS } from "../../Constants";
import Button from "react-bootstrap/Button";
import { BiLinkExternal } from "react-icons/bi";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p>
        <p style={{ color: "black" }}>
          Here are a few projects I've worked on recently.
        </p>
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {PROJECTS.map((project, index) => (
            <Col md={4} className="project-card" key={index}>
              <ProjectCard
                imgPath={project.image}
                technologyUsed={project.technologyUsed}
                isBlog={false}
                title={project.name}
                description={project.description}
                link={project.url}
              />
            </Col>
          ))}
          
        </Row>
       
        <Button variant="primary" href="https://github.com/hokin2023?tab=repositories" target="_blank"className="download-button">
          <BiLinkExternal /> &nbsp;
         View More
        </Button>
        
      </Container>
    </Container>
  );
}

export default Projects;