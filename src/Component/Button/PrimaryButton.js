import React from 'react';

const PrimaryButton = ({ children, classes, handler }) => {
    return (
        <div>
            <button
                onClick={handler}
                className={`hover:text-gray-100 bg-gradient-to-r from-blue-600 to-sky-500 text-white ${classes}`}
            >
                {children}
            </button>
        </div>
    );
};

export default PrimaryButton;