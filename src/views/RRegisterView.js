import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

function StepOne({ formData, handleChange }) {
  return (
    <>
      <FormContainer>
        <Subtitle>Sobre ti</Subtitle>

        <Row>
          <Column>
            <Label>Nombre(s)</Label>
            <Input type='text' 
                  name='nombre'
                  value={formData.nombre}
                  onChange={handleChange}
            />
          </Column>
          <Column>
            <Label>Apellidos</Label>
            <Input type='text' 
                  name='apellido' 
                  value={formData.apellido}
                  onChange={handleChange}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label>Fecha de nacimiento</Label>
            <Input type='date'
                  name='fecha_nacimiento'
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
            />
          </Column>
          <Column>
            <Label>Sexo</Label>
            <Select name='sexo'
                  value={formData.sexo}
                  onChange={handleChange}
            >
              <option value=''>Selecciona</option>
              <option value='Masculino'>Masculino</option>
              <option value='Femenino'>Femenino</option>
            </Select>
          </Column>
        </Row>
      </FormContainer>

      <FormContainer>
        <Subtitle>Seguridad de tu cuenta</Subtitle>

        <Row>
          <Column>
            <Label>Correo electrónico</Label>
            <Input type='email'
                  name='correo'
                  value={formData.correo}
                  onChange={handleChange}
            />
          </Column>
          <Column>
            <Label>Confirmar correo electrónico</Label>
            <Input type='email' 
                  name='confirmar_correo'
                  value={formData.confirmar_correo}
                  onChange={handleChange}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label>Contraseña</Label>
            <Input type='password'
                  name='contrasena'
                  value={formData.contrasena}
                  onChange={handleChange}
            />
          </Column>
          <Column>
            <Label>Confirmar contraseña</Label>
            <Input type='password' 
                  name='confirmar_contrasena'
                  value={formData.confirmar_contrasena}
                  onChange={handleChange}
            />
          </Column>
        </Row>
      </FormContainer>
    </>
  );
}

function StepTwo({ formData, setFormData }) {
  return (
    <>
      <FormContainer>
        <GenreCheckboxes formData={formData} setFormData={setFormData} />
      </FormContainer>
    </>
  );
}

function StepThree({ formData, handleChange }) {
  return (
    <>
      <FormContainer>
        <Subtitle>¿Cuál es tu experiencia contando historias?</Subtitle>

        <Row>
          <Column style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <InputRadio type="radio"
                  id="principiante"
                  name="experiencia"
                  value="principiante"
                  checked={formData.experiencia === 'principiante'}
                  onChange={handleChange}
              />
            <LabelRadioButton htmlFor="principiante">Principiante: Es la primera vez que voy a escribir una historia siguiendo una estructura narrativa.</LabelRadioButton>
          </Column>
          <Column style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <InputRadio type="radio"
                  id="experto"
                  name="experiencia"
                  value="experto"
                  checked={formData.experiencia === 'experto'}
                  onChange={handleChange}
            />
            <LabelRadioButton htmlFor="experto">Experto: He escrito historias anteriormente y/o estoy familiarizado con el concepto de estructura narrativa.</LabelRadioButton>
          </Column>
        </Row>
      </FormContainer>
    </>
  );
}

function StepFour() {
  return (
    <>
      <FormContainer>
        <Title>¡FELICITACIONES!<br/>TU CUENTA HA SIDO CREADA</Title>
        <p>Todo está listo para empezar a crear tus propias hisotiras.</p>
      </FormContainer>
    </>
  );
}

function GenreCheckboxes({ formData, setFormData }) {
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/rakonti/generos')
      .then(res => setGeneros(res.data))
      .catch(err => console.error('Error al cargar los géneros:', err));
  }, []);

  return (
    <>
      <Subtitle>¿Cuáles son tus géneros favoritos?</Subtitle>
      <Row>
        {dividirEnColumnas(generos, 3).map((columna, i) => (
          <Column key={i}>
            {columna.map(genero => (
              <LabelCheckbox key={genero.id_genero}>
                <InputCheckbox type="checkbox"
                      value={genero.id_genero}
                      checked={formData.generos_favoritos.includes(genero.id_genero)}
                      disabled={
                        !formData.generos_favoritos.includes(genero.id_genero) &&
                        formData.generos_favoritos.length >= 3
                      }
                      onChange={(e) => {
                        const id = parseInt(e.target.value);
                        const seleccionados = formData.generos_favoritos;
                    
                        if (e.target.checked) {
                          if (seleccionados.length !== 3) {
                            setFormData({ ...formData, generos_favoritos: [...seleccionados, id] });
                          } else {
                            alert('Solo puedes seleccionar 3 géneros favoritos.');
                          }
                        } else {
                          setFormData({
                            ...formData,
                            generos_favoritos: seleccionados.filter(g => g !== id)
                          });
                        }
                      }}
                />
                {genero.nombre}
              </LabelCheckbox>
            ))}
          </Column>
        ))}
      </Row>
    </>
  );
}

function dividirEnColumnas(items, columnas){
  const resultado = Array.from({ length: columnas }, () => []);
  items.forEach((item, index) => {
    resultado[index % columnas].push(item);
  });
  return resultado;
}

function RRegisterView() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    sexo: '',
    correo: '',
    confirmar_correo: '',
    contrasena: '',
    confirmar_contrasena: '',
    generos_favoritos: [],
    experiencia: ''
  }); 
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = async (e) => {
    e.preventDefault();

    if (step === 1) {
      if (
        !formData.nombre ||
        !formData.apellido ||
        !formData.fecha_nacimiento ||
        !formData.sexo ||
        !formData.correo ||
        !formData.confirmar_correo ||
        !formData.contrasena ||
        !formData.confirmar_contrasena
      ) {
        alert('Por favor completa todos los campos.');
        return;
      }

      if (formData.correo !== formData.confirmar_correo) {
        alert('Los correos no coinciden.');
        return;
      }

      if (formData.contrasena !== formData.confirmar_contrasena) {
        alert('Las contraseñas no coinciden.');
        return;
      }
    }

    if (step === 2) {
      if (formData.generos_favoritos.length < 3) {
        alert('Por favor selecciona 3 géneros.');
        return;
      }
    }

    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 3) {
      if (!formData.experiencia) {
        alert('Por favor completa todos los campos.');
        return;
      }
    }  
  
    try {
      const response = await axios.post('http://localhost:5001/rakonti/usuarios/registro', formData);
      console.log('Usuario creado:', response.data);
      
      const id_usuario = response.data.id_usuario;

      for (const id_genero of formData.generos_favoritos) {
        await axios.post('http://localhost:5001/rakonti/usuario-generos', {
          id_usuario,
          id_genero
        });
      }
      
      setStep(step + 1);
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al crear el usuario.');
    }
  }; 
  
  const handleCancel = () => {
    window.history.back();
  };

  const handleNewStory = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await axios.post('http://localhost:5001/rakonti/usuarios/login/', {
        correo: formData.correo,
        contrasena: formData.contrasena
      });

      const { token, id_usuario } = loginResponse.data;

      localStorage.setItem('token', token);
      localStorage.setItem('id_usuario', id_usuario);

      navigate('/home');

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Ocurrió un error. Revisa los datos e intenta de nuevo.');
    }
  };  

  return <div>
    <BackgroundImage src='images/rakonti-background-2.jpg' alt='rakonti-background-2'/>

    <Container>
      <Title>CREACIÓN DE CUENTA</Title>

      <StepsContainer>
        <Step active={step === 1} step={1} align='left' padding="20px 40px 20px 30px">
          <b>Datos personales</b>
          <br />Información básica para crear tu cuenta
        </Step>
        <Step active={step === 2} step={2} align='center' padding="20px 40px 20px 80px">
          <b>Géneros narrativos</b>
          <br />¡Vamos a conocer tus gustos narrativos!
        </Step>
        <Step active={step === 3} step={3} align='right' padding="20px 30px 20px 60px">
          <b>Experiencia</b>
          <br />¿Qué tanto sabes de contar historias?
        </Step>
      </StepsContainer>

      {step === 1 && <StepOne formData={formData} handleChange={handleChange} />}
      {step === 2 && <StepTwo formData={formData} setFormData={setFormData} />}
      {step === 3 && <StepThree formData={formData} handleChange={handleChange} />}
      {step === 4 && <StepFour />}

      <ButtonsContainer>
        {step >= 1 && step <= 3 && <Button onClick={handleCancel}>Cancelar</Button>}
        {step > 1 && step < 4 && <Button onClick={() => setStep(step - 1)}>Anterior</Button>}
        {step < 3 && <Button onClick={handleNextStep}>Siguiente</Button>}
        {step === 3 && <Button onClick={handleSubmit} type="submit">Enviar</Button>}
        {step === 4 && <Button onClick={handleNewStory}>Crear nueva historia</Button>}
      </ButtonsContainer>

    </Container>
  </div>
}

const BackgroundImage = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: repeat-y;
  background-size: cover;
  z-index: -1;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  width: 100%;
  margin:15px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Column = styled.div`
  flex: 1;
  max-width: 45%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Container = styled.div`
align-items: center;
display: flex;
justify-content: flex-start;
position: absolute;
top: 10%;
width: 100%;
height: 100%; 
box-sizing: border-box;
flex-direction: column;
`;
  
const Title = styled.h1`
  font-size:40x;
  font-weight: 800;
  color: #43474f;
  text-align: center;
  margin-bottom: 20px;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  flex-direction: row;
  width: 60%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Step = styled.div`
  flex: 1;
  text-align: ${({ align }) => align};
  font-size: 12px;
  color: ${props => (props.active ? '#fff' : '#43474f')};
  background-color: transparent;
  padding: ${({ padding }) => padding};
  min-width: 100px;
  transition: all 0.3s ease;
  background-image: ${({ active, step }) => {
    if (active) {
      switch (step) {
        case 1:
          return "url('images/first-selected-progress-bar.png')";
        case 2:
          return "url('images/middle-selected-progress-bar.png')";
        case 3:
          return "url('images/last-selected-progress-bar.png')";
        default:
          return 'none';
      }
    } else {
      switch (step) {
        case 1:
          return "url('images/first-progress-bar.png')";
        case 2:
          return "url('images/middle-progress-bar.png')";
        case 3:
          return "url('images/last-progress-bar.png')";
        default:
          return 'none';
      }
    }
  }};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Subtitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #43474f;
  align-self: flex-start;
`;

const FormContainer = styled.form`
  padding: 20px 40px 30px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('images/section.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 60%;
  box-sizing: border-box;
  border-radius: 45px;
  
  @media (max-width: 768px) {
    width: 90%;
    padding: 35px;
    border-radius: 60px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 600;
  color: #43474f;
`;

const LabelRadioButton = styled.label`
  font-size: 14px;
  color: #43474f;
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
`;

const LabelCheckbox = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 16px;
  color: #43474f;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  background-color: transparent;
  font-size: 14px;
  color: black;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  color: black;
  box-sizing: border-box;
`;

const InputRadio = styled.input`
  width: 18px;
  height: 18px;
`;

const InputCheckbox = styled.input`
  margin-right: 10px;
`;

const ButtonsContainer = styled.div`
  padding: 20px 0px 20px 0px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 30px;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  background-color: #43474f;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #5c5f66;
  }
`;

export default RRegisterView;