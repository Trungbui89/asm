import React from 'react';

function Footer(props) {
    return(
    <div className="footer">
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4 col-lg-4">
                    <h5>OUR ADDRESS</h5>
                    <address>
		              121, Clear Water Bay Road<br />
		              Clear Water Bay, Kowloon<br />
		              HONG KONG<br />
                    </address>
                </div>
                <div className="col-12 col-md-4 col-lg-4">
                    <div className='mobile'>
                        <i className="fa fa-phone fa-lg"></i><p>+852 1234 5678</p>
                    </div>
                    <div className='phone'>
                        <i className="fa fa-fax fa-lg"></i><p>+852 8765 4321</p>
                    </div>
                    <div className='email'>
                        <i className="fa fa-envelope fa-lg"></i> 
                        <a href="mailto:confusion@food.net">confusion@food.net</a>
                    </div>
                </div>
                <div className="col-12 col-md-4 col-lg-4">
                    <div className="socical-icon">
                        <a className="google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                        <a className="facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                        <a className="linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                        <a className="twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                    </div>
                        <p className='copyright'>© Copyright 2018 Ristorante Con Fusion</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Footer;