import { ICommand } from "./iCommand";

export interface IServer {
  launchServer: ICommand;
  getServerStatus: ICommand;
  getServerExtendedStatus: ICommand;
  setServerOptions: ICommand;
  stopServer: ICommand;
}
