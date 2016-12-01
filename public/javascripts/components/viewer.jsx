import React from "react";
import axios from "axios";
import Channel from "./channel";

export default class Viewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: []
    };
    
    this.addChannel.bind(this);
    this.getChannelData.bind(this);
    this.processChannel.bind(this);
    this.addChannelToState.bind(this);
    
  }
  addChannel(){
    //Get a channel from the text input and add it to the props
  }
  getChannelData(channelName){
    var url = "/streams/" + channelName;
    axios(url)
    .then(data => {this.addChannelToState(data, channelName)});
  }
  addChannelToState(channel, channelName){
    console.log('g');
    channel = this.processChannel(channel, channelName);
    if(channel == 0){}//Throw an error
    var oldChannels = this.state.channels;
    oldChannels.push(channel);
    this.setState({channels: oldChannels})
  }
  processChannel(data, channelName) {
    if(data.data.stream == null){
	return {name: channelName, game: "N/A", link: data.data._links.channel, status: "Offline", logo: "../img/question.png"}
    }
    else if(data.data.error !== undefined){
	return 0;
    }
    else{
      var game = data.data.stream.game;
      var link = data.data.stream._links.self;
      var channel = data.data.stream.channel;
      var status = channel.status;
      var logo = channel.logo;
      var name = channel.display_name
      return {game:game, link:link, status:status, logo:logo}
    }
  }
  componentDidMount(){
    this.getChannelData("freecodecamp");
  }
  render() {
    var channels = this.state.channels.map(function(c, i){
	return <Channel key={i} number={i} game={c.game} link={c.link} status={c.status} logo={c.logo}/>
    })
    return (
      <table className="viewer table table-hover">
	<thead>
	  <tr>
	    <th>#</th>
	    <th>Name</th>
	    <th>Status</th>
	    <th>Logo</th>
	    <th>Game</th>
	  </tr>
	</thead>
	<tbody>
	  {channels}
	</tbody>
      </table>
    );
  }
}
