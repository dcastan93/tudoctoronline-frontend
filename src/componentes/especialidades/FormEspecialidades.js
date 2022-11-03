import { useState } from "react";
import especialidadServicios from "../../servicios/especialidadServicios";
import { useNavigate } from "react-router-dom";

const FormEspecialidades = () => {
  const navigateTo = useNavigate();

  const [nombreEspecialidad, setNombreEspecialidad] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [atiende_solo_Mujeres, setatiende_solo_Mujeres] = useState("");

  const cambiarNombreEspecialidad = (event) => {
    setNombreEspecialidad(event.target.value);
  };
  const cambiardescripcion = (event) => {
    setdescripcion(event.target.value);
  };
  const cambiarAtencion = (event) => {
    setatiende_solo_Mujeres(event.target.checked);
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
      const respuesta = await especialidadServicios.guardarEspecialidad(
        especialidadNueva
      );
      navigateTo("/especialidades");
    } catch (error) {
      console.log("Ocurrio un error");
    }
  };

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
              name="atiende_solo_Mujeres"
              id="Descripcion"
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
