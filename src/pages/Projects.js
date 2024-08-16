import React from 'react';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';

const ProjectsContainer = styled.div`
  color: #FFFFFF;
  font-family: 'Space Grotesk', sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.9);
`;

const ProjectsHeader = styled.div`
  padding: 20px 20px 0;
`;

const ProjectsTitle = styled.h2`
  font-family: 'syne', sans-serif;
  font-size: 36px;
  font-weight: 800;
  margin: 0 0 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #FFFFFF;
  border-bottom: 2px solid #FFFFFF;
  padding-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const ProjectList = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  padding: 0 20px 20px;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ProjectItem = styled.div`
  margin-bottom: 40px;
  &:first-child {
    margin-top: 20px;
  }
`;

const ProjectName = styled.h3`
  font-family: 'syne', sans-serif;
  font-size: 24px;
  margin: 0 0 15px;
  color: #FFFFFF;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const ProjectDescription = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: #FFFFFF;
  font-weight: 300;
  margin: 0 0 15px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ViewProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #FFFF8F;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    text-shadow: 0 0 10px rgba(255, 255, 143, 0.5);
  }

  svg {
    margin-left: 5px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

function Projects() {
  const projects = [
    {
      name: "Pxl8.studio",
      description: "Pxl8 Studio sprang from a desire to tackle everyday challenges with straightforward solutions. It's a passion project where fun meets function, simplifying personal tasks with creative flair.",
      link: "https://www.pxl8.studio/"
    },
    {
      name: "Juno",
      description: "Born out of necessity, Juno is a no-nonsense task manager that keeps things simple. It's a work in progress, now equipped with user authentication using Firebase, and built on React to streamline tasks.",
      link: "https://gsd-kohl.vercel.app/"
    },
    {
      name: "8bit Wedding invite",
      description: "My own wedding invite, designed to be as fun and interactive as possible. Using framer motion for animations, it also features a few custom sound bits made just for this project.",
      link: "https://wedding.ajjuism.com/"
    },
    {
      name: "Tonelab",
      description: "Tonelab began as an experiment and evolved into a playground for sound. Manipulate and hear sounds in real-time through a dynamic, interactive web canvas.",
      link: "https://tonelab.vercel.app/"
    },
    {
      name: "Sample Lab",
      description: "Sample Lab is a web-based drum machine that allows you to upload and play your own samples. Utilize your keyboard to trigger sounds or interact directly with the interface on touch-enabled devices.",
      link: "https://samplelab.vercel.app/"
    },
    {
      name: "Mandala Maker>",
      description: "Mandala Maker allows you to craft intricate mandala patterns from your own designs. It offers adjustable settings for segment count, element spacing, design rotation, and overall mandala size.",
      link: "https://www.figma.com/community/plugin/1304874310414952650/mandala-maker/"
    },
    {
      name: "Circular Clone",
      description: "Circular Clone allows you to arrange clones of objects on your Figma canvas along a circular shape. You can control the number of segments, width, and rotation angle of the circular shape as well as the angle of rotation of the cloned objects.",
      link: "https://www.figma.com/community/plugin/1293975517470860904/circular-clone"
    },
    {
      name: "Jagath Narayan - Portfolio",
      description: "A quick weekend project to showcase Jagath's work. Built with vanilla JavaScript and Bootstrap.",
      link: "https://jagathnarayanan.com/"
    },
    {
      name: "Lazymail - WIP",
      description: "Lazymail is all about making email template management easy. Still a work in progress, it lets you fill out and use templates quickly, built with React and powered by Airtable.",
      link: "https://lazymail-eosin.vercel.app/"
    },
  ];

  return (
    <ProjectsContainer>
      <ProjectsHeader>
        <ProjectsTitle>Projects</ProjectsTitle>
      </ProjectsHeader>
      <ProjectList>
        {projects.map((project, index) => (
          <ProjectItem key={index}>
            <ProjectName>{project.name}</ProjectName>
            <ProjectDescription>{project.description}</ProjectDescription>
            <ViewProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
              View Project <FaArrowRight />
            </ViewProjectLink>
          </ProjectItem>
        ))}
      </ProjectList>
    </ProjectsContainer>
  );
}

export default Projects;