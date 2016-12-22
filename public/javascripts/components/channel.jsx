import React from "react";

export default class Channel extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {

    };
  }
  redirect(){
    var l = this.props.link;
    window.location=l;
  }
  render(){
    return (
      <tr className="channel"　onClick={this.redirect.bind(this)}>
	<th scope="row">{this.props.number}</th>
	<td className="channelName">{this.props.name}</td>
        <td className="status">{this.props.status}</td>
        <td className="logo"><a href={this.props.link}><img className="logo-img" src={this.props.logo}/></a></td>
	<td className="game">{this.props.game}</td>
      </tr>
    )
  }
}
