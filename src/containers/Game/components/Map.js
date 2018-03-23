import React from 'react';
import Styled from 'styled-components';

const tileSize = 36;

const Grass = Styled.img`
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
  height: ${tileSize}px;
  width: ${tileSize}px;
  z-index: 20;
`;

const GrassRow = Styled.div`
  height: ${tileSize}px;
  width: max-content;
`;

const grassTypes = [
  'grass1', 'grass2', 'grass3', 'grass4',
  'grass_flower', 'grass_tall', 'grass_tree',
]

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grassSize: tileSize,
      grassGrid: [],
    }
  }

  componentWillMount() {
    const { grassSize, grassGrid } = this.state;
    const height = window.innerHeight;
    const yGrass = Math.ceil(height / grassSize);
    for (var i = 0; i < yGrass; i++) {
      const width = window.innerWidth;
      const numGrass = Math.ceil(width / grassSize);
      const grassRow = [];
      for (var j = 0; j < numGrass; j++) {
        const type = grassTypes[Math.floor(Math.random() * grassTypes.length)]
        const grassSource = require(`../../../graphics/tiles/${type}.png`);
        let tile = <Grass key={j} src={grassSource}/>;
        if (type === 'grass_tall') {
          const grassSource3D = require(`../../../graphics/tiles/${type}_3d.png`);
          tile = <Grass3DContainer key={j} src={grassSource}><Grass src={grassSource}/><Grass3D src={grassSource3D}/></Grass3DContainer>
        }
        grassRow.push(tile);
      }
      grassGrid.push(<GrassRow key={i}>{grassRow}</GrassRow>);
    }
    this.setState({ grassGrid: grassGrid })
  }

  render() {
    const { grassGrid } = this.state;
    return (
      [grassGrid]
    );
  }

}

export default Map;
