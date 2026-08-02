import { creerSection } from "../RenduPageType";

const section = creerSection("sous-stress");

export const generateStaticParams = section.generateStaticParams;
export const generateMetadata = section.generateMetadata;
export default section.Page;
