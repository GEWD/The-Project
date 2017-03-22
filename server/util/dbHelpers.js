const Member = require('../db/memberModel.js');

module.exports = {

  findOrCreateUser: (userInfo) => {
    Member
      .findOrCreate({where: userInfo})
      .spread(function(user, created) {
        console.log(user.get({
          plain: true
        }))
        console.log(created)
      })
  }
}
