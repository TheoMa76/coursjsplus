import Table from "./components/Table";
import Inputs from "./components/Inputs";

import { PRODUCTS } from "./libs/Products";
import Meteo from "./components/Meteo";

function App() {
  return (
    <>
    <div className="App">
      {/* <Table data={PRODUCTS}></Table> */}
      <Meteo></Meteo>
    </div>
    </>
  );
}

export default App;
