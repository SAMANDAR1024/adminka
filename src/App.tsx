
import LoginPage from "./component/LoginPage";
import Navbar from "./component/Navbar";
import UseMyStore from "./store/UseMyStore";

function App() {
  const Token = UseMyStore();
  return <div>{Token.user ? <Navbar /> : <LoginPage />}</div>;

  // const [str, setStr] = useState(10);

  // return (
  //   <MyContext.Provider value={1}>
  //     <div>
  //       Asosiy <Button onClick={() => setStr(str + 1)}>{str}</Button>
  //       <Profile/>
  //     </div>
  //   </MyContext.Provider>
  // );
}

export default App;
