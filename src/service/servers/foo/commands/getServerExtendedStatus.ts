import { ICommand } from "../../model/iCommand";

export class GetServerExtendedStatus implements ICommand {
  execute() {
    console.log("GetServerExtendedStatus --- CALLED");
  }
}
