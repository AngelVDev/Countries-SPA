import React from "react";

const Card = ({name, flags, }) => {
    return (
        <div>
            <h2>{name}</h2>
            <img src="{flags}" alt="Dis a broken.flag" width='2rem' height='2rem'/>
        </div>
    )
}
export default Card