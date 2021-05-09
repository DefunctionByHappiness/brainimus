import { ICommand } from "../../model/iCommand";

export class GetServerStatus implements ICommand {
  execute() {
    console.log("OK");
    return "OK";
  }
}
