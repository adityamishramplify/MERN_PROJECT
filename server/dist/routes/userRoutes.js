"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const reusableFunctions_1 = require("../utils/reusableFunctions");
const router = express_1.default.Router();
router.get("/:id", (0, reusableFunctions_1.asyncHandler)(UserController_1.getUserById));
router.get("/create", (0, reusableFunctions_1.asyncHandler)(UserController_1.createUser));
exports.default = router;
