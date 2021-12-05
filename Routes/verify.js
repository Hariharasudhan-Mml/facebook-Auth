const app = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

app.get("/:token", (req, res) => {
  try {
    jwt.verify(req.params.token, process.env.KEY, async (err, decoded) => {
      if (err) {
        return res.render('message',{msg1:'err.messag/e'})
      } else {
        const email = decoded.id;
        const updated = await User.findOneAndUpdate(
          { email: email },
          { verified: true },
          { new: true }
        );
        return res.render('message',{msg1:'Account verified Successfully',msg2:'login to join with our family'});
      }
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = app;
