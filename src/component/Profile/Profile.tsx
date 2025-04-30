import { useContext } from "react";
import { MyContext } from "./Context";
import { Button } from "antd";

function Profile() {
  const num = useContext(MyContext);
  return (
    <div>
      aaa:
    <Button >
        {num}
    </Button>
    </div>
  );
}

export default Profile;
