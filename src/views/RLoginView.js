/**
 * @author Elizabeth Moncada
 * @version 1.0.1
 */

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { 
  setBackIcon, 
  setMenuIcon, 
  setFigurePos, 
  setEditingMode  
} from '../redux-store/reducers/uiSlice';
import { 
  setNarrative, 
  setFeature, 
  setCharacters,
  setCurrentStage
} from '../redux-store/reducers/storySlice';
import styled from 'styled-components';

function RLoginView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    correo: '',
    contrasena: '',
  });

  useEffect(() => {
    //dispatch(setMode(null));
    dispatch(setNarrative(null));
    dispatch(setFeature(null));
    dispatch(setCharacters([]));
    dispatch(setCurrentStage(0));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.correo || !loginData.contrasena) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {      
      const response = await axios.post('http://localhost:5001/rakonti/usuarios/login', loginData);
      const { token, id_usuario } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('id_usuario', id_usuario);

      navigate('/home');
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Error al iniciar sesión.';
      alert(errorMsg);
    }
  };

  return <div>
    <BackgroundImage src='images/rakonti-background.jpg' alt='rakonti-background'/>
    <MenuContainer>
      <FormContainer>
        <Label>Correo</Label>
        <Input type='email'
              name='correo'
              value={loginData.correo}
              onChange={handleChange}
        />

        <Label>Contraseña</Label>
        <Input type='password'
              name='contrasena'
              value={loginData.contrasena}
              onChange={handleChange}
        />

        <RegisterText>
          ¿No tienes una cuenta?{' '}
          <StyledLink to='/register'>REGÍSTRATE AQUÍ</StyledLink>
        </RegisterText>

        <Button onClick={handleLogin}>Iniciar sesión</Button>

      </FormContainer>
    </MenuContainer>
  </div>;
}

const BackgroundImage = styled.img`
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  vertical-align: middle;
  horizontal-align: middle;
`;

const MenuContainer = styled.div`
  align-items: center;
  display: flex;
  height: 10%;
  justify-content: center;
  position: absolute;
  top:55%;
  width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.div`
  background-image: url('images/label.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left center;
  padding: 30px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
`;
  
const Input = styled.input`
  width: 350px;
  padding: 12px 10px;
  background-color: transparent;
  font-size: 16px;
  color: black;
  background-image: url('images/input.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  outline: none;
`;
  
  const RegisterText = styled.p`
  color: #ffffff;
  margin: 40px 40px;
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  color: #ffffff;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
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

  &:active {
    transform: scale(0.98);
  }
`;

export default RLoginView;