import { useEffect, useState } from "react";
import styled from "styled-components";
import Overlay from "./Overlay";

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0px auto 10px auto;
  padding: 0;
  width: ${({ width }) => width || "80%"};
  max-width: 1200px;
  box-sizing: border-box;
`;

const ButtonPrimary = styled.button`
  padding: 10px 30px;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  background-color: #43474f;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: gray;
  }
`;

const ButtonSecondary = styled.button`
  padding: 10px 30px;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  background-color: white;
  color: #43474f;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #43474f;
    color: white;
  }
`;

const TutorialContainer = styled.div`
  p {
    color: white;
  }
  h2 {
    color: white;
  }
`;

export default function Tutorial({ step, steps, onNext, onPrev, onClose }) {
  const [rect, setRect] = useState(null);

  useEffect(() => {
    const target = steps[step].ref?.current;

    const updateRect = () => {
      if (target) {
        const { top, left, width, height } = target.getBoundingClientRect();
        setRect({ top, left, width, height });
      } else {
        setRect(null);
      }
    };

    updateRect();
    window.addEventListener("scroll", updateRect, true);
    window.addEventListener("resize", updateRect);

    return () => {
      window.removeEventListener("scroll", updateRect, true);
      window.removeEventListener("resize", updateRect);
    };
  }, [step, steps]);

  return (
    <>
      <Overlay rect={rect} />

      <div
        style={{
          position: "fixed",
          zIndex: 1001,
          bottom: "50px",
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: "500px",
          textAlign: "left",
        }}
      >
        <TutorialContainer>
          <div
            style={{ color: "white" }}
            dangerouslySetInnerHTML={{ __html: steps[step].text }}
          />
        </TutorialContainer>

        <ButtonsContainer>
          {step > 0 && <ButtonSecondary onClick={onPrev}>Anterior</ButtonSecondary>}
          {step < steps.length - 1 && <ButtonPrimary onClick={onNext}>Siguiente</ButtonPrimary>}
          {step === steps.length - 1 && <ButtonPrimary onClick={onClose}>Cerrar</ButtonPrimary>}
        </ButtonsContainer>
      </div>
    </>
  );
}