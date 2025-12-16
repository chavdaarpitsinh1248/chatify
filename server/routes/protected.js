const express = reqiure("express");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", auth, (req, res) => {
    res.json({
        message: "Protected route success",
        user: req.user,
    });
});

module.exports = router;