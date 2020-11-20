import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Global from "../../Global";

export default class Menu extends Component {
  state = {
    status: false,
    series: [],
  };

  getSeries = () => {
    var request = Global.url + "api/series";
    console.log(request);
    axios.get(request).then((respuesta) => {
      this.setState({
        series: respuesta.data,
        status: true,
      });
    });
  };
  componentDidMount() {
    this.getSeries();
  }

  getSeries;
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          INICIO
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/nuevopersonaje">
                Crear Personaje <span className="sr-only"></span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/modificarpersonaje">
                Modificar Personaje <span className="sr-only"></span>
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Series
              </a>
              {this.state.status && (
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {this.state.series.map((serie, index) => {
                    return (
                      <NavLink
                        to={"/detalles/" + serie.idSerie}
                        key={index}
                        className="dropdown-item"
                      >
                        {serie.nombre}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
