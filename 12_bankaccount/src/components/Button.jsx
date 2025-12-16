import React from 'react';

function Button({children, type, payload = "", dispatch, isDisabled}) {

    return (
        <p>
            <button
                onClick={() => dispatch({type, payload})}
                disabled={isDisabled}
            >
                {children}
            </button>

        </p>
    );
}

export default Button;