import React from 'react';
import Styled from 'styled-components';
import Random from '../tiles/Random';

const tileSize = 36;

const Row = Styled.div`
  height: ${tileSize}px;
  width: max-content;
`;

class RandomMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      width: 0,
    }

    this.grid = [];
    this.gridRefs = [];

    this.updateTileDepth = this.updateTileDepth.bind(this);
  }

  componentWillMount() {
    const height = window.innerHeight;
    const width = window.innerWidth;
    const numTilesY = Math.ceil(height / tileSize);
    const numTilesX = Math.floor(width / tileSize);
    this.setState({ width: numTilesX, height: numTilesY })

    for (var i = 0; i < numTilesY; i++) {
      const row = [];
      const refRow = [];
      for (var j = 0; j < numTilesX; j++) {
        row.push(
          <Random
            key={j}
            ref={ (instance) => refRow.push(instance) }
          />
        );
      }
      this.grid.push(<Row key={i}>{row}</Row>);
      this.gridRefs.push(refRow);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateTileDepth(nextProps);
  }

  updateTileDepth(nextProps) {
    const { width, height } = this.state;
    const { x, y } = this.props.spritePosition;
    if ((0 <= x) && (x < width) && (0 <= y) && (y < height)) {
      this.gridRefs[y][x].setDepth(false);
    }

    const nextX = nextProps.spritePosition.x;
    const nextY = nextProps.spritePosition.y;
    if ((0 <= nextX) && (nextX < width) && (0 <= nextY) && (nextY < height)) {
      this.gridRefs[nextY][nextX].setDepth(true);
    }
  }

  render() {
    return (
      [this.grid]
    );
  }

}

export default RandomMap;
