import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticationUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSenderComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagsControlle";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticationUserController = new AuthenticationUserController();
const createComplimentController = new CreateComplimentController();
const listUsersSendComplimentsController = new ListUserSenderComplimentsController();
const listUsersReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

//nomes dos recursos como plural
router.post("/login", authenticationUserController.handle);

router.post("/users", createUserController.handle);
router.get("/users", ensureAuthenticated, listUsersController.handle);

router.get("/users/compliments/send", ensureAuthenticated, listUsersSendComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuthenticated, listUsersReceiveComplimentsController.handle);

router.get("/tags", ensureAuthenticated, listTagsController.handle);
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);

router.post("/login", authenticationUserController.handle);
router.post("/compliment", ensureAuthenticated, createComplimentController.handle);

router.get("/users/compliments/send", ensureAuthenticated, listUsersSendComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuthenticated, listUsersReceiveComplimentsController.handle);

export { router };
