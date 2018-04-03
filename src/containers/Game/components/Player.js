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
    let { direction, step } = this.state;
    var gridPosition = { x: this.props.position.x, y: this.props.position.y };
    const isValid = this.props.isValid;

    if (Object.values(keyMap).includes(event.which)) {
      step = (step + 1) % 9;
    }

    switch(event.which) {
      case keyMap.left:
        direction = 'left';
        if (isValid(gridPosition.y, gridPosition.x-1)) {
          gridPosition.x -= 1;
        }
        break;
      case keyMap.up:
        direction = 'up';
        if (isValid(gridPosition.y-1, gridPosition.x)) {
          gridPosition.y -= 1;
        }
        break;
      case keyMap.right:
        direction = 'right';
        if (isValid(gridPosition.y, gridPosition.x+1)) {
          gridPosition.x += 1;
        }
        break;
      case keyMap.down:
        direction = 'down';
        if (isValid(gridPosition.y+1, gridPosition.x)) {
          gridPosition.y += 1;
        }
        break;
      default:
        break;
    }

    this.props.updatePosition(gridPosition);
    this.setState({ direction: direction, step: step });
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
    const { direction, step, stepSize } = this.state;
    const gridPosition = this.props.position;
    const spriteSource = require(`../../../graphics/sprites/${direction}${step}.png`);
    const x = 4 + gridPosition.x * stepSize;
    const y = -16 + gridPosition.y * stepSize;
    return (
      <Sprite src={spriteSource} x={x} y={y}></Sprite>
    );
  }

}

export default Player;
