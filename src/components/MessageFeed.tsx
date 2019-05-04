import * as React from "react";
import { fetchMessages, Message } from "../client";
import { Comment, Header } from "semantic-ui-react";

interface MessageFeedProps {
  channelName: string;
}

interface MessageFeedState {
  messages: Message[];
}

export class MessageFeed extends React.Component<
  MessageFeedProps,
  MessageFeedState
> {
  constructor(props: MessageFeedProps) {
    super(props);
    // stateの初期状態を定義
    this.state = {
      messages: []
    };
  }

  public render() {
    return (
      <Comment.Group>
        <Header as="h3" dividing>
          {this.props.channelName}
        </Header>
        {this.state.messages
          .slice()
          .reverse()
          .map(message => (
            <Comment key={message.id}>
              <Comment.Avatar src={message.user.avatar || "/favicon.ico"} />
              <Comment.Content>
                <Comment.Author as="a">{message.user.name}</Comment.Author>
                <Comment.Metadata>
                  <div>{message.date}</div>
                </Comment.Metadata>
                <Comment.Text>{message.body}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
      </Comment.Group>
    );
  }

  public componentDidMount() {
    this.fetchMessages(this.props.channelName);
  }

  public componentDidUpdate(prevProps: MessageFeedProps) {
    if (prevProps.channelName !== this.props.channelName) {
      this.fetchMessages(this.props.channelName);
    }
  }

  private fetchMessages = (channelName: string) => {
    fetchMessages(channelName)
      .then(response => {
        this.setState({ messages: response.data.messages });
      })
      .catch(err => {
        console.log(err);
      });
  };
}
