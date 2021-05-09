import { Server as foo } from "./foo/server";
import { IServer } from "./model/IServer";

const servers = new Map<string, IServer>();
servers.set("foo", new foo());

export const serversMap = servers;
