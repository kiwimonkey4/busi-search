// https://stackoverflow.com/questions/44387318/linking-button-to-another-page/44391429
import React from "react";
import Iframe from 'react-iframe'

function Nextpage() {
    return (
        
        <div>
        <p>This is the second page.</p>
        <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2859.1143935763957!2d-76.50096218448353!3d44.22530317910589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cd2ab1205c26f7f%3A0xfac4875aaf27b9be!2sVictoria%20Hall!5e0!3m2!1sen!2sca!4v1632016502475!5m2!1sen!2sca" width="600" height="450"/>
        
        </div>
    );

}

export default Nextpage;