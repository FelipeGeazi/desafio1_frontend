import Form from "./components/Form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Form />
      <ToastContainer />
    </div>
  );
}

export default App;
