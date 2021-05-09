import { ICommand } from "../../model/iCommand";

export class StopServer implements ICommand {
  execute() {
    console.log("StopServer --- CALLED");
  }
}
