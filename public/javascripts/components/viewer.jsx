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
    .then(data => {this.addChannelToState(data)});
  }
  addChannelToState(channel){
    console.log('g');
    channel = this.processChannel(channel);
    var oldChannels = this.state.channels;
    oldChannels.push(channel);
    this.setState({channels: oldChannels})
  }
  processChannel(data) {
    if(data.data.stream == null){
	return {game: "N/a", link: data.data._links.channel, preview: "N/a", status: "Offline", logo: "N/a"}
    }
    else{
      var game = data.data.stream.game;
      var link = data.data.stream._links.self;
      var preview = data.data.stream.preview.small;
      var channel = data.data.stream.channel;
      var status = channel.status;
      var logo = channel.logo;
      return {game:game, link:link, preview:preview, status:status, logo:logo}
    }
  }
  componentDidMount(){
    this.getChannelData("freecodecamp");
  }
  render() {
    var channels = this.state.channels.map(function(c){
	return <Channel game={c.game} link={c.link} preview={c.preview} status={c.status} logo={c.logo}/>
    })
    return (
      <div className="viewer">
	{channels}
      </div>
    );
  }
}
