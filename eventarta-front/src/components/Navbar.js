import Logo from '../images/logo.png'
export default function Navbar({SignedUser}){

    const signOutUser = async () => {
        localStorage.removeItem('token');
      };
    return <div>
        <header className="navbar">
            <a href='/'><img src={Logo} className="logo"></img></a>
            <div>
            {!SignedUser && <a href='/signUp' className='nav-link'>Sign Up</a>}
            {!SignedUser &&<a href='/signIn' className='nav-link'>Sign In</a>}
            {SignedUser &&<a href='/' className='nav-link' onClick={signOutUser}>Sign Out</a>}
            </div>
        </header>
    </div>
}