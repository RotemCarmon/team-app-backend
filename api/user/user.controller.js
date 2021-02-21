const userService = require('./user.service.js')

module.exports = {
  add
}


async function add(req, res, next) {
  try {
    const {user} = req.body;
    await userService.add(user);
    res.json(user)
  } catch(err) {
    next(err)
  }

}