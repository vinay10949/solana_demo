import logo from '../logo.png'

const Navbar = ({ account }) => {
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={logo} className="App-logo" alt="logo" />
                DAPP University
            </a>

            {account && (
                <a
                    className="nav-link small mx-3"
                    href={`https://explorer.solana.com/address/${account.publicKey.toString()}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {account.publicKey.toString()}
                </a>
            )}
        </nav>
    );
}

export default Navbar;