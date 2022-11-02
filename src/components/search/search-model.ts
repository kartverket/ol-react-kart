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

export interface IEiendom {
  meterFraPunkt: number; //Distanse i meter til punktet det ble søkt etter.
  kommunenummer: string; //Kommunenummer bestående av fire tegn med ledende 0 om nødvendig.
  gardsnummer: number; //Del av et matrikkelnummer
  bruksnummer: number; //Del av et matrikkelnummer
  festenummer: number; //Del av et matrikkelnummer
  seksjonsnummer: number; //Del av et matrikkelnummer
  matrikkelnummertekst: string; //Generert tekst ut fra hvilken matrikkelenhet teigen tilhører. Eventuelt flere matrikkelnummere skyldes manglende, uavklarte grenser eller uregistrert jordsameie.
  objekttype: string; //Stedfesting/geometri hentes fra to objekttyper, teig eller anleggsprojeksjonsflate. Den siste er «fotavtrykk» av volumer som fins over eller under teiger på terrenget
  hovedområde: boolean; //Angir om området er teigens eller anleggsprojeksjonens hovedteig/hovedflate.
  lokalid: number; //Lokal identifikator, tildelt av dataleverandør/dataforvalter (her matrikkelsystemet, Kartverket).
  oppdateringsdato: string; //dato for siste endring på data-objektet i matrikkelsystemet
  teigmedflerematrikkelenheter: boolean; //Teigen mangler indre avgrensing mellom de registrerte matrikkelnummerene
  uregistrertjordsameie: boolean; //De registrerte matrikkelnummerene har andel i teigen
  nøyaktighetsklasseteig: string; //Grov klassifisering(trafikklys) av stedfestingsnøyaktighet. (Grønt = ok, gult = sjekk!, rødt = store mangler)
}

export interface IGeoJsonCoordinates {
  type: string;
  coordinates: number[];
}
