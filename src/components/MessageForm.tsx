import * as React from "react";
import { postMessage, Message } from "../client";
import { Button, Form, Segment, Dimmer, Loader } from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";

interface MessageFormProps {
  channelName: string;
  setShouldReload: (shouldReload: boolean) => void;
}

interface MessageFormState {
  body?: string;
  isLoading: boolean;
}

export class MessageForm extends React.Component<
  MessageFormProps,
  MessageFormState
> {
  constructor(props: MessageFormProps) {
    super(props);
    this.state = {
      body: "",
      isLoading: false
    };
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  public render() {
    if (this.state.isLoading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    }
    return (
      <Segment basic textAlign="center">
        {/* onSubmitの方が、ボタンにonClickで登録するより、Enterキーでイベント実行されるなど都合が良い */}
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Field>
            {/* https://react.semantic-ui.com/addons/text-area/ */}
            <TextareaAutosize
              placeholder="Write your message"
              value={this.state.body}
              onChange={this.handleTextAreaChange}
            />
          </Form.Field>
          {/* <p>入力中の値: {this.state.body}</p> */}
          <Button primary type="submit">
            Send
          </Button>
        </Form>
      </Segment>
    );
  }

  private handleTextAreaChange(event: React.FormEvent<HTMLTextAreaElement>) {
    event.preventDefault();
    this.setState({ body: event.currentTarget.value });
  }

  private handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 送信直前にスピナーを表示
    this.setState({ isLoading: true });
    event.preventDefault();
    const payload = {
      body: this.state.body
    } as Message;
    postMessage(this.props.channelName, payload)
      .then(() => {
        this.setState({ body: "", isLoading: false });
        // 送信成功時にリロードするため、 props を更新して親コンポーネントに検知させる
        // TODO: 他のユーザが送信成功時にリロードするようにすべき
        this.props.setShouldReload(true);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
