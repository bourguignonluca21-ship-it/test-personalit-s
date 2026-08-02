import { creerSection } from "../RenduPageType";

const section = creerSection("habitudes-au-travail");

export const generateStaticParams = section.generateStaticParams;
export const generateMetadata = section.generateMetadata;
export default section.Page;
