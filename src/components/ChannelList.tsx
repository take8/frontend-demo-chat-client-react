import * as React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";

// TODO: 簡略化のため、チャンネル一覧をここで定義
const channels = [ "general", "random" ];

export class ChannelList extends React.Component<{}, {}> {
  public render() {
    return (
      <Menu inverted vertical fixed={'left'}>
        <Menu.Item>
          Channels
          <Menu.Menu>
            {channels.map(channel =>
              // 配列を扱う場合は必ず key を指定する
              <Menu.Item
                  key={channel}
                  as={NavLink}
                  to={{ pathname: `/channels/${channel}` }}>
                {channel}
              </Menu.Item>
            )}
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }
}
