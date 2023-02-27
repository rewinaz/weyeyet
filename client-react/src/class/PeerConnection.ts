class PeerConnection {
  private email: string = "";
  private peerEmail: string | null = null;
  private direction: "both" | "receive" = "both";
  private peerRoom: string;
  private peer: RTCPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:global.stun.twilio.com:3478",
        ],
      },
    ],
  });
  private remoteStream: MediaStream = new MediaStream();

  constructor(
    roomId: string,
    email: string,
    direction: "both" | "receive" = "both"
  ) {
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
    if (direction === "receive") {
      this.peer.addTransceiver("video", { direction: "recvonly" });
    }
    this.direction = direction;
    this.email = email;
    this.peerRoom = roomId;
  }

  public getRoomId(): string {
    return this.peerRoom;
  }

  public getPeer(): RTCPeerConnection {
    return this.peer;
  }

  public getDirection(): "both" | "receive" {
    return this.direction;
  }

  public sendMediaStream(stream: MediaStream): void {
    if (this.direction === "both") {
      stream.getTracks().forEach((track) => {
        this.peer.addTrack(track, stream);
      });
    }
  }

  public async getOffer(): Promise<RTCSessionDescriptionInit> {
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(offer);
    return offer;
  }

  public setAnswer(answer: RTCSessionDescriptionInit): void {
    this.peer.setRemoteDescription(answer);
  }

  public recieveMediaStream(): void {
    this.peer.ontrack = (event) => {
      const stream = event.streams[0];
      this.remoteStream = stream;
    };
  }

  public getEmail(): string {
    return this.email;
  }

  public setPeerEmail(peerEmail: string): void {
    this.peerEmail = peerEmail;
  }

  public getPeerEmail(): string | null {
    return this.peerEmail;
  }

  public getRemoteStream(): MediaStream {
    return this.remoteStream;
  }
}

export default PeerConnection;
