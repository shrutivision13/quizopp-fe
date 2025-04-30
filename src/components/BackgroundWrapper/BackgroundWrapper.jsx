import React from 'react';

const BackgroundWrapper = ({ children }) => {
    return (
        <div className="h-full w-full dark __variable_8cc5aa font-sans">
            <div className="hide-scroll-bar">
                <div className="style_background__W3FcZ">
                    <div className="style_foreground__jJqg2 hide-scroll-bar" id="shell">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BackgroundWrapper;
