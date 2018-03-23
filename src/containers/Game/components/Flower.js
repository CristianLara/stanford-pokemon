import React from 'react';
import Styled from 'styled-components';

const tileSize = 36;

const StyledGrass = Styled.img`
  height: ${tileSize}px;
  width: ${tileSize}px;
`;

class Flower extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
    }
  }

  render() {
    const { step } = this.state;
    const flower = require(`../../../graphics/tiles/flowers${step}.png`);
    return (
      <StyledGrass src={flower}/>
    );
  }

  updateFlower() {

  }

  componentDidMount() {
    setInterval(() => {
        const { step } = this.state;
        console.log(step)
        this.setState({ step: (step + 1) % 5 });
    }, 250, this);
  }

}

export default Flower;
