const FormEspecialidades = () => {
    return(
        <div className="container">
            <h3>Nueva especialidad</h3>
            <form ation="">
                <div className="row">
                    <div className="col-6">
                        <input className="form-control form-control-sm" type="text" name="Especialidad" id="Especialidad" placeholder="Ingrese nombre" />
                    </div>
                    <div className="col-6">
                        <input className="form-control form-control-sm" type="text" name="Descripcion" id="Descripcion" placeholder="Ingrese descripcion" />
                    </div>
                </div>
                
            </form>
        </div>
    )
}
export default FormEspecialidades