import React from 'react';
import Styled from 'styled-components';

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

class Grass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grass: <StyledGrass/>,
    }
  }

  componentWillMount() {
    const type = grassTypes[Math.floor(Math.random() * grassTypes.length)]
    const grassSource = require(`../../../graphics/tiles/${type}.png`);

    let tile = <StyledGrass src={grassSource}/>;
    if (type === 'grass_tall') {
      const grassSource3D = require(`../../../graphics/tiles/${type}_3d.png`);
      tile = (
        <Grass3DContainer src={grassSource}>
          <StyledGrass src={grassSource}/>
          <Grass3D visible={this.props.depth} src={grassSource3D}/>
        </Grass3DContainer>
      );
    }
    
    this.setState({ grass: tile })
  }

  render() {
    const { grass } = this.state;
    return (
      grass
    );
  }

}

export default Grass;
