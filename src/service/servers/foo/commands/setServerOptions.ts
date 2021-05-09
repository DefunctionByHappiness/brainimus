import { ICommand } from "../../model/iCommand";

export class SetServerOptions implements ICommand {
  execute() {
    console.log("SetServerOptions --- CALLED");
  }
}
