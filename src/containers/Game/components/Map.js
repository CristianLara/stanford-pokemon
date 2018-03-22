import React from 'react';
import Styled from 'styled-components';
import Grass1 from '../../../graphics/tiles/grass1.png';

const Grass = Styled.img`
  height: 48px;
  width: 48px;
`;

const GrassRow = Styled.div`
  height: 48px;
  width: max-content;
`;

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grassSize: 48,
      grassGrid: [],
    }
  }

  componentWillMount() {
    const { grassSize, grassGrid } = this.state;
    const width = window.innerWidth;
    const numGrass = Math.ceil(width / grassSize);
    const grassRow = [];
    for (var i = 0; i < numGrass; i++) {
      grassRow.push(<Grass key={i} src={Grass1}/>);
    }
    const height = window.innerHeight;
    const yGrass = Math.ceil(height / grassSize);
    for (i = 0; i < yGrass; i++) {
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
