import React, { Component } from 'react';
import { faMap, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LanguageSelector from './../LanguageSelector';
class MainMenuPanel extends Component {
    
    closeNav() {
        const mySidenav = document.getElementById("mySidenav");
        const sideMenuPosition = document.getElementById("sideMenuPosition");
        if (mySidenav !== null && sideMenuPosition != null) {
            mySidenav.style.width = "0";
            sideMenuPosition.style.width = "0";
            mySidenav.style.overflowY = "hidden";
        }
    }
    
    render() {
        return <>
            <div id="mySidenav" className="sidenav" style={{width: "0"}} >
                <div id="sideMenuPosition" className="side-menu-position" style={{width: "0"}}>
                    <div className="norgeskart-logo">
                        <div className="container">
                            <div className="row">
                                <div className="col-11">
                                    <h1>
                                        <a href=".">
                                            <span className="norgeskart-logo-image"></span>
                                            Norgeskart
                                        </a>
                                    </h1>
                                </div>
                                <div className="col-1">
                                    <button type="button" onClick={() => this.closeNav()}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="sidenav-group"></div>
                    <ul>
                        <li>
                            <div className="row">
                                <div className="col-1">
                                    <FontAwesomeIcon icon={faMap} />
                                </div>
                                <div className="col">
                                    <span className="text-uppercase"><span>BAKGRUNNSKART</span>:</span>
                                    <span>&nbsp;Gråtone</span>
                                    {/*<div className="bi bi-chevron-right">
                                        <span className='bi-chevron-right'></span>
                                    </div>*/}
                                </div>
                                <div className="col-1">
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="sidenav-group"></div>
                    <LanguageSelector />
                    {/*<div ng-switch="mainMenuPanelLayout">
                        <div ng-switch-when="mainMenuSections" main-menu-sections></div>
                        <div ng-switch-when="mainMenuBaseLayers" main-menu-base-layers></div>
                        <div ng-switch-when="mainMenuGroupLayers" main-menu-group-layers></div>
                        <div ng-switch-when="mainMenuFaq" main-menu-faq ng-controller="mainMenuFaqController" ng-init="initFaq()"></div>
                        <div ng-switch-when="mainMenuContact" main-menu-contact></div>
                        <div ng-switch-when="mainMenuPrivacy" main-menu-privacy></div>
                    </div>*/}
                </div>
            </div>
        </>
    }
}

export default MainMenuPanel;