import React, { Component } from 'react';

type MainMenuBaseLayerPanelProps = {
    changeBaseLayer:(baseLayerName: string) => void
};

export default function MainMenuBaseLayerPanel(props : MainMenuBaseLayerPanelProps) {

    return (
        <>
        <div className='container'>
            <div className='row' style={{marginBottom: "12px"}} onClick={() => props.changeBaseLayer('Landkart')}>
                <div className='col-1'></div>
                <div className='col'>Landkart</div>
            </div>
            <div className='row' style={{marginBottom: "12px"}} onClick={() => props.changeBaseLayer('Flybilder')}>
                <div className='col-1'></div>
                <div className='col'>Flybilder</div>
            </div>
            <div className='row' style={{marginBottom: "12px"}} onClick={() => props.changeBaseLayer('Rasterkart')}>
                <div className='col-1'></div>
                <div className='col'>Rasterkart</div>
            </div>
            <div className='row' style={{marginBottom: "12px"}} onClick={() => props.changeBaseLayer('...')}>
                <div className='col-1'></div>
                <div className='col'>...</div>
            </div>
        </div>
        </>
    )
}
