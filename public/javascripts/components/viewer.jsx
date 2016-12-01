import React from "react";
import axios from "axios";
import Channel from "./channel";

export default class Viewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: []
    };
  }
  addChannel(){
    //Get a channel from the text input and add it to the props
  }
  getChannelData(channelName){
    var url = "https://wind-bow.hyperdev.space/twitch-api/streams" + channelName;
    axios(url)
    .then(data => {addChannelToState(data)});
  }
  addChannelToState(channel){
    channel = this.processChannel(channel);
    var oldChannels = this.state.channels;
    oldChannels.push(channel);
    this.setState(channels: oldChannels)
  }
  processChannel(data) {
    var game = data.stream.game;
    var link = data.stream._links.self;
    var preview = data.stream.preview.small;
    var channel = data.stream.channel;
    var status = channel.status;
    var logo = channel.logo;
    return {game:game, link:link, preview:preview, status:status, logo:logo}
  }
  componentDidMount(){
    getChannelData("freecodecamp");
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
