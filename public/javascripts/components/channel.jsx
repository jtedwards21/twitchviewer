import React from "react";

export default class Channel extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {

    };
  }
  render(){
    return (
      <tr className="channel">
	<th scope="row">{this.props.number}</th>
        <td className="channel"><a href={this.props.link}>{this.props.channel}</a></td>
        <td className="status">{this.props.status}</td>
        <td className="logo"><a href={this.props.link}><img className="logo-img" src={this.props.logo}/></a></td>
	<td className="game">{this.props.game}</td>
      </tr>
    )
  }
}
