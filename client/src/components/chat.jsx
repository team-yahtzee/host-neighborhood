import React from "react";
import axios from "axios";

import MessagesView from "../components/messagesView.jsx";
class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      messageText: ""
    };

    this.getMessages = this.getMessages.bind(this);
    this.onChange = this.onChange.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  componentDidMount() {
    this.getMessages();
  }
  getMessages() {
    let host = this.props.host;
    axios
      .get(`/contact/${host}/message`)
      .then(data => {
        this.setState({
          messages: data.data
        });
      })
      .catch(err => console.error(err));
  }

  onChange(e) {
    this.setState({
      messageText: e.target.value
    });
  }

  postMessage(e) {
    e.preventDefault();
    let host = this.props.host;
    let message = this.state.messageText;

    axios({
      url: `/contact/${host}/message`,
      method: "post",
      data: {
        messageBody: message,
        toHost: host
      }
    }).then(() => {
      this.getMessages();
    })
  }

  render() {
    return (
      <div>
        <span className="mostOfTheTextOnPage">
          <b>Send a message to host</b>
        </span>

        <button className="closeChat" onClick={this.props.handleCloseChatX}>
          x
        </button>

        <div className="chatView">
          <MessagesView messages={this.state.messages} />
        </div>

        <form onSubmit={this.postMessage}>
          <input className = 'inputForMessageToSend' onChange={this.onChange} placeholder = 'Your message here' />
          <button className = "sendMessageButton"> Send </button>
        </form>
      </div>
    );
  }
}

export default Chat;
