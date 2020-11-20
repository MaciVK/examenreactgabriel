import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* Aqui va el menu */}
        <Switch>
          <Route exact path="/" component={/*Aqui el componente Home*/} />
          <Route
            exact
            // path="/detalles/:iddepartamento"
            //ESTO PARA CUANDO LLEVA PARAMETROS
            // render={(props) => {
            //   var idDepart = props.match.params.iddepartamento;
            //   return <DetallesDepartamento iddepartamento={idDepart} />;
            // }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
