import "./Header.scss";

function Header({logout}) {
  return (
    <header className="header">
      <button onClick={logout} className="header__logout-button">Logout</button>
    </header>
  );
}

export default Header;
