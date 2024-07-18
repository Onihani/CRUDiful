// react
import { FC, PropsWithChildren } from "react";
// next
import Link, { LinkProps } from "next/link";

// fonts
import { jost } from "@/common/fonts";

// helpers
import { classnames } from "@/common/helpers";

// types
type NavLinkProps = PropsWithChildren<LinkProps>;

const NavLink: FC<NavLinkProps> = ({ children, ...linkProps }) => {
  return (
    <Link
      {...linkProps}
      className={classnames("nav-link", jost.className)}
    >
      {children}
    </Link>
  );
};

export default NavLink;
