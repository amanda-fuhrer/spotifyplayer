import "./Header.scss";

function Header({ logout }) {
  return (
    <header className="header">
      <button onClick={logout} className="header__logout-button">
        logout
      </button>
    </header>
  );
}

export default Header;
