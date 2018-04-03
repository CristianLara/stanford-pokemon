import React from 'react';
import Styled from 'styled-components';
import Flower from './Flower';
import Tile from './Tile';

const tileSize = 36;

const StyledGrass = Styled.img`
  height: ${tileSize}px;
  width: ${tileSize}px;
`;

const Grass3DContainer = Styled.span`
  position: relative;
  height: ${tileSize}px;
  width: ${tileSize}px;
`;

const Grass3D = Styled.img`
  position: absolute;
  left: 0px;
  visibility: ${(props) => props.visible ? 'visible' : 'hidden'};
  height: ${tileSize}px;
  width: ${tileSize}px;
  z-index: 20;
`;

const grassTypes = [
  'grass1', 'grass2', 'grass3', 'grass4',
  'grass_flower', 'grass_tall', 'grass_tree',
]

class Random extends Tile {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      grassSource: require(`../../../../graphics/tiles/grass1.png`),
      grassSource3D: undefined,
    }

    this.walkable = true;
  }

  componentWillMount() {
    const type = grassTypes[Math.floor(Math.random() * grassTypes.length)]
    const grassSource = require(`../../../../graphics/tiles/${type}.png`);
    let grassSource3D = undefined;
    if (type === 'grass_tall') {
      grassSource3D = require(`../../../../graphics/tiles/${type}_3d.png`);
    } else if (type === 'grass_tree') {
      this.walkable = false;
    }

    this.setState({ type: type, grassSource: grassSource, grassSource3D: grassSource3D });
  }

  render() {
    const { type, grassSource, grassSource3D, visible } = this.state;

    let tile = <StyledGrass src={grassSource}/>;
    if (type === 'grass_tall') {
      tile = (
        <Grass3DContainer>
          <StyledGrass src={grassSource}/>
          <Grass3D visible={visible} src={grassSource3D}/>
        </Grass3DContainer>
      );
    } else if (type === 'grass_flower') {
      tile = <Flower/>;
    }

    return (
      tile
    );
  }

}

export default Random;
