import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
function App() {
  const [user, setUser] = useState({});
  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "YOUR_CLIENT_ID",
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    )
    google.accounts.id.prompt();
  }, [])

  return (
    <div>
      <div id="signInDiv"></div>
      {
        Object.keys(user).length !== 0 &&
        <center>
          <div>
            <img src={user.picture} alt="profile pic" />
            <h1>{user.name}</h1>
            <button onClick={(e) => handleSignOut(e)} >SignOut</button>
          </div>
        </center>
      }
    </div>
  );
}

export default App;