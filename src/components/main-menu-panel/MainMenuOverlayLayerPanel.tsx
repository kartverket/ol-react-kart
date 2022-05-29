import React, { useState } from 'react';
import { faMap, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type MainMenuOverlayLayerPanelProps = {
    openOverlayLayergroup:(layergroupName: string) => void,
    layerGroupActive: string
};

 const MainMenuOverlayLayerPanel = (props : MainMenuOverlayLayerPanelProps) => {

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
                    <span>TEMAKART
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
            {showLayerGroups ? <div>
                <div className='row' style={{marginBottom: "12px"}} onClick={() => changeLayerGroupActive('Eiendom')}>
                    <div className='col-1'></div>
                    <div className='col'>Eiendom</div>
                </div>
                <div className='row' style={{marginBottom: "12px"}} onClick={() => changeLayerGroupActive('Friluftsliv')}>
                    <div className='col-1'></div>
                    <div className='col'>Friluftsliv</div>
                </div>
                <div className='row' style={{marginBottom: "12px"}} onClick={() => changeLayerGroupActive('Stedsnavn')}>
                    <div className='col-1'></div>
                    <div className='col'>Stedsnavn</div>
                </div>
                <div className='row' style={{marginBottom: "12px"}} onClick={() => changeLayerGroupActive('...')}>
                    <div className='col-1'></div>
                    <div className='col'>...</div>
                </div>
            </div> : null }
        </div>
        </>
    )
}

export default MainMenuOverlayLayerPanel;