import especialidadServicios from "../../servicios/especialidadServicios";
import Estados from "../../enums/Estados"
const TablaEspecialidades = () => {
  let listaEspecialidades;
  let estado;
  const cargarPagina = async ()=>{
    listaEspecialidades = await   especialidadServicios.obtenerEspecialidades();
    console.log(listaEspecialidades)
    if (listaEspecialidades.length === 0){
      estado = Estados.VACIO;
    }else{
      estado = Estados.OK;
    }
     
  }
  cargarPagina()
  return (
    <div className="container">
    <h3>Lista de especialidades
        <a href="/especialidadesForm" className="btn btn-sm btn-success"> Agregar Nuevo </a>
    </h3>
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
          {
            (estado === Estados.CARGANDO) ? 
            (<tr>
                <td align="center" colSpan="4">
                <div className="d-flex align-items-center">
                  <strong>Cargando...</strong>
                  <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                </div>
                </td>
              </tr>): 
            (estado === Estados.VACIO) ? 
              (<tr> 
                
                <td align="center" colSpan="4">
                  No hay datos 
                </td>
              
              </tr>) : 
              (
                listaEspecialidades.map((especialidad) => (
                  <tr>
                    <td>{especialidad.nombre}</td>
                    <td>{especialidad.descripcion}</td>
                    <td>{especialidad.atiende_solo_Mujeres ? "Sí" : "No"}</td>
                    <td>
                      <button className="btn btn-primary btn-sm me-2">Editar</button>
                      <button className="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                  </tr>
                ))
              )
          }
        </tbody>
      </table>
    </div>
  );
};
export default TablaEspecialidades;
