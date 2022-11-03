import { useState, useEffect } from "react";
import especialidadServicios from "../../servicios/especialidadServicios";
import { useNavigate, useParams } from "react-router-dom";

const FormEspecialidades = () => {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [nombreEspecialidad, setNombreEspecialidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [atiende_solo_Mujeres, setAtiende_solo_Mujeres] = useState(false);
  const [titulo, setTitulo] = useState("");

  const cambiarNombreEspecialidad = (event) => {
    setNombreEspecialidad(event.target.value);
  };
  const cambiardescripcion = (event) => {
    setDescripcion(event.target.value);
  };
  const cambiarAtencion = (event) => {
    setAtiende_solo_Mujeres(event.target.checked);
  };
  const guardarEspecialidad = async (event) => {
    event.preventDefault();
    try {
      const especialidadNueva = {
        nombreEspecialidad: nombreEspecialidad,
        descripcion: descripcion,
        atiende_solo_Mujeres: atiende_solo_Mujeres,
      };
      console.log(especialidadNueva);
      if (id == null) {
        const respuesta = await especialidadServicios.guardarEspecialidad(especialidadNueva);
      } else {
        const respuesta = await especialidadServicios.modificarEspecialidad(
          id,
          especialidadNueva
        );
      }
      navigateTo("/especialidades");
    } catch (error) {
      console.log("Ocurrio un error");
    }
  };
  const cargarEspecialidad = async () => {
    try {
        const respuesta = await especialidadServicios.cargarEspecialidad(id);
        if (respuesta.status === 200) {
            setNombreEspecialidad(respuesta.data.nombre);
            setDescripcion(respuesta.data.descripcion);
            setAtiende_solo_Mujeres(respuesta.data.atiende_solo_mujeres);
        }
    } catch (error) {
        console.log("Ocurrió un error. "+error);
    }
}

useEffect(()=> {
    if (id != null) {
        setTitulo("Editar");
        cargarEspecialidad();
    }
    else {
        setTitulo("Nueva");
    }
}, [])

  return (
    <div className="container">
      <h3>Nueva especialidad</h3>
      <form ation="">
        <div className="row">
          <div className="col-3">
            <input
              className="form-control form-control-sm"
              onChange={cambiarNombreEspecialidad}
              value={nombreEspecialidad}
              type="text"
              name="nombreEspecialidad"
              id="Especialidad"
              placeholder="Ingrese nombre"
            />
          </div>
          <div className="col-6">
            <input
              className="form-control form-control-sm"
              onChange={cambiardescripcion}
              value={descripcion}
              type="text"
              name="Descripcion"
              id="Descripcion"
              placeholder="Ingrese descripcion"
            />
          </div>
          <div className="col-3 mt-1">
            <input
              className="form-check-input form-check-sm me-2"
              onChange={cambiarAtencion}
              checked={atiende_solo_Mujeres}
              type="checkbox"
              name="atiende_solo_mujeres"
              id="atiende_solo_mujeres"
            />
            <label htmlFor="atiende_solo_mujeres form-control-sm">
              Atiende solo mujeres
            </label>
          </div>
        </div>
        <div className="mt-3">
          <button
            className="btn btn-sm btn-primary me-2"
            onClick={guardarEspecialidad}
          >
            Guardar
          </button>
          <button className="btn btn-sm btn-light">Cancelar</button>
        </div>
      </form>
    </div>
  );
};
export default FormEspecialidades;
