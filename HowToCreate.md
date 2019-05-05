# How to create this repository

```sh
create-react-app frontend-demo-chat-client-react --typescript
```

起動の仕方

```sh
npm start
```

## スタイルの調整の仕方

Semantic UI, Semantic UI React を使用しているので、以下を参考に調べる。

- https://react.semantic-ui.com/
- https://semantic-ui.com/introduction/getting-started.html

### React の CSS の設定方法

- `style={{ ... }}`で指定する。
- CSS プロパティ名はキャメルケースにする。(`padding-top` -> `paddingTop`)
- CSS プロパティの値は文字列として指定する。(クオーテーションをつける)

```react
<Header style={{ position: "fixed", width: "100%", background: "#fff", zIndex: "1", paddingTop: "1rem" }}>
```
