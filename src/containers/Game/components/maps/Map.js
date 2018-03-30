import React from 'react';
import Styled from 'styled-components';
import Grass from '../tiles/Grass';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: window.innerHeight,
      width: window.innerWidth,
    }

    this.grid = [];
    this.gridRefs = [];
    this.map = {}
    this.tileSize = 36;
    this.row = Styled.div`
      height: ${this.tileSize}px;
      width: max-content;
    `;

    this.updateTileDepth = this.updateTileDepth.bind(this);
    this.addMapFeatures = this.addMapFeatures.bind(this);
    this.fillInGrass = this.fillInGrass.bind(this);
  }

  addMapFeatures(numTilesY, numTilesX) {

  }

  getPositionLabelY(max, current) {
    switch(current) {
      case 0:
        return 'top';
      case max - 1:
        return 'bottom';
      default:
        return 'mid';
    }
  }

  getPositionLabelYTall(max, current) {
    switch(current) {
      case 0:
        return 'top';
      case max - 1:
        return 'bottom';
      case 1:
        return 'mid_top';
      default:
        return 'mid_bottom';
    }
  }

  getPositionLabelX(max, current) {
    switch(current) {
      case 0:
        return 'left';
      case max - 1:
        return 'right';
      default:
        return 'mid';
    }
  }

  fillInGrass(numTilesY, numTilesX) {
    for (let y = 0; y < numTilesY; y++) {
      if (!this.grid[y]) this.grid[y] = [];
      if (!this.gridRefs[y]) this.gridRefs[y] = [];

      for (let x = 0; x < numTilesX; x++) {
        if (!this.grid[y][x]) {
          this.grid[y][x] = (
            <Grass
              key={x}
              ref={ (instance) => this.gridRefs[y][x] = instance }
            />
          );
        }
      }
      this.grid[y] = <this.row key={y}>{this.grid[y]}</this.row>
    }
  }

  componentWillMount() {
    const { height, width } = this.state;
    const numTilesY = Math.ceil(height / this.tileSize);
    const numTilesX = Math.floor(width / this.tileSize);

    this.addMapFeatures(numTilesY, numTilesX);
    this.fillInGrass(numTilesY, numTilesX);
  }

  componentWillReceiveProps(nextProps) {
    this.updateTileDepth(nextProps);
  }

  updateTileDepth(nextProps) {
    const { width, height } = this.state;
    const { x, y } = this.props.spritePosition;
    if ((0 <= x) && (x < width) && (0 <= y) && (y < height)) {
      if (this.gridRefs[y][x] && this.gridRefs[y][x].setDepth) {
        this.gridRefs[y][x].setDepth(false);
      }
    }

    const nextX = nextProps.spritePosition.x;
    const nextY = nextProps.spritePosition.y;
    if ((0 <= nextX) && (nextX < width) && (0 <= nextY) && (nextY < height)) {
      if (this.gridRefs[nextY][nextX] && this.gridRefs[nextY][nextX].setDepth) {
        this.gridRefs[nextY][nextX].setDepth(true);
      }
    }
  }

  render() {
    return (
      [this.grid]
    );
  }

}

export default Map;
