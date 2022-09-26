import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { ILayer } from '../../MapCore/Models/config-model';
import { useBaseLayersStore } from '../../app/baseStore';
import { useProjectStore } from '../../app/projetStore';
import Draw from '../Draw';
import ElevationProfile from '../ElevationProfile';
import Faq from '../Faq';
import Measure from '../Measure';
import PrintMap from '../Print.Map';
import ShareMap from '../ShareMap';
import Contact from './../Contact';
import LanguageSelector from './../LanguageSelector';
import MainMenuBaseLayerPanel from './MainMenuBaseLayerPanel';
import MainMenuPanelProjectLayers from './MainMenuPanelProjectLayers';
import ProjectsList from './projects-list/ProjectsList';

const MainMenuPanel = () => {
  const { t } = useTranslation();
  const [showBaseLayersList, setShowBaseLayersList] = useState(false);
  const [collapseThematicMap, setCollapseThematicMap] = useState(false);
  const [showTools, setShowTools] = useState(false);

  const showActiveProjectFromList = useProjectStore(state => state.showActiveProjectFromList);
  const showActiveProject = useProjectStore(state => state.showActiveProject);
  const activeProject = useProjectStore(state => state.activeProject);
  const visibleBaseLayer = useBaseLayersStore(state => state.layers.find((layer: ILayer) => layer.options.visibility));

  const closeNav = (): void => {
    const mySidenav = document.getElementById('mySidenav');
    const sideMenuPosition = document.getElementById('sideMenuPosition');
    if (mySidenav !== null && sideMenuPosition != null) {
      mySidenav.style.width = '0';
      sideMenuPosition.style.width = '0';
      mySidenav.style.overflowY = 'hidden';
    }
  };

  const toggleBaseLayerPanel = (): void => {
    setShowBaseLayersList(!showBaseLayersList);
  };

  const toggleThematicMap = (): void => {
    setCollapseThematicMap(!collapseThematicMap);
  };

  const toggleShowActiveProject = (): void => {
    showActiveProjectFromList();
  };

  return (
    <div id="mySidenav" className="sidenav">
      <div id="sideMenuPosition" className="side-menu-position list-group">
        <div className="list-group-item norgeskart-logo ps-2 pt-0 pe-0 pb-0 m-0">
          <div className="container p-0">
            <div className="d-flex flex-row align-items-center">
              <div className="p-2">
                <h1>
                  <a href="." className="text-decoration-none">
                    <span className="norgeskart-logo-image me-3"></span>
                    <span>Norgeskart</span>
                  </a>
                </h1>
              </div>
              <div className="ms-auto p-2">
                <button type="button" className="btn btn-light bg-transparent border-0" onClick={() => closeNav()}>
                  <span className="material-icons-outlined">close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {!showActiveProject ? (
          <div className="list-group-item list-group-item-action">
            <div className="d-flex expandBtn" onClick={() => toggleBaseLayerPanel()}>
              <div className="ps-2 pe-2">
                <span className="material-icons-outlined">map</span>
              </div>
              <div className="ps-2 pe-2">
                <span className="">
                  <span>{t('bakgrunnskart')}</span>:
                </span>
                <span>&nbsp;{t(visibleBaseLayer?.name || '')}</span>
              </div>
              <div className="ms-auto ps-2 pe-2">
                <span className="material-icons-outlined">
                  {!showBaseLayersList ? 'chevron_right' : 'chevron_left'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="list-group-item list-group-item-action">
            <div className="d-flex expandBtn" onClick={() => toggleShowActiveProject()}>
              <div className="ps-2 pe-2">
                <span className="material-icons-outlined">park</span>
              </div>
              <div className="ps-2 pe-2">
                <span className={` ${showActiveProject ? 'text-capitalize fw-semibold' : 'text-capitalize'} `}>
                  {t(activeProject.ProjectName)}
                </span>
              </div>
              <div className="ms-auto ps-2 pe-2">
                <span className="material-icons-outlined">chevron_left</span>
              </div>
            </div>
          </div>
        )}
        {showBaseLayersList ? <MainMenuBaseLayerPanel /> : null}
        {showActiveProject ? <MainMenuPanelProjectLayers ProjectName={activeProject.ProjectName} /> : null}
        {!showBaseLayersList && !showActiveProject ? (
          <>
            <div className="list-group-item list-group-item-action">
              <div className="d-flex expandBtn" onClick={() => toggleThematicMap()}>
                <div className="ps-2 pe-2">
                  <span className="material-icons-outlined">map</span>
                </div>
                <div className="ps-2 pe-2">
                  <span className="">{t('temakart')}</span>
                </div>
                <div className="ms-auto ps-2 pe-2">
                  <span className="material-icons-outlined">
                    {!collapseThematicMap ? 'expand_more' : 'chevron_right'}
                  </span>
                </div>
              </div>
              {!collapseThematicMap ? (
                <div>
                  <ProjectsList />
                </div>
              ) : null}
            </div>

            <div className="list-group-item list-group-item-action">
              <div className="d-flex expandBtn" onClick={() => setShowTools(!showTools)}>
                <div className="ps-2 pe-2">
                  <span className="material-icons-outlined">build</span>
                </div>
                <div className="ps-2 pe-2">
                  <span className="">{t('tools')}</span>
                </div>
                <div className="ms-auto ps-2 pe-2">
                  <span className="material-icons-outlined">{showTools ? 'expand_more' : 'chevron_right'}</span>
                </div>
              </div>
              {showTools ? (
                <div>
                  <Measure />
                  <Draw />
                  <ElevationProfile />
                  <PrintMap />
                  <ShareMap />
                </div>
              ) : null}
            </div>

            <div className="list-group-item list-group-item-action">
              <Faq />
            </div>
            <div className="list-group-item list-group-item-action">
              <Contact />
            </div>
            <div className="list-group-item list-group-item-action">
              <LanguageSelector />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default MainMenuPanel;
