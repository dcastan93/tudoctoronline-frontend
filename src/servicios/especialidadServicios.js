const especialidades = [
  {
    nombre: "Otorrinonaringología",
    descripcion: "Se atiendes problemas de oido y laringe",
    atiende_solo_Mujeres: false
  },
  {
    nombre: "Ginecología",
    descripcion: "Se atiendes sistema reproductor femenino",
    atiende_solo_Mujeres: true 
  }
]
const especialidadServicios = {};

especialidadServicios.obtenerEspecialidades = () => {
    return especialidades;
}

export default especialidadServicios;