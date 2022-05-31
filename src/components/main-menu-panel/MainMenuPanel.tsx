import React, { useState } from 'react';
import { faMap, faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LanguageSelector from './../LanguageSelector';
import MainMenuBaseLayerPanel from './MainMenuBaseLayerPanel';
import MainMenuOverlayLayerPanel from './MainMenuOverlayLayerPanel';
import { useTranslation } from 'react-i18next';
// import listProjects from '../../config/listprojects.json';
// import { IProject, addProject } from './projects-list/projectsListSlice';
// import { useAppDispatch } from '../../app/hooks';
import { useEventDispatch } from '../../../src/index';
import { setVisibleBaseLayer } from '../../MapCore/Layers/layersSlice';

const MainMenuPanel = () => {
    const { t } = useTranslation();
    const [mainMenuPanelActive, setMainMenuPanelActive] = useState(true);
    const [mainMenuBaseLayerPanelActive, setMainMenuBaseLayerPanelActive] = useState(false);
    const [mainMenuActiveBaseLayer, setMainMenuActiveBaseLayerState] = useState('Gråtone');
    const [mainMenuActiveOverlayLayergroup, setMainMenuActiveOverlayLayergroup] = useState("")
    // const dispatch = useAppDispatch();
    // const projectsList = listProjects as IProject[];
    // projectsList.forEach(p => {
    //     console.log('Project: ', p);
    //     dispatch(addProject(p));
    // })
    const dispatch = useEventDispatch();

    const closeNav = () : void => {
        const mySidenav = document.getElementById("mySidenav");
        const sideMenuPosition = document.getElementById("sideMenuPosition");
        if (mySidenav !== null && sideMenuPosition != null) {
            mySidenav.style.width = "0";
            sideMenuPosition.style.width = "0";
            mySidenav.style.overflowY = "hidden";
        }
    }

    const showMainMenuPanel = () : void => {
        setMainMenuPanelActive(true);
        setMainMenuBaseLayerPanelActive(false);
    }

    const showMainMenuBaseLayerPanel = () : void => {
        setMainMenuPanelActive(false);
        setMainMenuBaseLayerPanelActive(true);
    }
    const setMainMenuActiveBaseLayer = (value: string) : void => {
        setMainMenuActiveBaseLayerState(value);
        
        // TODO: Actually set the new base layer..
        console.log('CHANGE BASE LAYER TO:', value);
        dispatch(setVisibleBaseLayer(value));

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
                <div className="sidenav-group"></div>
                    <div className="container">
                        <div className="row" style={{marginBottom: "12px"}}>
                            <div className="col-1">
                                <FontAwesomeIcon icon={faMap} />
                            </div>
                            <div className="col">
                                <span className="text-uppercase"><span>{t('bakgrunnskart')}</span>:</span>
                                <span>&nbsp;{mainMenuActiveBaseLayer}</span>
                            </div>
                            <div className="col-1">
                                {mainMenuPanelActive ? 
                                    <FontAwesomeIcon icon={faChevronRight} onClick={() => showMainMenuBaseLayerPanel()}/>
                                    : 
                                    <FontAwesomeIcon icon={faChevronLeft} onClick={() => showMainMenuPanel()}/>
                                }
                            </div>
                        </div>
                    </div>
                <div className="sidenav-group"></div>
                {mainMenuBaseLayerPanelActive ? <MainMenuBaseLayerPanel changeBaseLayer = {setMainMenuActiveBaseLayer}/> : null }
                {mainMenuPanelActive ? <MainMenuOverlayLayerPanel openOverlayLayergroup = {setMainMenuActiveOverlayLayergroup} layerGroupActive={mainMenuActiveOverlayLayergroup}/> : null }
                {mainMenuPanelActive ? <LanguageSelector /> : null }
            </div>
        </div>
    )
}

export default MainMenuPanel;