import "./App.css";
import LoginPage from "./component/LoginPage";
import Navbar from "./component/Navbar";
import UseMyStore from "./store/UseMyStore";


function App() {
const Token = UseMyStore()
  return (
    <>
      {Token.user ? <Navbar /> : <LoginPage />}
    </>
  );
}

export default App;
