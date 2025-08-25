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
  return (
    <>
      {/* Si hay rect lo mostramos, si no, solo fondo oscuro */}
      {rect ? <Overlay rect={rect} /> : <Overlay rect={null} />}
      
      {/* Contenido del tutorial */}
      <div
        style={{
          position: "absolute",
          zIndex: 1001,
          color: "white",
          top: "25%",
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: "500px",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: steps[step].text }} />          
        <div style={{textAlign: "center",}}>
          {step > 0 && <Button onClick={onPrev}>Anterior</Button>}
          {step < steps.length - 1 && <Button onClick={onNext}>Siguiente</Button>}
          {step === steps.length - 1 && <Button onClick={onClose}>Cerrar</Button>}
        </div>
      </div>
    </>
  );
}