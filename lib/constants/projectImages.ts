import bilorg from "../../public/bilorg.png";
import idp from "../../public/idp.png";
import jeojeo from "../../public/jeojeo.png";
import wholying from "../../public/wholying.png";
import fincher from "../../public/fincher.png";
import { StaticImageData } from "next/image";

export const PROJECT_IMAGES: StaticImageData[] = [
  bilorg,
  idp,
  jeojeo,
  wholying,
  fincher,
];

export const PROJECT_IMAGE_SRCS: string[] = PROJECT_IMAGES.map(
  (img) => img.src,
);
