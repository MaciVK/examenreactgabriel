import Axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Global from "../../Global";

export default class NuevoPersonaje extends Component {
  cajaNombre = React.createRef();
  cajaImagen = React.createRef();
  cajaSerie = React.createRef();
  state = {
    series: [],
    status: false,
  };

  getSeries = () => {
    var request = Global.url + "api/series";
    console.log(request);
    Axios.get(request).then((respuesta) => {
      this.setState({
        series: respuesta.data,
      });
    });
  };
  postPersonaje = (e) => {
    e.preventDefault();
    var request = Global.url + "api/personajes";

    var personaje = {
      nombre: this.cajaNombre.current.value,
      imagen: this.cajaImagen.current.value,
      idSerie: parseInt(this.cajaSerie.current.value),
      idPersonaje: 0,
    };
    console.log(personaje.cajaSerie);
    Axios.post(request, personaje).then((respuesta) => {
      this.setState({
        status: true,
      });
      alert("Personaje Modificado");
    });
  };

  componentDidMount() {
    this.getSeries();
  }
  render() {
    if (this.state.status == true) {
      return <Redirect to={"/detalles/" + this.cajaSerie.current.value} />;
    }
    return (
      <form onSubmit={this.postPersonaje}>
        <label>Nombre</label>
        <input type="text" className="form-control" ref={this.cajaNombre} />
        <label>Imagen</label>
        <input type="text" className="form-control" ref={this.cajaImagen} />
        <div className="form-group">
          <label>Serie</label>
          <select className="form-control" ref={this.cajaSerie}>
            {this.state.series.map((serie, index) => {
              return (
                <option key={index} value={serie.idSerie}>
                  {serie.nombre}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-warning">CREAR PERSONAJE</button>
      </form>
    );
  }
}
