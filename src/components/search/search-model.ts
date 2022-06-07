export type RepresentasjonsPunkt = {
  koordsys: number;
  nord: number;
  øst: number;
};

type Fylke = { fylkesnavn: string; fylkesnummer: string };
type Kommune = { kommunenummer: string; kommunenavn: string };

export interface StedsNavn {
  skrivemåte: string;
  skrivemåtestatus: string;
  navnestatus: string;
  språk: string;
  navneobjekttype: string;
  stedsnummer: number;
  stedstatus: string;
  representasjonspunkt: RepresentasjonsPunkt;
  fylker: Fylke;
  kommuner: Kommune[];
}

export interface Metadata {
  treffPerSide: number;
  side: number;
  totaltAntallTreff: number;
  viserFra: number;
  viserTil: number;
  sokeStreng: string;
}

export interface IGeoNorge {
  metadata?: Metadata;
  navn?: StedsNavn[];
};