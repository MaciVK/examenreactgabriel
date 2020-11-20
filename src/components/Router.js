import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Menu from "./CRUD/Menu";
import ModificarPersonaje from "./CRUD/ModificarPersonaje";
import NuevoPersonaje from "./CRUD/NuevoPersonaje";
import PersonajesSerie from "./CRUD/PersonajesSerie";
import Series from "./CRUD/Series";

export default class Router extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Menu />
          <Switch>
            <Route
              exact
              path="/detalles/:idserie"
              render={(props) => {
                var id = props.match.params.idserie;
                return <Series idSerie={id} />;
              }}
            />
            <Route
              exact
              path="/detalles/seriepersonajes/:idserie"
              render={(props) => {
                var id = props.match.params.idserie;
                return <PersonajesSerie idSerie={id} />;
              }}
            />
            <Route exact path="/nuevopersonaje" component={NuevoPersonaje} />
            <Route
              exact
              path="/modificarpersonaje"
              component={ModificarPersonaje}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
