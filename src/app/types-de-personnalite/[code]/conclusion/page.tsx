import { creerSection } from "../RenduPageType";

const section = creerSection("conclusion");

export const generateStaticParams = section.generateStaticParams;
export const generateMetadata = section.generateMetadata;
export default section.Page;
