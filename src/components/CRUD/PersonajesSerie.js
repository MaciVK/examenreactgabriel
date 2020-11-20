import React, { Component } from "react";
import axios from "axios";
import Global from "../../Global";
import { NavLink } from "react-router-dom";

export default class PersonajesSerie extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    personajes: [],
    status: false,
  };

  getPersonajesSerie = () => {
    var request = Global.url + "/api/personajes";
    var arrayPersonajes = [];
    axios.get(request).then((respuesta) => {
      for (let personaje of respuesta.data) {
        if (personaje.idSerie == this.props.idSerie) {
          arrayPersonajes.push(personaje);
        }
      }
      this.setState({
        personajes: arrayPersonajes,
        status: true,
      });
    });
  };

  componentDidMount() {
    this.getPersonajesSerie();
  }

  render() {
    return (
      <div>
        <NavLink
          to={"/detalles/" + this.props.idSerie}
          className="btn btn-info"
        >
          {" "}
          Volver a la serie
        </NavLink>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Personaje</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {this.state.status == true &&
              this.state.personajes.map((personaje, index) => {
                return (
                  <tr key={index}>
                    <td>{personaje.nombre}</td>
                    <td>
                      <img
                        style={{ width: "200px", height: "200px" }}
                        src={personaje.imagen}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}
