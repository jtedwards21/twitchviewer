import React from "react";
import axios from "axios";
import Channel from "./channel";

export default class Viewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: ""
    };
  }
  addStream(){

  }
  getChannelData(channel){
    var url = "https://wind-bow.hyperdev.space/twitch-api/streams" + channel;
    axios(url)
    .then(data => {processChannel(data)});
  }
  processChannel(data) {
    var game = data.stream.game;
    var link = data.stream._links.self;
    var preview = data.stream.preview.small;
    var channel = data.stream.channel;
    var status = channel.status;
    var logo = channel.logo;
  }
  render() {
    return (
      <div className="viewer">
      </div>
    );
  }
}
