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
      directory: 'grass',
      type: '',
      grassSource: undefined,
      grassSource3D: undefined,
      visible: false,
    }

    this.depth = true;
    this.tileTypes = [
      'grass1', 'grass2', 'grass3', 'grass4', 'grass5'
    ];

    this.setDepth = this.setDepth.bind(this);
  }

  toggleHD(hd) {
    var newDirectory = '';
    if (hd) {
      newDirectory = 'grass_hd'
    } else {
      newDirectory = 'grass'
    }
    this.setState({ grassSource: require(`../../../../graphics/tiles/${newDirectory}/${this.type}.png`)});
  }

  componentWillMount() {
    var num = Math.random();
    if (num < 0.4) this.type = this.tileTypes[0];
    else if(num < 0.8) this.type = this.tileTypes[1];
    else if(num < 0.88) this.type = this.tileTypes[2];
    else if(num < 0.96) this.type = this.tileTypes[3];
    else this.type = this.tileTypes[4];

    if (this.props.hd) this.state.directory += '_hd';

    const grassSource = require(
      `../../../../graphics/tiles/${this.state.directory}/${this.type}.png`
    );
    let grassSource3D = undefined;
    if (this.type === 'grass_tall') {
      grassSource3D = require(
        `../../../../graphics/tiles/${this.state.directory}/${this.type}_3d.png`
      );
    } else if (this.type === 'grass_tree') {
      this.walkable = false;
    }

    this.setState({ type: this.type, grassSource: grassSource, grassSource3D: grassSource3D });
  }

  setDepth(depth) {
    this.setState({ visible: depth });
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
    }

    return (
      tile
    );
  }

}

export default Grass;
