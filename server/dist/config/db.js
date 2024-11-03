"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoURI = process.env.MONGO_URI;
console.log("Mongo URI:", mongoURI);
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in the environment variables.");
        }
        yield mongoose_1.default.connect(mongoURI);
        console.log("Connected to MongoDB server");
        const dbName = "TechnostacksProject";
        const db = mongoose_1.default.connection.db;
        if (!db) {
            throw new Error("Failed to get database connection.");
        }
        const admin = db.admin();
        const databases = yield admin.listDatabases();
        const dbExists = databases.databases.some((db) => db.name === dbName);
        if (!dbExists) {
            yield db.createCollection("TechnostacksProject");
            console.log(`Database '${dbName}' created`);
        }
        else {
            console.log(`Database '${dbName}' already exists`);
        }
    }
    catch (error) {
        console.error("Database connection error:", error.message);
    }
});
exports.default = connectToDatabase;
