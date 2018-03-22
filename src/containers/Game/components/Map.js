import React from 'react';
import Styled from 'styled-components';

const Grass = Styled.img`
  height: 36px;
  width: 36px;
`;

const GrassRow = Styled.div`
  height: 36px;
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
      grassSize: 36,
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
        grassRow.push(<Grass key={j} src={grassSource}/>);
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
