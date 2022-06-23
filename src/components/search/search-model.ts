export type RepresentasjonsPunkt = {
  epsg: string;
  lon: number;
  lat: number;
};
export type RepresentasjonsPunktNorsk = {
  koordsys: string;
  øst: number;
  nord: number;
};

type Fylke = { fylkesnavn: string; fylkesnummer: string };
type Kommune = { kommunenummer: string; kommunenavn: string };

export interface StedsNavnSubset {
  navnestatus: string;
  skrivemåte: string;
  skrivemåtestatus: string;
  språk: string;
  stedsnavnnummer: number;
}
export interface StedsNavnPunkt {
  meterFraPunkt?: number;
  navneobjekttype?: string;
  representasjonspunkt: RepresentasjonsPunktNorsk;
  stedsnavn?: StedsNavnSubset[];
  stedsnummer?: number;
  stedstatus?: string;
}

export interface StedsNavn {
  skrivemåte: string;
  skrivemåtestatus: string;
  navnestatus: string;
  språk: string;
  navneobjekttype: string;
  stedsnummer: number;
  stedstatus: string;
  representasjonspunkt: RepresentasjonsPunktNorsk;
  fylker: Fylke;
  kommuner: Kommune[];
}
export interface Adresser {
  adressekode: number;
  adressenavn: string;
  adressetekst: string;
  adressetekstutenadressetilleggsnavn: string;
  adressetilleggsnavn: string;
  bokstav: string;
  bruksenhetsnummer: [];
  bruksnummer: number;
  festenummer: number;
  gardsnummer: number;
  kommunenavn: string;
  kommunenummer: string;
  nummer: number;
  objtype: string;
  oppdateringsdato: string;
  postnummer: string;
  poststed: string;
  representasjonspunkt: RepresentasjonsPunkt;
  stedfestingverifisert: boolean;
  undernummer: string;
}
export interface Metadata {
  treffPerSide: number;
  side: number;
  totaltAntallTreff: number;
  viserFra: number;
  viserTil: number;
  sokeStreng: string;
}
export interface ISsrPunkt {
  metadata?: Metadata;
  navn?: StedsNavnPunkt[];
}

export interface ISsr {
  metadata?: Metadata;
  navn?: StedsNavn[];
}

export interface IAdresser {
  metadata?: Metadata;
  adresser?: Adresser[];
}
export interface ITeigInfo {
  AREAL: number;
  AREALMERKNADSKODER: number;
  AVKLARTEIERE: boolean;
  BRUKSNR: number;
  EIENDOMSTYPE: string;
  FESTENR: number;
  FLATE: any;
  GARDSNR: number;
  HOVEDTEIG: boolean;
  KOMMUNENR: number;
  MATRIKKELNR: string;
  REPRESENTASJONSPUNKT: RepresentasjonsPunkt;
  SEKSJONSNR: number;
  TEIGID: number;
  TEIGMEDFLEREMATRIKKELENHETER: boolean;
  TVIST: boolean;
  UNDERSAMMENSLAINGBESTAR: boolean;
  UNDERSAMMENSLAINGUTGAR: boolean;
  UREGISTRERTJORDSAMEIE: boolean;
  boundedBy: any;
}
