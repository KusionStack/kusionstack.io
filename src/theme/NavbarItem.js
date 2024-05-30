import React from "react";
import OriginalNavBarItem from "@theme-original/NavbarItem";
import { useLocation } from "@docusaurus/router";

export default function NavbarItem(props) {
  const { docsPluginId, type } = props;
  const { pathname } = useLocation();

  if (
    type === "docsVersionDropdown" &&
    pathname.search(new RegExp(`^/${docsPluginId}/`, "g")) === -1 &&
    !pathname?.includes(docsPluginId)
  ) {
    return <></>;
  }

  if (type === "localeDropdown" && !pathname?.includes("karpor")) {
    return <></>;
  }

  return (
    <>
      <OriginalNavBarItem {...props} />
    </>
  );
}
