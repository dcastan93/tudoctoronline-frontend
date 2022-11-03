import especialidadServicios from "../../servicios/especialidadServicios";
import { useState, useEffect } from "react";
import Estados from "../../enums/Estados";
const TablaEspecialidades = () => {
  const [listaEspecialidades, setListadoClientes] = useState([]);
  const [estado, setEstado] = useState(Estados.CARGANDO);
  const [criterio, setCriterio] = useState("");

  const cargarPagina = async () => {
    try {
      const respuesta = await especialidadServicios.obtenerEspecialidades();
      if (respuesta.data.length > 0) {
        setListadoClientes(respuesta.data);
        console.log("hay datos");
        setEstado(Estados.OK);
        console.log(listaEspecialidades);
      } else {
        console.log("entro pero no hay datos");
        setEstado(Estados.VACIO);
      }
    } catch {
      setEstado(Estados.ERROR);
    }
  };
  useEffect(()=>{
    cargarPagina();
  }, [])
  
  const cambiarCriterio = (event) => {
    setCriterio(event.target.value);
  };
  const buscarEspecialidad = async (event) =>{
    console.log("me llamaron")
    event.preventDefault();
    try {
      const respuesta = await especialidadServicios.buscarEspecialidadPorCriterio(criterio);
      if (respuesta.data.length > 0) {
        setListadoClientes(respuesta.data);
        console.log("hay datos");
        setEstado(Estados.OK);
        console.log(listaEspecialidades);
      } else {
        console.log("entro pero no hay datos");
        setEstado(Estados.VACIO);
      }
    } catch {
      setEstado(Estados.ERROR);
    }
    console.log(criterio)
  }
  return (
    <div className="container">
      <h3>
        Lista de especialidades
        <a href="/especialidadesForm" className="btn btn-sm btn-success">
          {" "}
          Agregar Nuevo{" "}
        </a>
      </h3>
      <form action="">
        <input
          type="text"
          onChange={cambiarCriterio}
          value={criterio}
          id="criterio"
          name="criterio"
          placeholder="Buscar por"
        />
        <button onClick={buscarEspecialidad} className="btn btn-sm btn-primary">Buscar</button>
      </form>
      <table className="table table-sm ">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Atiende solo a mujeres</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estado === Estados.CARGANDO ? (
            <tr>
              <td align="center" colSpan="4">
                <div className="d-flex align-items-center">
                  <strong>Cargando...</strong>
                  <div
                    className="spinner-border ms-auto"
                    role="status"
                    aria-hidden="true"
                  ></div>
                </div>
              </td>
            </tr>
          ) : estado === Estados.VACIO ? (
            <tr>
              <td align="center" colSpan="4">
                Error cargando datos, intente más tarde
              </td>
            </tr>
          ) : estado === Estados.VACIO ? (
            <tr>
              <td align="center" colSpan="4">
                No hay datos
              </td>
            </tr>
          ) : (
            listaEspecialidades.map((especialidad) => (
              <tr>
                <td>{especialidad.nombreEspecialidad}</td>
                <td>{especialidad.descripcion}</td>
                <td>{especialidad.atiende_solo_Mujeres ? "Sí" : "No"}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default TablaEspecialidades;
