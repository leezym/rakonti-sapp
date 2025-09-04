import api from "../api/axiosConfig";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
            <Label>Género</Label>
            <Select name='sexo'
                  value={formData.sexo}
                  onChange={handleChange}
            >
              <option value=''>Selecciona</option>
              <option value='Femenino'>Femenino</option>
              <option value='Masculino'>Masculino</option>
              <option value='No binario'>No binario</option>
              <option value='Transgénero'>Transgénero</option>
              <option value='Transexual'>Transexual</option>
              <option value='Queer'>Queer</option>
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
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    api.get('/generos')
      .then(res => setGeneros(res.data))
      .catch(err => console.error('Error al cargar los géneros:', err));
  }, []);

  return (
    <div style={{
      padding: '25px 40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '70%',
      maxWidth: '1200px',
      margin: 'auto', 
      flex: '0'
    }}>
      <Paragraph>¿Cuáles son tus tres (3) géneros favoritos?</Paragraph>
      <CardRow>
        {dividirEnColumnas(generos, 3).map((columna, i) => (
          <CardColumn key={i}>
            {columna.map(genero => (
              <Card image={'images/section-square.png'}>
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
                <CardImage src={genero.imagen} loading='lazy'/>
              </Card>
            ))}
          </CardColumn>
        ))}
      </CardRow>
    </div>
  );
}

function StepThree({ formData, handleChange }) {
  return (  
    <FormContainer>
      <Subtitle>¿Cuál es tu experiencia contando historias?</Subtitle>
      <Row>
        <Card image={'images/background-beginner.png'}>
          <CardDetail image={'images/background-text-beginner.png'}>
          <LabelRadioButton color={'white'} htmlFor="principiante">
            <InputRadio type="radio"
              id="principiante"
              name="experiencia"
              value="principiante"
              checked={formData.experiencia === 'principiante'}
              onChange={handleChange}
            />
            <b>Principiante:</b>
          </LabelRadioButton>
          <p style={{marginLeft:'30px', color:'white'}}>Es la primera vez que voy a escribir una historia siguiendo una estructura narrativa.</p>
          </CardDetail>
        </Card>
      </Row>

      <Row>
        <Card image={'images/background-expert.png'}>
          <CardDetail image={'images/background-text-expert.png'}>
          <LabelRadioButton color={'#43474f'} htmlFor="experto">
            <InputRadio type="radio"
              id="experto"
              name="experiencia"
              value="experto"
              checked={formData.experiencia === 'experto'}
              onChange={handleChange}
            />
            <b>Experto:</b>
          </LabelRadioButton>
          <p style={{marginLeft:'30px', color:'#43474f'}}>He escrito historias anteriormente y/o estoy familiarizado con el concepto de estructura narrativa.</p>
          </CardDetail>
        </Card>
      </Row>
    </FormContainer>
  );
}

function StepFour() {
  return (
    <FormContainer image={'images/congrats-characters.png'}>
      <Title style={{color:'#43474f'}}>¡FELICITACIONES!<br/>TU CUENTA HA SIDO CREADA</Title>
      <p>Todo está listo para empezar a crear tus propias hisotiras.</p>
    </FormContainer>
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
      const response = await api.post('/usuarios/registro', formData);
      console.log('Usuario creado:', response.data);
      
      const id_usuario = response.data.id_usuario;

      for (const id_genero of formData.generos_favoritos) {
        await api.post('/usuario-generos', {
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
    const confirmar = window.confirm("¿Estás seguro de que quieres salir?");
    if (!confirmar) return;

    window.history.back();
  };

  const handleNewStory = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await api.post('/usuarios/login/', {
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

  return <>
    <BackgroundImage src='images/narratives-background.jpg' loading='lazy'/>

    <Container>
      <Opacity>
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
      </Opacity>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
        {step === 1 && <StepOne formData={formData} handleChange={handleChange} />}
        {step === 2 && <StepTwo formData={formData} setFormData={setFormData} />}
        {step === 3 && <StepThree formData={formData} handleChange={handleChange} />}
        {step === 4 && <StepFour />}
      </div>

      <ButtonsContainer>
        {step >= 1 && step <= 3 && <ButtonSecondary onClick={handleCancel}>Cancelar</ButtonSecondary>}
        {step > 1 && step < 4 && <ButtonSecondary onClick={() => setStep(step - 1)}>Anterior</ButtonSecondary>}
        {step < 3 && <ButtonPrimary onClick={handleNextStep}>Siguiente</ButtonPrimary>}
        {step === 3 && <ButtonPrimary onClick={handleSubmit} type="submit">Enviar</ButtonPrimary>}
        {step === 4 && <ButtonPrimary onClick={handleNewStory}>Crear nueva historia</ButtonPrimary>}
      </ButtonsContainer>

    </Container>
  </>
}

const BackgroundImage = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  z-index: -1;
`;

const Opacity = styled.div`
  width: 100%;
  flex-shrink: 0;
  background-image: url('images/opacity.png');
  background-size: fill;
  background-repeat: no-repeat;
  background-position: center;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  width: 100%;
  padding: 8px 0px 8px 0px;
`;

const Column = styled.div`
  flex: 1;
  max-width: 48%;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;
  
const Title = styled.h1`
  font-size:35x;
  font-weight: 800;
  color:white;
  text-align: center;
  margin: 10px;
`;

const StepsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  width: 100%;
  justify-content: center; /* centra los botones horizontalmente */
  margin: 0px auto 10px auto; /* centra el contenedor horizontalmente y separa arriba */
  max-width: 1200px; /* opcional: mismo máximo que FormContainer */
  box-sizing: border-box;
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
`;

const Subtitle = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: #43474f;
  align-self: flex-start;
`;

const FormContainer = styled.form` 
  padding: 25px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: ${({ image }) => image ? `url(${image})` : 'url("images/section.png")'};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 70%;
  max-width: 1200px; /* limita ancho máximo en pantallas grandes */
  box-sizing: border-box;
  border-radius: 40px;
  margin: auto; /* esto centra vertical y horizontalmente */
  flex: 0; /* no estira todo el espacio disponible */
`;

const Paragraph = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #43474f;
  align-self: center;
  padding: 15px;
  background-image: url('images/top-bar.png');
  background-color: transparent;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
`;

const CardRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
  gap: 10px;
  align-items: stretch;
  justify-items: center;

  width: 100%;
  max-width: 1200px;
  margin: auto;
  box-sizing: border-box;
`;

const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Card = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;   /* 👈 importante: el contenido arranca arriba */
  align-items: stretch;

  padding: 20px 20px 20px 40px;
  background-image: ${({ image }) => `url(${image})`};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;  /* evita que se desborde */
`;

const CardDetail = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;

  margin: 0 auto;
  padding: 30px;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  width: 80%;
  box-sizing: border-box;
  overflow: hidden; 
`;

const CardImage = styled.img`
  height: 100px;
  width: auto;
  object-fit: contain;
  margin: 10px 0;
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
  color: ${({ color }) => color};
  cursor: pointer;
  display: flex;
  align-items: center;  
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
  padding: 5px;
  background-color: transparent;
  font-size: 12px;
  color: black;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 5px;
  font-size: 12px;
  color: black;
  box-sizing: border-box;
`;

const InputRadio = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin-right: 10px;
`;

const InputCheckbox = styled.input`
  margin-right: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center; /* centra los botones horizontalmente */
  flex-wrap: wrap;         /* permite que los botones se acomoden en varias filas si no caben */
  gap: 20px;
  margin: 0px auto 10px auto; /* centra el contenedor horizontalmente y separa arriba */
  padding: 0;
  width: ${({ width }) => width || '80%'}; /* mismo ancho que FormContainer */
  max-width: 1200px; /* opcional: mismo máximo que FormContainer */
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

export default RRegisterView;