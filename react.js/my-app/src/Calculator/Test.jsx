import * as React from "react";

class Test extends React.Component {
  state = {
    a: 10,
    b: 20,
  };
  setA = (e) => {
    this.setState({
      a: parseInt(e.target.value),
      showResult: false,
    });
  };
  setB = (e) => {
    this.setState({
      b: parseInt(e.target.value),
      showResult: false,
    });
  };
  setshowResult = (e) => {
    this.setState({
      showResult: true,
    });
  };
  render() {
    const add = this.state.a + this.state.b;
    return (
      <div>
        <input className="inputA" onChange={this.setA} />
        <input onChange={this.setB} />
        <button onClick={this.setshowResult}>Result</button>

        {this.state.showResult ? (
          <div>
            <br />
            {"A:" + this.state.a + " B: " + this.state.b}
            <br />
            {"Add : " + add}
            <br />
          </div>
        ) : (
          <div>Click On Result button</div>
        )}
      </div>
    );
  }
}

export default Test;
