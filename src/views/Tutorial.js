import styled from "styled-components";
import Overlay from "./Overlay";

const Button = styled.button`
  margin: 10px;
  padding: 8px 16px;
  background: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export default function Tutorial({ step, steps, rect, onNext, onPrev, onClose }) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Posición base → centro de la pantalla
  let posTop = windowHeight / 2;
  let posLeft = windowWidth / 2;
  let transform = "translate(-50%, -50%)";

  if (rect) {
    const padding = 40; // margen mínimo para evitar solaparse con rectángulo
    const rectTop = rect.top;
    const rectBottom = rect.bottom;

    // Si el bloque cae dentro del rectángulo iluminado → moverlo
    if (posTop > rectTop && posTop < rectBottom) {
      const espacioArriba = rectTop;
      const espacioAbajo = windowHeight - rectBottom;

      if (espacioAbajo > espacioArriba) {
        // hay más espacio abajo → mover debajo
        posTop = rectBottom + padding;
        transform = "translate(-50%, 0)";
      } else {
        // hay más espacio arriba → mover arriba
        posTop = rectTop - padding;
        transform = "translate(-50%, -100%)";
      }
    }
  }

  const style = {
    position: "absolute",
    zIndex: 1001,
    color: "white",
    top: `${posTop}px`,
    left: `${posLeft}px`,
    transform,
    maxWidth: "500px",
    textAlign: "left", // texto alineado normal
  };

  return (
    <>
      {rect ? <Overlay rect={rect} /> : <Overlay rect={null} />}

      <div style={style}>
        {/* Texto alineado normal */}
        <div dangerouslySetInnerHTML={{ __html: steps[step].text }} />

        {/* Botones centrados */}
        <div style={{ textAlign: "center", marginTop: "12px" }}>
          {step > 0 && <Button onClick={onPrev}>Anterior</Button>}
          {step < steps.length - 1 && <Button onClick={onNext}>Siguiente</Button>}
          {step === steps.length - 1 && <Button onClick={onClose}>Cerrar</Button>}
        </div>
      </div>
    </>
  );
}