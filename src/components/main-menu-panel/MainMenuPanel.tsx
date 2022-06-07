import React, { useState } from 'react';
import { faMap, faChevronRight, faChevronLeft, faChevronUp, faChevronDown, faTree, faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LanguageSelector from './../LanguageSelector';
import MainMenuBaseLayerPanel from './MainMenuBaseLayerPanel';
import { useTranslation } from 'react-i18next';
import { useEventSelector, useAppSelector, useAppDispatch } from '../../../src/index';
import { selectVisibleBaseLayer } from '../../MapCore/Layers/layersSlice';
import { selectShowActiveProject, showActiveProjectFromList, selectActiveProject } from './projects-list/projectsListSlice';
import ProjectsList from './projects-list/ProjectsList';
import MainMenuPanelProjectLayers from './MainMenuPanelProjectLayers';

const MainMenuPanel = () => {
    const { t } = useTranslation();
    const appDispatch = useAppDispatch();
    const [showBaseLayersList, setShowBaseLayersList] = useState(false);
    const [collapseThematicMap, setCollapseThematicMap] = useState(false);
    const visibleBaseLayer = useEventSelector(selectVisibleBaseLayer);
    const showActiveProject = useAppSelector(selectShowActiveProject);
    const activeProject = useAppSelector(selectActiveProject);

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

    const toggleThematicMap = (): void => {
        setCollapseThematicMap(!collapseThematicMap);
    }

    const toggleShowActiveProject = (): void => {
        appDispatch(showActiveProjectFromList());
    }
    
    console.log('ICON: ', faTree);

    return (
        <div id="mySidenav" className="sidenav" style={{width: "0"}} >
            <div id="sideMenuPosition" className="side-menu-position" style={{width: "0"}}>
                <div className="norgeskart-logo ps-2 pt-0 pe-0 pb-0 m-0">
                    <div className="container p-0 mt-3">
                        <div className="d-flex flex-row align-items-center">
                            <div className="p-2">
                                <h1>
                                    <a href="." className='text-decoration-none'>
                                        <span className="norgeskart-logo-image me-3"></span>
                                        <span>Norgeskart</span>
                                    </a>
                                </h1>
                            </div>
                            <div className="ms-auto p-2">
                                <button type="button" className='btn btn-light bg-transparent border-0' onClick={() => closeNav()}>
                                    <span className='fs-4'>&times;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div> 
                <hr/>
                {!showActiveProject ?
                <div className="container">
                    <div className="d-flex" style={{ marginBottom: "12px" }} onClick={() => toggleBaseLayerPanel()}>
                        <div className='ps-2 pe-2'>
                            <FontAwesomeIcon icon={faMap} />
                        </div>
                        <div className='ps-2 pe-2'>
                            <span className="text-uppercase"><span>{t('bakgrunnskart')}</span>:</span>
                            <span>&nbsp;{t(visibleBaseLayer?.name || '')}</span>
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
                :
                <div className="container">
                        <div className="d-flex" style={{ marginBottom: "12px" }} onClick={() => toggleShowActiveProject()}>
                        <div className='ps-2 pe-2'>
                            <FontAwesomeIcon icon={faTree} />
                        </div>
                        <div className='ps-2 pe-2'>
                                <span className='text-capitalize'>{t(activeProject.ProjectName)}</span>
                        </div>
                        <div className='ms-auto ps-2 pe-2'>                            
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </div>
                    </div>
                </div>
                }
                <hr/>
                {showBaseLayersList ? <MainMenuBaseLayerPanel /> : null }
                {showActiveProject ? <MainMenuPanelProjectLayers /> : null}
                {!showBaseLayersList && !showActiveProject ?
                <div>
                    <div className='container'>
                            <div className='d-flex' style={{ marginBottom: "12px" }} onClick={() => toggleThematicMap()}>
                            <div className='ps-2 pe-2'><FontAwesomeIcon icon={faMap} /></div>
                            <div className='ps-2 pe-2'>
                                <span className="text-uppercase">{t('temakart')}</span>
                            </div>
                            <div className="ms-auto ps-2 pe-2">
                                {!collapseThematicMap ?
                                    <FontAwesomeIcon icon={faChevronUp} />
                                    :
                                    <FontAwesomeIcon icon={faChevronDown} />
                                }
                            </div>
                        </div>
                        {!collapseThematicMap ? 
                        <div>
                            <ProjectsList />
                        </div> : null}
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