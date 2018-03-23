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
    }
  }

  render() {
    const grid = [];
    const height = window.innerHeight;
    const numTilesY = Math.ceil(height / tileSize);

    const { x, y } = this.props.spritePosition;

    for (var i = 0; i < numTilesY; i++) {
      const width = window.innerWidth;
      const numTilesX = Math.floor(width / tileSize);
      const row = [];
      for (var j = 0; j < numTilesX; j++) {
        row.push(<Grass key={j} depth={x===j&&y===i}/>);
      }
      grid.push(<Row key={i}>{row}</Row>);
    }
    
    return (
      [grid]
    );
  }

}

export default Map;
