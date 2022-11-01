/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setFeature, setFeatureItem } from '../../redux-store/reducers/storySlice';

function RFeatureItem({ code, feature, item, options }) {
  const dispatch = useDispatch();

  const onItemClicked = () => {
    let itemSelected = item;
    /** Verificar aleatorio */
    if (item.id === 0) { 
      itemSelected = Math.floor(Math.random() * options.length);
    }

    dispatch(setFeatureItem({ key: code, value: itemSelected }));
    /** Eliminar el Feature temporal para salir del selector */
    dispatch(setFeature(null)); 
  }

  return <FeatureItemButton onClick={onItemClicked}>
    <FeatureItemBackground
      src='images/white-feature.png'
      alt='feature-item-background'/>
    <FeatureItemImage
      src={item.url}
      alt='item-image'/>
    <TitleContainer>
      <Subtitle>{ feature }</Subtitle>
      <Title>{ item.name }</Title>
    </TitleContainer>
  </FeatureItemButton>
}

const Subtitle = styled.h4`
  color: #4C4C4C;
  font-size: 1em;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: left;
`;

const FeatureItemBackground = styled.img`
  height: 350px;
  width: 300px;
`;

const FeatureItemButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  margin: 0px 20px;
  padding: 0;
  position: relative;
`;

const FeatureItemImage = styled.img`
  bottom: 26%;
  max-height: 330px;
  left: calc(50% - 105px);
  object-fit: contain;
  position: absolute;
  width: 230px;
  z-index: 2;
`;

const Title = styled.h3`
  align-items: flex-end;
  color: #4C4C4C;
  display: flex;
  font-size: 1.5em;
  font-weight: 700;
  height: 100%;
  margin: 0;
  padding: 0;
  text-align: right;
`;

const TitleContainer = styled.div`
  align-items: baseline;
  border-bottom: 1px solid #4C4C4C;
  bottom: 13%;
  display: flex;
  height: 50px;
  justify-content: space-between;
  position: absolute;
  right: 12%;
  width: 71%;
  z-index: 2;
`;

export default RFeatureItem;