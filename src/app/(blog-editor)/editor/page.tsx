// components
import { Heading, HeroImage, SubHeading, Paragraph } from "./editor-area";

export default function BlogEditor() {
  return (
    <div className="max-w-4xl mx-auto py-20">
      <Heading />
      <HeroImage />
      <hr className="border-black/20 mb-8" />
      <SubHeading />
      <Paragraph />
    </div>
  );
}
