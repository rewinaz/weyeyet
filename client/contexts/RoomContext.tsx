import { createContext, useState } from "react";

export type RoomContextType = {
  room: string;
  setRoom: (room: string) => void;
};

export const RoomContext = createContext<RoomContextType>({
  room: "",
  setRoom: () => {},
});

const RoomProvider = (props: {} & React.PropsWithChildren) => {
  const [room, setRoom] = useState<string>("");

  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {props.children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
