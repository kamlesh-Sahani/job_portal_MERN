import React from "react";
import "./companyLogo.scss";
import amazon from '../../assets/amazon.webp';
import deloitte from '../../assets/deloitte.png';
import edge from '../../assets/edge.webp';
import facebook from '../../assets/facebook.png';
import google from '../../assets/google.webp';
import gpay from '../../assets/gpay.png';
import meta from '../../assets/meta.png';
import microsoft from '../../assets/microsoft.png';
import mintra from '../../assets/mintra.webp';
import paytm from '../../assets/paytm.webp';

const CompanyLogo = () => {
    const iconsArr = [
        { name: "Paytm", image: paytm },
        { name: "Mintra", image: mintra },
        { name: "Microsoft", image: microsoft },
        { name: "Meta", image: meta },
        { name: "Google Pay", image: gpay },
        { name: "Google", image: google },
        { name: "Facebook", image: facebook },
        { name: "Edge", image: edge },
        { name: "Deloitte", image: deloitte },
        { name: "Amazon", image: amazon }
    ];

    return (
        <div className="companyLogo">
            {iconsArr.map(({ name, image }) => (
                <div className="logo_icon" key={image}>
                    <span className="company_name">{name}</span>
                    <img src={image} alt={name} />
                    
                </div>
            ))}
        </div>
    );
};

export default CompanyLogo;
