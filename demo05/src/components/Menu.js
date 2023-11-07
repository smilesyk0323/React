import { NavLink, useLocation } from "react-router-dom";


const Menu = props =>{
    const location = useLocation();
    // console.log(location.pathname);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary fixed-top" data-bs-theme="dark">
              <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">KH정보교육원</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                  <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                      <NavLink to="/" className="nav-link ">Home
                        <span className="visually-hidden">(current)</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className={`nav-link ${location.pathname === '/pocketmon '? 'active' : ''}`}  to="/pocketmon">포켓몬</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/book" className={`nav-link ${location.pathname === '/book '? 'active' : ''}`}>도서</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/book2" className={`nav-link ${location.pathname === '/book2 '? 'active' : ''}`}>도서(무한)</NavLink>
                    </li>
            
                  </ul>
                </div>
              </div>
            </nav>
        </>
    );


}
export default Menu;