import "./Login.scss";
import logo from "../../assets/images/spotify-logo.png";

function Login({ loginEndpoint }) {
  return (
    <div className="login">
      <img src={logo} alt="spotify logo" className="login__logo" />
      <a href={loginEndpoint}>
        <button className="login__button">login</button>
      </a>
    </div>
  );
}

export default Login;
