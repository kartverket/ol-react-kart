import React, { Component } from 'react';
class ChangeBaseLayer extends Component {

    baseLayers = [
        {
            id: "land",
            title: "Land",
            symbol: "baseMap baseMap-land",
            isSelected: false
        },
        {
            id: "raster",
            title: "Raster",
            symbol: "baseMap baseMap-raster",
            isSelected: false
        },
        {
            id: "aerial",
            title: "Flybilder",
            symbol: "baseMap baseMap-aerial",
            isSelected: false
        },
        {
            id: "grey",
            title: "Graatone",
            symbol: "baseMap baseMap-grey",
            isSelected: false
        }
    ];

    toggleBaseLayer(index: number) {
        console.log("toggle base layer. index: " + index);
    }

    render() {

        return (
            <>
                <div className="changeBaseLayer baseMapPanel baseLayerPanel">
                    {this.baseLayers.map((baseLayer, index) => 
                        <button key={index} className="btn btn-default btn-toggle" onClick={() => this.toggleBaseLayer(index)}>
                            <div className={baseLayer.symbol} title={baseLayer.title}></div>
                        </button>
                    )}
                </div>
            </>
            
        );
    }
}

export default ChangeBaseLayer;