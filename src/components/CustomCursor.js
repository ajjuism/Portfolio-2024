import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Cursor = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #FFF8DC;
  border-radius: 100%;
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: all 0.3s ease;
  transition-property: width, height, border;
  display: none;

  @media (hover: hover) and (pointer: fine) {
    display: block;
  }

  &.hovered {
    width: 50px;
    height: 50px;
    border-width: 3px;
    border-color: #ff00ff;
  }
`;

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (!isTouchDevice) {
      addEventListeners();
      handleLinkHoverEvents();
    }
    return () => removeEventListeners();
  }, [isTouchDevice]);

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseenter", onMouseEnter);
    document.removeEventListener("mouseleave", onMouseLeave);
    document.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const onMouseLeave = () => {
    setHidden(true);
  };

  const onMouseEnter = () => {
    setHidden(false);
  };

  const onMouseDown = () => {
    setClicked(true);
  };

  const onMouseUp = () => {
    setClicked(false);
  };

  const handleLinkHoverEvents = () => {
    document.querySelectorAll("a").forEach((el) => {
      el.addEventListener("mouseover", () => setLinkHovered(true));
      el.addEventListener("mouseout", () => setLinkHovered(false));
    });
  };

  const cursorClasses = `${hidden ? "hidden" : ""} ${clicked ? "clicked" : ""} ${linkHovered ? "hovered" : ""}`;

  if (isTouchDevice) return null;

  return (
    <Cursor
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
      className={cursorClasses}
    />
  );
}

export default CustomCursor;