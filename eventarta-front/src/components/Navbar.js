import Logo from '../images/logo.png'
export default function Navbar(){
    return <div>
        <header className="navbar">
            <img src={Logo} className="logo"></img>
            <div>
            <a className='nav-link'>Sign Up</a>
            <a className='nav-link'>Sign In</a>
            </div>
        </header>
    </div>
}