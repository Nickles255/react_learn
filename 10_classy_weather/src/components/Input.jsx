import React from "react";

export default function Input({location, onChangeLocation}) {
    return (
            <input
                type="text"
                placeholder="Search from location..."
                value={location}
                onChange={onChangeLocation}
            />


    );


}