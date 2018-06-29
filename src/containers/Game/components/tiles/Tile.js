import React from 'react';
import Styled from 'styled-components';

class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      visible: false,
      type: '',
      depth: false
    }

    this.walkable = true;
    this.animated = false;
    this.steps = 0;
    this.rate = 250;
    if (props.position) {
      this.state.position = props.position;
    }
    if (props.walkable) {
      this.walkable = true;
      this.state.depth = true;
    } else if (props.walkable === false) {
      this.walkable = false;
    }
    this.setDepth = this.setDepth.bind(this);

    this.tileSize = 36;
    this.StyledTile = Styled.img`
      position: absolute;
      height: ${this.tileSize}px;
      width: ${this.tileSize}px;
      vertical-align: initial;
      left: 0px;
      z-index: ${(props) => props.depth ? 20 : 'auto' };
    `;
  }

  setDepth(depth) {
    this.setState({ visible: depth });
  }

  toggleHD(hd) {
    const { type } = this.state;
    if (hd) {
      this.setState({ type: `${type.replace('_hd', '')}_hd` });
    } else {
      this.setState({ type: type.replace('_hd', '') });
    }
  }

  render() {
    const { step, type, position, depth } = this.state;
    if (!type) return null;
    var tile = '';
    if (this.animated) {
      if (this.large) {
        tile = require(`../../../../graphics/tiles/${type}/${step}/${position}.png`);
      } else {
        tile = require(`../../../../graphics/tiles/${type}/${step}.png`);
      }
    } else if (position) {
      tile = require(`../../../../graphics/tiles/${type}/${position}.png`);
    } else {
      tile = require(`../../../../graphics/tiles/${type}.png`);
    }

    return (
      <this.StyledTile src={tile} depth={depth}/>
    );
  }

  componentWillMount() {
    if (this.props.hd) {
      this.setState({ type: this.state.type + '_hd' })
    }
  }

  animate() {
    const { step } = this.state;
    this.setState({ step: (step + 1) % this.steps });
  }

}

export default Tile;
