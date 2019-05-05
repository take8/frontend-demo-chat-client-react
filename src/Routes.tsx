import * as React from "react";
import { render } from "react-dom";
import { Switch } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import { ChannelList } from "./components";
import { Channel } from "./containers";
import { Container } from "semantic-ui-react";

const routes = (
  // BrowserRouter: History API を使用したRoutingのために利用
  <BrowserRouter>
    <div id="wrapper">
      <ChannelList />
      <main style={{ marginLeft: "15rem" }}>
        <Container>
          {/* Routing */}
          <Switch>
            <Route
              exact={true}
              path="/channels/:channelName"
              component={Channel}
            />
            <Route
              exact={true}
              path="/"
              render={() => <h1>Sample Application</h1>}
            />
          </Switch>
        </Container>
      </main>
    </div>
  </BrowserRouter>
);

// render(routes, document.getElementById("app"));
export default routes;
