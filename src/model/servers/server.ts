import { Command } from "../../model/servers/command";

export interface Server {
  serverId: string;
  commands: string[];
  status: "OK" | "STOPPED" | "ERROR";
}
