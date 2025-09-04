import styled from "styled-components";

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none; 
  transition: background 0.3s ease;

  ${({ rect }) => {
    if (!rect) {
      return `
        background: rgba(0,0,0,0.8); /* opacidad cuando no hay enfoque */
      `;
    }

    const paddingX = 10; // margen solo lateral
    const top = rect.top;
    const left = rect.left - paddingX;
    const width = rect.width + paddingX * 2;
    const height = rect.height;

    return `
      background: rgba(0,0,0,0.8);
      clip-path: polygon(
        0 0,
        100% 0,
        100% 100%,
        0 100%,
        0 ${top}px,
        ${left}px ${top}px,
        ${left}px ${top + height}px,
        ${left + width}px ${top + height}px,
        ${left + width}px ${top}px,
        0 ${top}px
      );
    `;
  }}
`;

const Cutout = styled.div`
  ${({ rect }) =>
    rect &&
    `
      position: fixed;
      top: ${rect.top}px;
      left: ${rect.left - 10}px;
      width: ${rect.width + 20}px;
      height: ${rect.height}px;
      background: rgba(0,0,0,0.5);
      z-index: 1001; /* encima del mask */
      pointer-events: none;
    `}
`;


export default function Overlay({ rect }) {
  return (
    <>
      <Mask rect={rect} />
      {rect && <Cutout rect={rect} />}
    </>
  );
}