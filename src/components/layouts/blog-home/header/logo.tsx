// next
import Image from "next/image";

// static assets
import LogoImage from "public/images/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={LogoImage}
        alt="Investor Daily Dubai"
        width={76}
        height={74}
        className="object-contain"
      />
      <span className="sr-only">Investor Daily Dubai Logo</span>
    </div>
  );
};

export default Logo;
