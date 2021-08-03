import React from 'react';
import 'bootstrap-social';
import './style.css'
function Footer(props) {
    return(
        <div className="footer bg-dark">
            <div className="container">
                <div className="row justify-content-center">             
                    <div className="col-12 col-sm-6 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-microsoft" href="https://github.com/Hp-175" style={{backgroundColor:"black"}}><i className="fa fa-github"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center" style={{fontFamily:"URW Chancery L, cursive",fontSize:"20px",color:"white"}}>
                    Discover yourself in Infinity
                </div>
            </div>
        </div>
    );
}

export default Footer;