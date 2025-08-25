import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;   /* deja pasar clicks si quieres; pon 'auto' para bloquear */
  z-index: 1000;
`;

const Cutout = styled.div`
  margin-left: -10px;
  padding-right: 20px;
  position: absolute;
  pointer-events: none;
  /* Animación suave cuando cambias de paso */
  transition: top .25s ease, left .25s ease, width .25s ease, height .25s ease, border-radius .25s ease;
`;

const FullscreenMask = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85); /* pantalla completa oscura cuando no hay rect */
  pointer-events: none;
  z-index: 1000;
`;

export default function Overlay({ rect, radius = 8, darkness = 0.85, showBorder = false }) {
  if (!rect) return <FullscreenMask />;

  return (
    <Wrapper>
      <Cutout
        style={{
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          borderRadius: radius,
          boxShadow: `0 0 0 9999px rgba(0,0,0,${darkness})`,
          border: showBorder ? "2px solid #fff" : "none",
          background: "transparent",
        }}
      />
    </Wrapper>
  );
}
