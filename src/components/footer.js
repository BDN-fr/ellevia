import './footer.css'

export default function Footer() {
    return (
        <footer className="h-center full-center space-evenly">
            <div>
                <img src="/img/logo.png" className='logo'/>
            </div>
            <div className="full-center">
                <p>Website made by <a href="https://bdn-fr.xyz/">BDN_fr</a></p>
                <p>This website is open source, you can get the code <a href="https://github.com/BDN-fr/ellevia">here</a></p>
                <p>This website don't use cookies and don't have all the legal stuff</p>
            </div>
        </footer>
    )
}