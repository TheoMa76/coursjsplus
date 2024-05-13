import Table from "./components/Table";
import { PRODUCTS } from "./libs/Products";

function App() {
  console.log(PRODUCTS)
  return (
    <>
    <div className="App">
      <Table data={PRODUCTS}></Table>
    </div>
    </>
  );
}

export default App;
