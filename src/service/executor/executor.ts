import { IServer } from "../servers/model/IServer";
import { serversMap } from "../servers";
import { Server } from "../../model/servers/server";

export class Executor {
  static serversMap: Map<string, IServer> = serversMap;

  static executeServiceCommand(serverId: string, commandId: string): any {
    return this.serversMap.get(serverId)[commandId].execute();
  }

  static getServers(): Server[] {
    const servers: Server[] = [];

    serversMap.forEach((value: IServer, key: string) => {
      servers.push({
        serverId: key,
        commands: Object.keys(value),
        status: value.getServerStatus.execute(),
      });
    });

    return servers;
  }
}
