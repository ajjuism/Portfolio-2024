import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 40px;
  left: 40px;
  z-index: 2;
  pointer-events: auto;

  @media (max-width: 768px) {
    top: 20px;
    left: 20px;
    right: 20px;
  }
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 10px;
  }
`;

const NavItem = styled.li`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-family: 'syne', sans-serif;
  font-size: 24px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;

  &:hover {
    color: #FFFF8F;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ExternalLink = styled.a`
  color: white;
  text-decoration: none;
  font-family: 'syne', sans-serif;
  font-size: 24px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;

  &:hover {
    color: #FFFF8F;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

function Navigation({ isHome }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Nav ref={menuRef}>
      <MenuButton onClick={toggleMenu}>☰</MenuButton>
      <NavList isOpen={isMenuOpen}>
        <NavItem><NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink></NavItem>
        <NavItem><ExternalLink href="https://open.spotify.com/artist/269gZQtoOtpGEeiK9Chz3f" target="_blank" rel="noopener noreferrer">Music</ExternalLink></NavItem>
        <NavItem><ExternalLink href="https://www.instagram.com/ajjuism" target="_blank" rel="noopener noreferrer">instagram</ExternalLink></NavItem>
        <NavItem><NavLink to="/projects" onClick={() => setIsMenuOpen(false)}>Projects</NavLink></NavItem>
        <NavItem><NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink></NavItem>
      </NavList>
    </Nav>
  );
}

export default Navigation;