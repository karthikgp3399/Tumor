import React from "react";

class Life extends React.Component {
  state = {
    A1: {
      name: "vinay",
      likes: "1K",
    },
    A2: {
      name: "ajay",
      likes: "2k",
    },
  };
  getdata = (cinema) => {
    return <cinema name={cinema.name} likes={cinema.likes} />;
  };
  render() {
    return (
      <div>
        {this.getdata(this.state.A1)}
        {this.getdata(this.state.A2)}
      </div>
    );
  }
}

export default Life;
