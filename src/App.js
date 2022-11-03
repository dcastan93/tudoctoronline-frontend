import Header from "./componentes/general/Header";
import Banner from "./componentes/general/Banner";
import TablaEspecialidades from "./componentes/especialidades/TablaEspecialidades";
import { BrowserRouter, Routes , Route} from "react-router-dom";
import FormEspecialidades from "./componentes/especialidades/FormEspecialidades";


const App = () =>{
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Banner />} exact></Route>
          <Route path="/especialidades" element={<TablaEspecialidades />} exact></Route>
          <Route path="/especialidades/form" element={<FormEspecialidades />} exact></Route>
          <Route path="/especialidades/form/:id" element={<FormEspecialidades />} exact></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
