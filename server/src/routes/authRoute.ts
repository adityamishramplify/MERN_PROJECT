import express from "express";
import passport from "passport";

const router = express.Router();
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000", // Optional failure redirect
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/products"); // Successful login redirect
  }
);

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
  } else {
    res.status(401).json({ message: "Unauthorized" }); // Unauthorized if user not authenticated
  }
});

export default router;
