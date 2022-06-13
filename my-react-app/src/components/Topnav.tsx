import './style.components/topnav.css'

export const Topnav = () => {
  return (
    <>
      <header id="header">
        <nav className="container">
          <img
            src="https://www.vaxxinova.com.br/wp-content/themes/vaxxinova/images/logo-vaxxinova.svg"
            alt="Logo Vaxxinova"
            className="logo"
          />
          <div className="menu"></div>
          <div className="toggle icon-menu"></div>
          <div className="toggle icon-close"></div>
        </nav>
      </header>
    </>
  )
}
