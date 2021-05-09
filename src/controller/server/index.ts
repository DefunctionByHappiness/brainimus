import * as express from "express";
import { fromEventPattern } from "rxjs";
import {
  executeServersCommands,
  getServers,
} from "../../service/executorService";

import { requiresAuth } from "../../middlewares/authMiddleware";

const router = express.Router();

// GET /server getServers
router.get("/", requiresAuth, function (req, res, next) {
  return (async () => {
    const execution = await getServers();

    return res.status(200).send({ execution });
  })();
});

// POST /server/command executeServersCommands
router.post("/command", requiresAuth, function (req, res, next) {
  return (async () => {
    const { serverId, commandId, extra } = req.body;
    const execution = await executeServersCommands(serverId, commandId, extra);

    return res.status(200).send({ execution });
  })();
});

// TODO: DELETE THIS AFTER TESTING AND REPAIRING USER LOGIN
// GET /server getServers TESTING FEATURES
router.get("/no-auth", function (req, res, next) {
  return (async () => {
    const execution = await getServers();

    return res.status(200).send({ execution });
  })();
});

router.post("/command/no-auth", function (req, res, next) {
  return (async () => {
    const { serverId, commandId, extra } = req.body;
    const execution = await executeServersCommands(serverId, commandId, extra);

    return res.status(200).send({ execution });
  })();
});

export const server = router;
