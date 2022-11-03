import axios from "axios";

/*const especialidades = [
  {
    nombre: "Otorrinonaringología",
    descripcion: "Se atiendes problemas de oido y laringe",
    atiende_solo_Mujeres: false, 
  },
  {
    nombre: "Ginecología",
    descripcion: "Se atiendes sistema reproductor femenino",
    atiende_solo_Mujeres: true,
  },
];*/
const especialidadServicios = {};

especialidadServicios.obtenerEspecialidades =  () => {
  return  axios.get("http://localhost:3000/especialidades");
};
especialidadServicios.buscarEspecialidadPorCriterio =  (query) => {
  return  axios.get("http://localhost:3000/especialidades?nombreEspecialidad="+query);
};

export default especialidadServicios;
