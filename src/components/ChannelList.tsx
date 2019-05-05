import * as React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import Axios, { CancelTokenSource } from "axios";
import { fetchChannels } from "../client";

interface ChannelListProps {
}

interface ChannelListState {
  channels: string[];
  isLoading: boolean;
}

export class ChannelList extends React.Component<ChannelListProps, ChannelListState> {
  private cancelTokenSource: CancelTokenSource;

  constructor(props: ChannelListProps) {
    super(props);
    this.state = {
      channels: [],
      isLoading: true
    }
    // TODO: null を入れたいがエラーになってしまう
    this.cancelTokenSource = Axios.CancelToken.source();
  }

  public render() {
    return (
      <Menu inverted vertical fixed={"left"}>
        <Menu.Item as={Link} to={"/"}>
          Home
          <Icon name="home" />
        </Menu.Item>
        <Menu.Item>
          Channels
          <Icon name="list" />
          <Menu.Menu>
            {this.state.channels.map(channel => (
              // 配列を扱う場合は必ず key を指定する
              <Menu.Item
                key={channel}
                as={NavLink}
                to={{ pathname: `/channels/${channel}` }}
              >
                {channel}
              </Menu.Item>
            ))}
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }

  /**
   * コンポーネントがマウントされたとき
   */
  public componentDidMount() {
    this.fetchChannels();
  }

  private fetchChannels = () => {
    // cancelTokenを生成
    this.cancelTokenSource = Axios.CancelToken.source();

    fetchChannels({}, this.cancelTokenSource.token)
      .then(response => {
        this.setState({
          channels: response.data.channels,
          isLoading: false
        });
      })
      .catch(err => {
        if (Axios.isCancel(err)) {
          // アンマウントされていた場合
          console.log(err);
        } else {
          // 通常のエラー
          console.log(err);
        }
      });
  };
};
