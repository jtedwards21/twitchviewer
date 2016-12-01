import React from "react";

export default class Channel extends React.Component {
  contructor(props) {
    super(props);
    
    this.state = {

    };
  }
  render(){
    //Add className for coloring for inactive channels
    //This should be a table, not a collection of divs.
    return (
      <div className="channel">
	<div className="game">{this.props.game}</div>
        <div className="preview"><img src={this.props.preview} /></div>
        <div className="channel"><a href={this.props.link}>{this.props.channel}</a></div>
        <div className="status">this.props.status</div>
        <div className="logo"><a href={this.props.link}><img src={this.props.logo}/></a></div>
      </div>
    )
  }
}
