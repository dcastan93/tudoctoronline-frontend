import especialidadServicios from "../../servicios/especialidadServicios";
import { useState, useEffect } from "react";
import Estados from "../../enums/Estados";
const TablaEspecialidades = () => {
  const [listaEspecialidades, setListadoClientes] = useState([]);
  const [estado, setEstado] = useState(Estados.CARGANDO);
  const [criterio, setCriterio] = useState("");
  const [idBorrar, setIdBorrar] = useState("");
  const [especialidadBorrar, setEspecialidadBorrar] = useState("");


  const cargarPagina = async () => {
    try {
      const respuesta = await especialidadServicios.obtenerEspecialidades();
      if (respuesta.data.length > 0) {
        setListadoClientes(respuesta.data);
        setEstado(Estados.OK);
      } else {
        console.log("entro pero no hay datos");
        setEstado(Estados.VACIO);
      }
    } catch {
      setEstado(Estados.ERROR);
    }
  };
  useEffect(() => {
    cargarPagina();
  }, []);

  const cambiarCriterio = (event) => {
    setCriterio(event.target.value);
  };
  const buscarEspecialidad = async (event) => {
    event.preventDefault();
    try {
      const respuesta =
        await especialidadServicios.buscarEspecialidadPorCriterio(criterio);
      if (respuesta.data.length > 0) {
        setListadoClientes(respuesta.data);
        console.log("hay datos");
        setEstado(Estados.OK);
      } else {
        console.log("entro pero no hay datos");
        setEstado(Estados.VACIO);
      }
    } catch {
      setEstado(Estados.ERROR);
    }
  
  };
  const confirmarBorrado = (id, nombreEspecialidad)=>{
    setEspecialidadBorrar(nombreEspecialidad);
    setIdBorrar(id)
  };
  const borrarEspecialidad = async() => {
    await especialidadServicios.borrarEspecialidad(idBorrar)
    cargarPagina()
  }
  return (
    <div className="container">
      <h3>
        Lista de especialidades
        <a href="/especialidades/form" className="btn btn-sm btn-success">
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
        <button onClick={buscarEspecialidad} className="btn btn-sm btn-primary">
          Buscar
        </button>
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
                  <a
                    href={"/especialidades/form/" + especialidad._id}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Editar
                  </a>
                  <button onClick={()=> confirmarBorrado(especialidad._id, especialidad.nombreEspecialidad)} className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalBorrar">Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="modalBorrar"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Alerta de eliminación
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Desea borrar esta especialidad {especialidadBorrar}?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                onClick={borrarEspecialidad}
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Borrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TablaEspecialidades;
