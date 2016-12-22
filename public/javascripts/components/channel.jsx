import React from "react";

export default class Channel extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {

    };
  }
  redirect(){
　　　　if(this.props.link !== "none"){
    var l = this.props.link;
    window.location=l; }
  }
  render(){
	var logo = this.props.logo;
        if(logo == "none"){logo = "/img/question.png"}
    return (
      <tr className="channel"　onClick={this.redirect.bind(this)}>
	<th scope="row">{this.props.number}</th>
	<td className="channelName">{this.props.name}</td>
        <td className="status">{this.props.status}</td>
        <td className="logo"><a><img className="logo-img" src={logo}/></a></td>
	<td className="game">{this.props.game}</td>
      </tr>
    )
  }
}
