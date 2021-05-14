import React from "react";

class Lifecycle extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor");
  }
  state = {
    a: 0,
  };
  componentWillmount = () => {
    console.log("componentWillmount");
  };
  componentDidMount = () => {
    console.log("componentDidMount");
  };
  shouldComponentUpdate = () => {
    console.log("shouldComponentUpdate");
    return true;
  };
  componentWillupdate = () => {};
  componentDidUpdate = () => {};
  changestate = (e) => {
    this.setState({
      a: this.state.a + 10,
    });
  };
  render() {
    return (
      <div>
        Lifecycle <button onClick={this.changestate}>changestate</button>
        {this.state.a}
      </div>
    );
  }
}
export default Lifecycle;
