import React, { Component } from "react";
import axios from "axios";
import Global from "../../Global";
import { NavLink } from "react-router-dom";

export default class Series extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    status: false,
    detalles: {},
  };

  getDetalles = () => {
    var request = Global.url + "/api/series/" + this.props.idSerie;
    axios.get(request).then((respuesta) => {
      this.setState({
        status: true,
        detalles: respuesta.data,
      });
    });
  };
  componentDidMount() {
    this.getDetalles();
  }

  render() {
    return (
      <div className="card  m-auto" style={{ width: "18rem" }}>
        {this.state.status && (
          <div className="card-body">
            <img
              src={this.state.detalles.imagen}
              className="card-img-top"
              alt={this.state.detalles.nombre}
            />
            <h5 className="card-title">{this.state.detalles.nombre}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              IMDB:{this.state.detalles.puntuacion}
            </h6>
            <p className="card-text">{this.state.detalles.año}</p>
            <NavLink
              to={"/detalles/seriepersonajes/" + this.props.idSerie}
              className="btn btn-info"
            >
              Personajes
            </NavLink>
          </div>
        )}
      </div>
    );
  }
}
