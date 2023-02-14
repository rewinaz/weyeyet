import SideBarMenu from "@/components/room/sidebarMenu/SideBarMenu";
import { PropsWithChildren } from "react";

type Props = {};

const layout = ({ children }: Props & PropsWithChildren) => {
  return (
    <div className="flex h-screen bg-bc-darkblue text-white">
      <SideBarMenu />
      {children}
    </div>
  );
};

export default layout;
