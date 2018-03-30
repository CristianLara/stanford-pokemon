import React from 'react';
import Styled from 'styled-components';

class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
    }

    this.type = 'grass1';
    this.walkable = true;
    this.animated = false;
    this.depth = false;
    this.steps = 0;
    if (props.position) {
      this.position = props.position;
    }
    this.setDepth = this.setDepth.bind(this);

    this.tileSize = 36;
    this.StyledTile = Styled.img`
      height: ${this.tileSize}px;
      width: ${this.tileSize}px;
    `;
    this.tileTypes = [
      'top_left', 'top_mid', 'top_right',
      'mid_left', 'mid_mid', 'mid_right',
      'bottom_left', 'bottom_mid', 'bottom_right',
    ];
  }

  setDepth(depth) {
    this.setState({ visible: depth });
  }

  render() {
    const { step } = this.state;

    var tile = '';
    if (this.animated) {
      tile = require(`../../../../graphics/tiles/${this.type}/${step}.png`);
    } else if (this.position) {
      tile = require(`../../../../graphics/tiles/${this.type}/${this.position}.png`);
    } else {
      tile = require(`../../../../graphics/tiles/${this.type}.png`);
    }

    return (
      <this.StyledTile src={tile}/>
    );
  }

  componentDidMount() {
    if (this.animated) {
      setInterval(() => {
          const { step } = this.state;
          this.setState({ step: (step + 1) % this.steps });
      }, 250, this);
    }
  }

}

export default Tile;