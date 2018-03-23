import React from 'react';
import Styled from 'styled-components';
import Grass from './Grass';

const tileSize = 36;

const Row = Styled.div`
  height: ${tileSize}px;
  width: max-content;
`;

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
    }
  }

  componentWillMount() {
    const { grid } = this.state;
    const height = window.innerHeight;
    const numTilesY = Math.ceil(height / tileSize);

    for (var i = 0; i < numTilesY; i++) {
      const width = window.innerWidth;
      const numTilesX = Math.ceil(width / tileSize);
      const row = [];
      for (var j = 0; j < numTilesX; j++) {
        row.push(<Grass key={j} depth/>);
      }
      grid.push(<Row key={i}>{row}</Row>);
    }
    this.setState({ grid: grid })
  }

  render() {
    const { grid } = this.state;
    return (
      [grid]
    );
  }

}

export default Map;
