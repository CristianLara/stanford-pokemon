import React from 'react';
import Styled from 'styled-components';
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

class Grass extends Tile {
  constructor(props) {
    super(props);

    this.state = {
      type: 'grass',
      style: 'grass1',
      visible: false,
    }

    this.depth = true;
    this.styles = [
      'grass1', 'grass2', 'grass3', 'grass4', 'grass5'
    ];

    this.setDepth = this.setDepth.bind(this);
  }

  componentWillMount() {
    super.componentWillMount();

    var num = Math.random();
    var chosenStyle = '';
    if (num < 0.4) chosenStyle = this.styles[0];
    else if(num < 0.8) chosenStyle = this.styles[1];
    else if(num < 0.88) chosenStyle = this.styles[2];
    else if(num < 0.96) chosenStyle = this.styles[3];
    else chosenStyle = this.styles[4];

    if (chosenStyle === 'grass_tree') {
      this.walkable = false;
    }

    this.setState({ style: chosenStyle });
  }

  setDepth(depth) {
    this.setState({ visible: depth });
  }

  render() {
    const { type, style, visible } = this.state;
    const grassSource = require(`../../../../graphics/tiles/${type}/${style}.png`);

    if (type === 'grass_tall') {
      const grassSource3D = require(`../../../../graphics/tiles/${type}/${style}_3d.png`);
      return (
        <Grass3DContainer>
          <StyledGrass src={grassSource}/>
          <Grass3D visible={visible} src={grassSource3D}/>
        </Grass3DContainer>
      );
    }
    
    return (
      <StyledGrass src={grassSource}/>
    )
  }

}

export default Grass;
