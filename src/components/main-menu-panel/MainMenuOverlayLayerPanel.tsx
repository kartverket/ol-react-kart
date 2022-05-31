import React, { useState } from 'react';
import { faMap, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProjectsList from './projects-list/ProjectsList';
import { useTranslation } from 'react-i18next';

type MainMenuOverlayLayerPanelProps = {
    openOverlayLayergroup:(layergroupName: string) => void,
    layerGroupActive: string
};

 const MainMenuOverlayLayerPanel = (props : MainMenuOverlayLayerPanelProps) => {
    const { t } = useTranslation();

    const [showLayerGroups, setShowLayerGroups] = useState(true);
    const [layerGroupActive, setLayerGroupActive] = useState(props.layerGroupActive);

    const changeLayerGroupActive = (layerGroupName: string) : void => {
        setLayerGroupActive(layerGroupName);
        props.openOverlayLayergroup(layerGroupName);
    }

    return (
        <>
        <div className='container'>
            <div className='row' style={{marginBottom: "12px"}} onClick={() => setShowLayerGroups(!showLayerGroups)}>
                <div className='col-1'><FontAwesomeIcon icon={faMap} /></div>
                <div className='col'>
                    <span className="text-uppercase">{t('temakart')}
                        {layerGroupActive !== '' ?
                            <span>:&nbsp;{layerGroupActive}</span>
                        : null }
                    </span>
                </div>
                <div className="col-1">
                    {showLayerGroups ? 
                        <FontAwesomeIcon icon={faChevronUp}/>
                        : 
                        <FontAwesomeIcon icon={faChevronDown}/>
                    }
                </div>
            </div>
            {showLayerGroups ? <div className='mb-2'>
                    <ProjectsList />
            </div> : null }
        </div>
        </>
    )
}

export default MainMenuOverlayLayerPanel;