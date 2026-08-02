import { creerSection } from "../RenduPageType";

const section = creerSection("relations-amoureuses");

export const generateStaticParams = section.generateStaticParams;
export const generateMetadata = section.generateMetadata;
export default section.Page;
