import "./Login.scss";
import Logo from "../../assets/images/spotify-logo.png";

function Login({ loginEndpoint }) {
  return (
    <div className="login">
      <img src={Logo} alt="spotify logo" className="login__logo" />
      <a href={loginEndpoint}>
        <button className="login__button">LOG IN</button>
      </a>
    </div>
  );
}

export default Login;
