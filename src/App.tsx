import "./App.css";
import LoginPage from "./component/LoginPage";
import Navbar from "./component/Navbar";
import UseMyStore from "./store/UseMyStore";

function App() {
  const Token = UseMyStore();
  return <div>{Token.user ? <Navbar /> : <LoginPage />}</div>;

  // const [counter, setCounter] = useState(1);
  // const [str, setStr] = useState(10);

  // const hisobla = useMemo(() => {
  //   let sum = counter;
  //   for (let i = 0; i < 300_000_000; i++) {
  //     sum = (i * i) / i + counter;
  //   }

  //   return sum;
  // }, [counter]);

  // return (
  //   <div>
  //     Asosiy sum:{hisobla}
  //     <Button
  //       onClick={() => {
  //         setCounter(counter + 1);
  //       }}
  //     >
  //       {counter}
  //     </Button>{" "}
  //     <Button
  //       onClick={() => {
  //         setStr(str + 1);
  //       }}
  //     >
  //       {str}
  //     </Button>
  //   </div>
  // );
}

export default App;
