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

    return new Promise((resolve, reject) =>{
      resolve(especialidades )
    }, 2000);
}

export default especialidadServicios;
