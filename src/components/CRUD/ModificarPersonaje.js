import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Global from "../../Global";
import { ready } from "jquery";
export default class ModificarPersonaje extends Component {
  cajaNombre = React.createRef();
  cajaSerie = React.createRef();
  cajaPerson = React.createRef();
  state = {
    status: false,
    series: [],
    personajes: [],
    serieMostrada: {},
    personajeMostrado: {},
  };

  cargarPersonajesySeries = () => {
    var requestSeries = Global.url + "api/series";
    Axios.get(requestSeries).then((respuesta) => {
      this.setState({
        series: respuesta.data,
      });
    });
    var requestPersons = Global.url + "/api/personajes";
    Axios.get(requestPersons).then((respuesta) => {
      this.setState({
        personajes: respuesta.data,
      });
    });
    console.log("cargado");
  };
  putPersonaje = (e) => {
    e.preventDefault();

    var request =
      Global.url +
      "api/personajes/" +
      this.cajaPerson.current.value +
      "/" +
      this.cajaSerie.current.value;
    Axios.put(request).then((respuesta) => {
      this.setState({
        status: true,
      });
    });
    alert("Personaje Modificado");
  };
  mostrarSerie = () => {
    var request = Global.url + "/api/series/" + this.cajaSerie.current.value;
    Axios.get(request).then((respuesta) => {
      this.setState({
        serieMostrada: respuesta.data,
      });
    });
  };
  mostrarPersonaje = () => {
    var request =
      Global.url + "/api/personajes/" + this.cajaPerson.current.value;
    Axios.get(request).then((respuesta) => {
      this.setState({
        personajeMostrado: respuesta.data,
      });
    });
  };

  componentDidMount() {
    this.cargarPersonajesySeries();
  }
  render() {
    if (this.state.status) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <form onSubmit={this.putPersonaje}>
          <label>Nombre</label>
          <input type="text" className="form-control" ref={this.cajaNombre} />
          <div className="form-group">
            <label>Serie</label>
            <select
              className="form-control"
              ref={this.cajaSerie}
              onChange={this.mostrarSerie}
            >
              {this.state.series.map((serie, index) => {
                return (
                  <option key={index} value={serie.idSerie}>
                    {serie.nombre}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Personaje</label>
            <select
              className="form-control"
              ref={this.cajaPerson}
              onChange={this.mostrarPersonaje}
            >
              {this.state.personajes.map((personaje, index) => {
                return (
                  <option key={index} value={personaje.idPersonaje}>
                    {personaje.nombre}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="btn btn-success">Modificar</button>
        </form>
        {this.state.serieMostrada && (
          <React.Fragment>
            <h1>{this.state.serieMostrada.nombre}</h1>
            <img
              style={{ width: "200px", height: "200px" }}
              src={this.state.serieMostrada.imagen}
            />
          </React.Fragment>
        )}

        {this.state.personajeMostrado && (
          <React.Fragment>
            <h1>{this.state.personajeMostrado.nombre}</h1>
            <img
              style={{ width: "200px", height: "200px" }}
              src={this.state.personajeMostrado.imagen}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}
