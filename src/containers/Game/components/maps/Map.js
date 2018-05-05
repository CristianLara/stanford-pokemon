import React from 'react';
import Styled from 'styled-components';
import Grass from '../tiles/Grass';
import Path from '../tiles/Path';
import Road from '../tiles/Road';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: window.innerHeight,
      width: window.innerWidth,
    }

    this.grid = []; // three
    this.gridRefs = [];
    this.map = {}
    this.hd = false;
    this.ground = Grass;
    this.tileSize = 36;
    this.row = Styled.div`
      height: ${this.tileSize}px;
      width: max-content;
    `;
    this.tile = Styled.div`
      position: relative;
      display: inline-block;
      height: ${this.tileSize}px;
      width: ${this.tileSize}px;
    `;

    this.updateTileDepth = this.updateTileDepth.bind(this);
    this.transport = this.transport.bind(this);
    this.addMapFeatures = this.addMapFeatures.bind(this);
    this.fillInGround = this.fillInGround.bind(this);
    this.addTile = this.addTile.bind(this);
    this.addShape = this.addShape.bind(this);
    this.toggleHD = this.toggleHD.bind(this);
    this.formatRows = this.formatRows.bind(this);
  }

  toggleHD(hd) {
    for (let y = 0; y < this.numTilesY; y++) {
      for (let x = 0; x < this.numTilesX; x++) {
        if (this.gridRefs[y][x]) {
          this.gridRefs[y][x].toggleHD(hd);
        }
      }
    }
  }

  componentWillMount() {
    const { height, width } = this.state;
    this.numTilesY = Math.ceil(height / this.tileSize);
    this.numTilesX = Math.ceil(width / this.tileSize);

    this.fillInGround();
    this.addMapFeatures();
    this.formatRows();
  }

  // function for subclasses to implement
  addMapFeatures() {}

  getPositionLabel(realSize, max, current) {
    if (max === realSize) {
      return current;
    } else {
      if (current < realSize - 1) {
        return current;
      } else if (current === max - 1) {
        return realSize - 1;
      } else {
        // do some funky math to loop inner tiles
        return 1 + ((current - (realSize - 1)) % (realSize - 2));
      }
    }
  }

  fillInGround() {
    for (let y = 0; y < this.numTilesY; y++) {
      if (!this.grid[y]) this.grid[y] = [];
      if (!this.gridRefs[y]) this.gridRefs[y] = [];

      for (let x = 0; x < this.numTilesX; x++) {
        this.grid[y][x] = [
          <this.ground
            key={x}
            index={{x: x, y: y}}
            ref={ (instance) => this.gridRefs[y][x] = instance }
            hd={this.props.hd}
          />
        ];
      }
    }
  }

  formatRows() {
    for (let y = 0; y < this.numTilesY; y++) {
      if (!this.grid[y]) this.grid[y] = [];
      if (!this.gridRefs[y]) this.gridRefs[y] = [];

      for (let x = 0; x < this.numTilesX; x++) {
        if (!this.grid[y][x]) {
          this.grid[y][x] = [];
        }
        this.grid[y][x] = <this.tile key={x}>{this.grid[y][x]}</this.tile>
      }

      this.grid[y] = <this.row key={y}>{this.grid[y]}</this.row>
    }
  }

  addTile(Tile, startX, startY, width, height, cutoff) {
    for (let y = 0; y < height; y++) {
      if (startY + y < 0 || startY + y >= this.numTilesY) continue;
      if (!this.grid[startY + y]) this.grid[startY + y] = [];
      if (!this.gridRefs[startY + y]) this.gridRefs[startY + y] = [];
      var ypos = Math.min(y, Tile.height-1);
      ypos = this.getPositionLabel(Tile.height, height, y);
      // handle 'cutting off' the vertical ends of paths
      if (cutoff && (height > width) && (y === 0 || y === height-1)) {
        ypos = 1;
      }

      for (let x = 0; x < width; x++) {
        if (startX + x < 0 || startX + x >= this.numTilesX) continue;
        var xpos = x;
        xpos = this.getPositionLabel(Tile.width, width, x);
        // handle 'cutting off' the horizontal ends of paths
        if (cutoff && (height < width) && (x === 0 || x === width-1)) {
          xpos = 1;
        }
        var position = this.combinePositions(Tile, ypos, xpos, startY, y, startX, x, height, width);
        this.grid[startY + y][startX + x].push(
          <Tile
            position={position}
            hd={this.props.hd}
            ref={ (inst) => this.gridRefs[startY + y][startX + x] = inst }
          />
        );
      }
    }
  }

  combinePositions(Tile, ypos, xpos, startY, y, startX, x, height, width) {
    var position = `${ypos}_${xpos}`;
    const tileDepth = this.grid[startY + y][startX + x].length;
    const topTile = this.grid[startY + y][startX + x][tileDepth-1];
    if (this.grid[startY + y][startX + x] &&
        (topTile.type === Path || topTile.type === Road) &&
        Tile.width === 3 && Tile.height === 3) {
      // there is already a path in this spot, use bi-directional tile
      position = '1_1';
      if (this.props.hd) {
        if (y === 0) {
          if (topTile.props.position === '1_0') {
            position = '0_0_corner';
          } else if (topTile.props.position === '1_2') {
            position = '0_1_corner';
          }
        } else if (y === height - 1) {
          if (topTile.props.position === '1_0') {
            position = '1_0_corner';
          } else if (topTile.props.position === '1_2') {
            position = '1_1_corner';
          }
        } else if (x === 0) {
          if (topTile.props.position === '0_1') {
            position = '0_0_corner';
          } else if (topTile.props.position === '2_1') {
            position = '1_0_corner';
          }
        } else if (x === width - 1) {
          if (topTile.props.position === '0_1') {
            position = '0_1_corner';
          } else if (topTile.props.position === '2_1') {
            position = '1_1_corner';
          }
        }
      }
    } else if (Tile.width === 1) {
      position = ypos + ''; // add empty string to pass by copy
    } else if (Tile.height === 1) {
      position = xpos + '';
    }
    return position;
  }

  addShape(Tile, shape) {
    const middleX = Math.floor(this.numTilesX / 2);
    const middleY = Math.floor(this.numTilesY / 2);

    const startY = middleY - Math.ceil(shape.length / 2);
    const startX = middleX - Math.ceil(shape[0].length / 2);
    for (let y = 0; y < shape.length; y++) {
      if (!this.grid[startY + y]) this.grid[startY + y] = [];
      if (!this.gridRefs[startY + y]) this.gridRefs[startY + y] = [];
      for (let x = 0; x < shape[0].length; x++) {
        if (shape[y][x]) {
          this.grid[startY + y][startX + x] = (
            <Tile
              key={startX + x}
              hd={this.props.hd}
              ref={ (inst) => this.gridRefs[startY + y][startX + x] = inst }
            />
          );
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // this.updateTileDepth(nextProps);
    this.transport(nextProps.spritePosition);
  }

  updateTileDepth(nextProps) {
    // const { width, height } = this.state;
    // const { x, y } = this.props.spritePosition;
    // if ((0 <= x) && (x < width) && (0 <= y) && (y < height)) {
    //   if (this.gridRefs[y][x] && this.gridRefs[y][x].setDepth) {
    //     this.gridRefs[y][x].setDepth(false);
    //   }
    // }
    //
    // const nextX = nextProps.spritePosition.x;
    // const nextY = nextProps.spritePosition.y;
    // if ((0 <= nextX) && (nextX < width) && (0 <= nextY) && (nextY < height)) {
    //   if (this.gridRefs[nextY][nextX] && this.gridRefs[nextY][nextX].setDepth) {
    //     this.gridRefs[nextY][nextX].setDepth(true);
    //   }
    // }
  }

  detectEdge(oldPosition, newPosition) {
    switch(newPosition.x) {
      case 0:
        if (newPosition.x === oldPosition.x) return {};
        return { edge: 'left', newPosition: {x: this.numTilesX-1, y: Math.floor(this.numTilesY/2)} };
      case this.numTilesX - 1:
        if (newPosition.x === oldPosition.x) return {};
        return { edge: 'right', newPosition: {x: 0, y: Math.floor(this.numTilesY/2)} };
      default:
        break;
    }
    switch(newPosition.y) {
      case 0:
        if (newPosition.y === oldPosition.y) return {};
        return { edge: 'up', newPosition: {x: Math.floor(this.numTilesX/2), y: this.numTilesY-1} };
      case this.numTilesY - 1:
        if (newPosition.y === oldPosition.y) return {};
        return { edge: 'down', newPosition: {x: Math.floor(this.numTilesX/2), y: 0} };
      default:
        break;
    }
    return {};
  }

  transport(position) {
    const { edge, newPosition } = this.detectEdge(this.props.spritePosition, position);
    if (edge && (edge in this.transitions)) {
      this.props.updateMap(this.transitions[edge], newPosition);
    }
  }

  render() {
    return (
      [this.grid]
    );
  }

}

export default Map;
