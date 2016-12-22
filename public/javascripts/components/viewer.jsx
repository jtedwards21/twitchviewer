import React from "react";
import axios from "axios";
import Channel from "./channel";

export default class Viewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
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
    var oldChannels = this.state.channels.slice();
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
      var channel = data.data.stream.channel;
      var link = channel.url;
      var status = channel.status;
      var logo = channel.logo;
      var name = channel.display_name
      return {name:name, game:game, link:link, status:status, logo:logo}
    }
  }
  getFeatured(){
    var url = "/streams/featured";
    axios(url)
    .then(data => {this.addFeaturedToState(data).bind(this)});
  }
  addFeaturedToState(data){
    var f = data.data.featured;
    for(var i=0; i < f.length;i++){
      var sorted = this.processFeaturedChannel(f[i]);
      var oldChannels = this.state.channels.slice();
      oldChannels.push(sorted);
      this.setState({channels: oldChannels});
    }
  }
  processFeaturedChannel(channel){
    var game = channel.stream.game;
      var c= channel.stream.channel;
      var link = c.url;
      var status = c.status;
      var logo = c.logo;
      var name = c.display_name
      return {name:name,game:game, link:link, status:status, logo:logo}
  }
  addNewChannel(){
    var s = this.state.search;
    this.getChannelData(s);
  }
  handleChange(e){
    this.setState({search: e.target.value});
  }
  componentDidMount(){
    this.getChannelData("freecodecamp");
    this.getFeatured();
  }
  render() {
    var channels = this.state.channels.map(function(c, i){
        console.log(c);
	return <Channel name={c.name} key={i} number={i} game={c.game} link={c.link} status={c.status} logo={c.logo}/>
    })
    var s = {marginBottom: "40px"};
    return (
	//This can have a litte add icon next to the input block
　　　　　　<div id="r" className="row">
	<div id="main-content" className="col-md-6 col-md-offset-3">
        <div style={s} id="search-bar" className="input-group">
	  <input type="text" className="form-control" onChange={this.handleChange.bind(this)} value={this.state.search} aria-describedby="basic-addon1" placeholder="Add a channel..." />
	  <span className="add-button input-group-addon" onClick={this.addNewChannel.bind(this)} id="basic-addon1">+</span>
	</div>
        <table id="channels" className="viewer table table-hover">
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
	</div>
      </div>
    );
  }
}
