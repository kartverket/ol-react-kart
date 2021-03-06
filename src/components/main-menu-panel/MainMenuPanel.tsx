import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faMap,
  faTree,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector, useEventSelector } from '../../../src/index';
import { selectVisibleBaseLayer } from '../../MapCore/Layers/layersSlice';
import Contact from './../Contact';
import Policy from '../Policy';
import Faq from '../Faq';
import LanguageSelector from './../LanguageSelector';
import MainMenuBaseLayerPanel from './MainMenuBaseLayerPanel';
import MainMenuPanelProjectLayers from './MainMenuPanelProjectLayers';
import ProjectsList from './projects-list/ProjectsList';
import {
  selectActiveProject,
  selectShowActiveProject,
  showActiveProjectFromList,
} from './projects-list/projectsListSlice';

const MainMenuPanel = () => {
  const { t } = useTranslation();
  const appDispatch = useAppDispatch();
  const [showBaseLayersList, setShowBaseLayersList] = useState(false);
  const [collapseThematicMap, setCollapseThematicMap] = useState(false);
  const visibleBaseLayer = useEventSelector(selectVisibleBaseLayer);
  const showActiveProject = useAppSelector(selectShowActiveProject);
  const activeProject = useAppSelector(selectActiveProject);

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
    appDispatch(showActiveProjectFromList());
  };

  return (
    <div id="mySidenav" className="sidenav">
      <div id="sideMenuPosition" className="side-menu-position">
        <div className="norgeskart-logo ps-2 pt-0 pe-0 pb-0 m-0">
          <div className="container p-0 mt-3">
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
                  <span className="fs-4">&times;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {!showActiveProject ? (
          <div className="list-group-item list-group-item-action">
            <div className="d-flex" onClick={() => toggleBaseLayerPanel()}>
              <div className="ps-2 pe-2">
                <FontAwesomeIcon icon={faMap} />
              </div>
              <div className="ps-2 pe-2">
                <span className="">
                  <span>{t('bakgrunnskart')}</span>:
                </span>
                <span>&nbsp;{t(visibleBaseLayer?.name || '')}</span>
              </div>
              <div className="ms-auto ps-2 pe-2">
                {!showBaseLayersList ? (
                  <FontAwesomeIcon icon={faChevronRight} />
                ) : (
                  <FontAwesomeIcon icon={faChevronLeft} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="list-group-item list-group-item-action">
            <div className="d-flex" onClick={() => toggleShowActiveProject()}>
              <div className="ps-2 pe-2">
                <FontAwesomeIcon icon={faTree} />
              </div>
              <div className="ps-2 pe-2">
                <span className="text-capitalize">{t(activeProject.ProjectName)}</span>
              </div>
              <div className="ms-auto ps-2 pe-2">
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
            </div>
          </div>
        )}
        {showBaseLayersList ? <MainMenuBaseLayerPanel /> : null}
        {showActiveProject ? <MainMenuPanelProjectLayers /> : null}
        {!showBaseLayersList && !showActiveProject ? (
          <>
            <div className="list-group-item list-group-item-action">
              <div className="d-flex" onClick={() => toggleThematicMap()}>
                <div className="ps-2 pe-2">
                  <FontAwesomeIcon icon={faMap} />
                </div>
                <div className="ps-2 pe-2">
                  <span className="">{t('temakart')}</span>
                </div>
                <div className="ms-auto ps-2 pe-2">
                  {!collapseThematicMap ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  )}
                </div>
              </div>
              {!collapseThematicMap ? (
                <div>
                  <ProjectsList />
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
              <Policy />
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
