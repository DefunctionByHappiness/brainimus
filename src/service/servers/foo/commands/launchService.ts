import { ICommand } from "../../model/iCommand";

export class LaunchServer implements ICommand {
  execute() {
    console.log("LaunchServer --- CALLED");
  }
}
