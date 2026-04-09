import { routes } from "@/lib/routes";
import Link from "next/link";
import Text from "./text";

const Logo = () => {
  return (
    <Link href={routes.home} className="tracking-tighter w-fit">
      <Text as="h1" variant="body-lg-bold">
        Mo
        <Text variant="body-lg-bold" className="text-yellow">
          vies
        </Text>
      </Text>
    </Link>
  );
};

export default Logo;
