import React, { useState } from 'react';
import { faMap, faChevronRight, faChevronLeft, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LanguageSelector from './../LanguageSelector';
import MainMenuBaseLayerPanel from './MainMenuBaseLayerPanel';
import { useTranslation } from 'react-i18next';
import { useEventSelector, useAppSelector } from '../../../src/index';
import { selectVisibleBaseLayer } from '../../MapCore/Layers/layersSlice';
import { selectShowActiveProject } from './projects-list/projectsListSlice';
import ProjectsList from './projects-list/ProjectsList';

const MainMenuPanel = () => {
    const { t } = useTranslation();
    const [showBaseLayersList, setShowBaseLayersList] = useState(false);
    const visibleBaseLayer = useEventSelector(selectVisibleBaseLayer);
    const showActiveProject = useAppSelector(selectShowActiveProject);

    const closeNav = () : void => {
        const mySidenav = document.getElementById("mySidenav");
        const sideMenuPosition = document.getElementById("sideMenuPosition");
        if (mySidenav !== null && sideMenuPosition != null) {
            mySidenav.style.width = "0";
            sideMenuPosition.style.width = "0";
            mySidenav.style.overflowY = "hidden";
        }
    }

    const toggleBaseLayerPanel = (): void => {
        setShowBaseLayersList(!showBaseLayersList);
    }
    
    return (
        <div id="mySidenav" className="sidenav" style={{width: "0"}} >
            <div id="sideMenuPosition" className="side-menu-position" style={{width: "0"}}>
                <div className="norgeskart-logo ps-2 pt-0 pe-0 pb-0 m-0">
                    <div className="container p-0">
                        <div className="d-flex flex-row align-items-center">
                            <div className="p-2">
                                <h1>
                                    <a href=".">
                                        <span className="norgeskart-logo-image me-3"></span>
                                        Norgeskart
                                    </a>
                                </h1>
                            </div>
                            <div className="ms-auto p-2">
                                <button type="button" className='btn btn-light' onClick={() => closeNav()}>
                                    <span className='fs-4'>&times;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div> 
                <hr/>
                <div className="container">
                    <div className="d-flex" style={{ marginBottom: "12px" }} onClick={() => toggleBaseLayerPanel()}>
                        <div className='ps-2 pe-2'>
                            <FontAwesomeIcon icon={faMap} />
                        </div>
                        <div className='ps-2 pe-2'>
                            <span className="text-uppercase"><span>{t('bakgrunnskart')}</span>:</span>
                            <span>&nbsp;{visibleBaseLayer?.name}</span>
                        </div>
                        <div className='ms-auto ps-2 pe-2'>
                            {!showBaseLayersList ? 
                                <FontAwesomeIcon icon={faChevronRight}/>
                                : 
                                <FontAwesomeIcon icon={faChevronLeft}/>
                            }
                        </div>
                    </div>
                </div>
                <hr/>
                {showBaseLayersList ? <MainMenuBaseLayerPanel /> : null }
                {!showBaseLayersList ?
                <div>
                    <div className='container'>
                        <div className='d-flex' style={{ marginBottom: "12px" }}>
                            <div className='ps-2 pe-2'><FontAwesomeIcon icon={faMap} /></div>
                            <div className='ps-2 pe-2'>
                                <span className="text-uppercase">{t('temakart')}</span>
                            </div>
                            <div className="ms-auto ps-2 pe-2">
                                {!showActiveProject ?
                                    <FontAwesomeIcon icon={faChevronUp} />
                                    :
                                    <FontAwesomeIcon icon={faChevronDown} />
                                }
                            </div>
                        </div>
                        <div>
                            <ProjectsList />
                        </div>
                    </div>
                    <div className='m-2 p-2'>
                        <LanguageSelector />
                    </div> 
                </div> : null}
            </div>
        </div>
    )
}

export default MainMenuPanel;