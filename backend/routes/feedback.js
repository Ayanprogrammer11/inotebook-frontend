const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const {body, validationResult} = require("express-validator");
const Feedback = require("../models/Feedback");


router.post("/addfeedback", [
    body("email").isEmail(),
    body("title").isLength({min: 5}),
    body("message").isLength({min: 10})
], fetchuser, async (req, res) => {
let success = false;
    try {

        const errors = validationResult(req);
    if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
    }
       const {email, title, message} = req.body;
       const feedback = new Feedback({
        user: req.user.id,
          email,
          title,
          message
       });
       const savedFeedback = await feedback.save();
       success = true;
       res.json(success, savedFeedback);

    } catch (error) {
        console.error(error);
    }
})


module.exports = router;