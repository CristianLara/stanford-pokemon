import React from 'react';
import Styled from 'styled-components';
import _ from 'underscore';

const Sprite = Styled.img`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  transition: all 0.3s linear;
  z-index: 10;
`;

const keyMap = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gridPosition: {x: 1, y: 1},
      x: 40,
      y: 20,
      stepSize: 36,
      direction: 'down',
      step: 0,
    }

    this.walk = this.walk.bind(this);
  }

  componentWillMount() {
    document.addEventListener("keydown", _.throttle(this.walk, 200));
    document.addEventListener("keydown", this.preventScroll);
  }

  preventScroll(event) {
    if (Object.values(keyMap).includes(event.which)) {
      event.preventDefault();
    }
  }

  walk(event) {
    let { x, y, stepSize, direction, step, gridPosition } = this.state;

    if (Object.values(keyMap).includes(event.which)) {
      step = (step + 1) % 9;
    }

    switch(event.which) {
      case keyMap.left:
        x -= stepSize;
        gridPosition.x -= 1;
        direction = 'left';
        break;
      case keyMap.up:
        y -= stepSize;
        gridPosition.y -= 1;
        direction = 'up';
        break;
      case keyMap.right:
        x += stepSize;
        gridPosition.x += 1;
        direction = 'right';
        break;
      case keyMap.down:
        y += stepSize;
        gridPosition.y += 1;
        direction = 'down';
        break;
      default:
        break;
    }

    this.props.updatePosition(gridPosition);
    this.setState({ x: x, y: y, direction: direction, step: step, gridPosition: gridPosition });
  }

  componentDidUpdate(prevProps, prevState) {
    const { step } = this.state;
    if (step !== 0) {
      setTimeout(() => {
          this.setState({ step: (step + 1) % 9 });
      }, 40);
    }
  }

  render() {
    const { x, y, direction, step } = this.state;
    const spriteSource = require(`../../../graphics/sprites/${direction}${step}.png`);
    return (
      <Sprite src={spriteSource} x={x} y={y}></Sprite>
    );
  }

}

export default Player;
