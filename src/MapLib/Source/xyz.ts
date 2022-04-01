import * as olSource from "ol/source";


interface Props {
	url: string,
	attributions: string | Array<string>,
	maxZoom: number
}

function xyz({ url, attributions, maxZoom }: Props) {
	return new olSource.XYZ({ url, attributions, maxZoom });
}

export default xyz;
