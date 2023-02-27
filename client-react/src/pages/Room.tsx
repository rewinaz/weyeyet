import SideBarMenu from "../components/room/sidebarMenu/SideBarMenu";
import PeerVideosWrapper from "../components/room/VideoComponents/PeerVideosWrapper";
import BottomBar from "../components/room/BottomBar/BottomBar";
type Props = {};

const Room = (props: Props) => {
  return (
    <div className="flex h-screen bg-bc-darkblue text-white">
      <SideBarMenu />
      <div className="flex-1 h-screen flex flex-col">
        {/* <div className="">Bar</div> */}
        <div className="w-full flex-1 overflow-y-scroll">
          <PeerVideosWrapper />
        </div>
        <BottomBar />
      </div>
    </div>
  );
};

export default Room;
