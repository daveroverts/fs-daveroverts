import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/layout";

export default function ExternalLink({ href, name = "" }) {
  return (
    <Link href={href} isExternal>
      {name ? name : href} <ExternalLinkIcon mx="2px" />
    </Link>
  );
}
