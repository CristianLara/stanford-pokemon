import React from 'react';
import Styled from 'styled-components';

const Sprite = Styled.img`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  transition: all 0.4s linear;
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
      x: 40,
      y: 20,
      stepSize: 36,
      direction: 'down',
      step: 0,
    }

    this.walk = this.walk.bind(this);
  }

  componentWillMount() {
    document.addEventListener("keydown", this.walk, false);
  }

  walk(event) {
    let { x, y, stepSize, direction, step } = this.state;

    switch(event.which) {
      case keyMap.left:
        event.preventDefault()
        x -= stepSize;
        direction = 'left';
        break;
      case keyMap.up:
        event.preventDefault()
        y -= stepSize;
        direction = 'up';
        break;
      case keyMap.right:
        event.preventDefault()
        x += stepSize;
        direction = 'right';
        break;
      case keyMap.down:
        event.preventDefault()
        y += stepSize;
        direction = 'down';
        break;
      default:
        break;
    }

    step = (step + 1) % 9;

    this.setState({ x: x, y: y, direction: direction, step: step });
  }

  componentDidUpdate(prevProps, prevState) {
    const { step } = this.state;
    if (step !== 0) {
      setTimeout(() => {
          this.setState({ step: (step + 1) % 9 });
      }, 50);
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
