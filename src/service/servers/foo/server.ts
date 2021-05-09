import { IServer } from "../model/IServer";
import { ICommand } from "../model/iCommand";
import {
  LaunchServer,
  GetServerStatus,
  GetServerExtendedStatus,
  SetServerOptions,
  StopServer,
} from "./commands";

export class Server implements IServer {
  launchServer: ICommand = new LaunchServer();
  getServerStatus: ICommand = new GetServerStatus();
  getServerExtendedStatus: ICommand = new GetServerExtendedStatus();
  setServerOptions: ICommand = new SetServerOptions();
  stopServer: ICommand = new StopServer();
}
