"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
router.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "http://localhost:3000", // Optional failure redirect
}), (req, res) => {
    res.redirect("http://localhost:3000/products"); // Successful login redirect
});
// Logout route
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.redirect("http://localhost:3000"); // Redirect after successful logout
    });
});
// Check if user is authenticated
router.get("/current_user", (req, res) => {
    if (req.isAuthenticated()) {
        res.send(req.user); // Sends the user data if authenticated
    }
    else {
        res.status(401).json({ message: "Unauthorized" }); // Unauthorized if user not authenticated
    }
});
exports.default = router;
