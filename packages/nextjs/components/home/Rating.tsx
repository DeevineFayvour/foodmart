import Image from "next/image";
import star_regular from "./assets/star-regular.svg";
import star_solid from "./assets/star-solid.svg";

interface RatingProps {
  value: any;
}

export const Rating = ({ value }: RatingProps) => {
  return (
    <div className="flex">
      <Image src={value >= 1 ? star_solid : star_regular} width={10} alt="Star" />
      <Image src={value >= 2 ? star_solid : star_regular} width={10} alt="Star" />
      <Image src={value >= 3 ? star_solid : star_regular} width={10} alt="Star" />
      <Image src={value >= 4 ? star_solid : star_regular} width={10} alt="Star" />
      <Image src={value >= 5 ? star_solid : star_regular} width={10} alt="Star" />
    </div>
  );
};
