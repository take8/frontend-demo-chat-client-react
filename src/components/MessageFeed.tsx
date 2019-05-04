import * as React from "react";
import { fetchMessages, Message } from "../client";
import { Comment, Header } from "semantic-ui-react";

interface MessageFeedProps {
  channelName: string;
  shouldReload: boolean;
  setShouldReload: (shouldReload: boolean) => void;
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

  /**
   * props が更新されたとき
   * @param prevProps
   */
  public componentDidUpdate(prevProps: MessageFeedProps) {
    if (
      prevProps.channelName !== this.props.channelName ||
      // shouldReload が true に変わったとき
      (!prevProps.shouldReload && this.props.shouldReload)
    ) {
      this.fetchMessages(this.props.channelName);
    }
  }

  private fetchMessages = (channelName: string) => {
    // shouldReload が true の場合
    if (this.props.shouldReload) this.props.setShouldReload(false);

    fetchMessages(channelName)
      .then(response => {
        this.setState({ messages: response.data.messages });
      })
      .catch(err => {
        console.log(err);
      });
  };
}
