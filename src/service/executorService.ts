import { Executor } from "./executor/executor";

export const executeServersCommands = function (
  serverId,
  commandId,
  extra = {}
): Promise<any> {
  return (async () => {
    return Executor.executeServiceCommand(serverId, commandId);
  })();
};

export const getServers = function (): Promise<any> {
  return (async () => {
    return Executor.getServers();
  })();
};
