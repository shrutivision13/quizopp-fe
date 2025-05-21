import React from "react";

const Header = () => {
    return (
        <header className="styles-module_header__lyJ-P _policiesSlug__custom_header__8G8du">
            <div className="styles-module_button_logo_container__bHUz4">
                <button className="styles-module_sidemenu_button__LwBxN">
                    <img
                        alt="menu-icon"
                        loading="lazy"
                        width="24"
                        height="24"
                        decoding="async"
                        src="/legal/menu.svg"
                        style={{ color: "transparent" }}
                    />
                </button>
                <img
                    alt="logo here"
                    data-testid="header-logo"
                    loading="lazy"
                    width="112"
                    height="30"
                    decoding="async"
                    className="styles-module_image__LQGaa"
                    src="/legal/logo.svg"
                    style={{ color: "transparent" }}
                />
            </div>
            <div className="_policiesSlug__header_children_container__rSSGf">
                <a
                    className="_policiesSlug__link_container__s8NNW"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://business.gamezop.com/"
                >
                    Business website
                    <img
                        alt="link-icon"
                        loading="lazy"
                        width="14"
                        height="14"
                        decoding="async"
                        src="/legal/link.svg"
                        style={{ color: "transparent" }}
                    />
                </a>
                <a
                    className="_policiesSlug__link_container__s8NNW"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.gamezop.com/"
                >
                    Gamezop
                    <img
                        alt="link-icon"
                        loading="lazy"
                        width="14"
                        height="14"
                        decoding="async"
                        src="/legal/link.svg"
                        style={{ color: "transparent" }}
                    />
                </a>
            </div>
        </header>
    );
};

export default Header;
