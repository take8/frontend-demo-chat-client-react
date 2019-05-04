import * as React from "react";
import { match } from "react-router-dom";
import { MessageForm, MessageFeed } from "../components";

interface ChannelMatch {
  channelName: string;
}

interface ChannelProps {
  match: match<ChannelMatch>;
}

export class Channel extends React.Component<ChannelProps, {}> {
  constructor(props: ChannelProps) {
    super(props);
  }

  public render() {
    const { channelName } = this.props.match.params;
    // 複数のComponentを返す場合は配列を使用する
    return [
      <MessageFeed key="message-feed" channelName={channelName} />,
      <MessageForm key="message-form" channelName={channelName} />
    ];
  }
}
