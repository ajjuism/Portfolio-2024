
import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  color: #FFFFFF;
  font-family: 'Space Grotesk', sans-serif;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 10px;
`;

const AboutTitle = styled.h2`
  font-family: 'syne', sans-serif;
  font-size: 36px;
  font-weight:800;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-bottom: 2px solid #FFFFFF;
  padding-bottom: 15px;
  color: #FFFFFF;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const AboutText = styled.p`
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 25px;
  color: #FFFFFF;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

function About() {
  return (
    <AboutContainer>
      <AboutTitle>About</AboutTitle>
      <AboutText>
      Hi, I’m Arjun. I ask questions for a living and do things on the internet for fun. 
      </AboutText>
      <AboutText>
      I also make music as Ōri and I am one half of Parallel Highway, an experimental electronic music project. 
      </AboutText>
      <AboutText>
      Coming from a small corner of southern India, my fascination with technology and art has driven me to blend different mediums that I am passionate about into web-based projects. 
      This website is an attempt to showcase those experiments.
      </AboutText>
      <AboutText>
      If you have an interesting idea related for audio, lens based, or web projects, 
      I’d love to hear from you. Drop me a message at ajjuism@gmail.com.
    </AboutText>
    </AboutContainer>
  );
}

export default About;