import { creerSection } from "../RenduPageType";

const section = creerSection("carriere");

export const generateStaticParams = section.generateStaticParams;
export const generateMetadata = section.generateMetadata;
export default section.Page;
