import React from 'react';
import Styled from 'styled-components';

class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      visible: false,
      type: ''
    }

    this.walkable = true;
    this.animated = false;
    this.steps = 0;
    if (props.position) {
      this.state.position = props.position;
    }
    this.setDepth = this.setDepth.bind(this);

    this.tileSize = 36;
    this.StyledTile = Styled.img`
      height: ${this.tileSize}px;
      width: ${this.tileSize}px;
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
    const { step, type, position } = this.state;
    if (!type) return null;
    var tile = '';
    if (this.animated) {
      tile = require(`../../../../graphics/tiles/${type}/${step}.png`);
    } else if (position) {
      tile = require(`../../../../graphics/tiles/${type}/${position}.png`);
    } else {
      tile = require(`../../../../graphics/tiles/${type}.png`);
    }

    return (
      <this.StyledTile src={tile}/>
    );
  }

  componentWillMount() {
    if (this.props.hd) {
      this.setState({ type: this.state.type + '_hd' })
    }
  }

  componentDidMount() {
    if (this.animated) {
      this.timer = setInterval(() => {
          const { step } = this.state;
          this.setState({ step: (step + 1) % this.steps });
      }, 250, this);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

}

export default Tile;
