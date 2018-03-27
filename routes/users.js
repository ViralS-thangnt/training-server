var express = require('express');
var router = express.Router();
var utils = require('../utils/common');

var RandomUser = require('randomuser')
  , r = new RandomUser();

var users = [];
r.getUsers({results: 1}, (data) => {
  users = data.map((item, index) => {
    return {
      ...item,
      id: {
        ...item.id,
        id: index,
      }
    }
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(
    {
      count: users.length,
      ...utils.responseWithSuccess(users),
    }
  );
});

/* GET users detail. */
router.get('/:id/show', function(req, res, next) {
  let id = req.params['id'];
  let foundUser = users.find((item) => {
    return (item.id.id == id);
  });

  if (!foundUser) {
    res.send(utils.responseWithSuccess({}, 200, 'User not found!'));
    next();
  }

  res.send(utils.responseWithSuccess(foundUser));

});


/* GET search email. */
// product_list= lodash.filter(product_list, function(o) { return o.name.indexOf(filterForm.keyword)!=-1; });
router.get('/search', function(req, res, next) {
  let keyword = req.query.q || '';
  console.log('keyword:-------> ', keyword);

  let foundItems = users.filter((user) => {
    return user.email.indexOf(keyword) != -1 ||
            user.name.first.indexOf(keyword) != -1 ||
            user.name.last.indexOf(keyword) != -1;
  });

  if (!foundItems) {
    res.send(utils.responseWithSuccess({}, 200, 'Not user founded !'));
    next();
  }

  res.send(
    utils.responseWithSuccess(foundItems)
  );

});


/* Delete user by id */
router.delete('/:id', function(req, res, next) {
  let id = req.params['id'];
  let foundUser = users.find((item) => {
    return (item.id.id == id);
  });

  if (!foundUser) {
    res.send(utils.responseWithSuccess({}, 200, 'User not found!'));
    next();
  }

  users = users.filter((item) => {
    return (item.id.id != id);
  });

  res.send(
    utils.responseWithSuccess(foundUser, 200, 'User delete success')
  );

});

/* Create users */
router.post('/create', function(req, res, next) {
  let initUser = {
      "gender": "male",
      "name": {
          "title": "mr",
          "first": "mathew",
          "last": "perkins"
      },
      "location": {
          "street": "4804 dogwood ave",
          "city": "busselton",
          "state": "victoria",
          "postcode": 3160
      },
      "email": "mathew.perkins@example.com",
      "login": {
          "username": "tinykoala374",
          "password": "list",
          "salt": "z2qCCUmB",
          "md5": "290b4c57f81010fc7c744669b1486be2",
          "sha1": "2503c386eab61f3e762a3d14fe85997f9b04c167",
          "sha256": "4df9a9becaaf2bbc931ccb052ee7783397c06d29c0d37e3ab4d204758d767778"
      },
      "dob": "1954-03-22 19:05:16",
      "registered": "2015-07-14 18:34:37",
      "phone": "04-7342-1951",
      "cell": "0490-286-784",
      "id": {
          "name": "TFN",
          "value": "140686199",
          "id": 5
      },
      "picture": {
          "large": "https://randomuser.me/api/portraits/men/66.jpg",
          "medium": "https://randomuser.me/api/portraits/med/men/66.jpg",
          "thumbnail": "https://randomuser.me/api/portraits/thumb/men/66.jpg"
      },
      "nat": "AU"
  };

  let {
    email,
    name,
  } = req.body;

  console.log('email: ', email);
  console.log('name: ', name);

  if (!email || !name) {
    res.send(
      utils.responseWithSuccess({}, 200, 'Missing params! Email and name is required.')
    );
    next();
  }

  let newUser = {
    ...initUser,
    email,
    name: {
      "title": "mr",
      "first": name,
      "last": name,
    },
    id: {
      ...initUser.id,
      id: users.length + 1,
    }
  }

  users.push(newUser);
  res.send(
    utils.responseWithSuccess(newUser, 200, 'Create user success')
  );

});


/* Update user by id */
router.put('/:id/edit', function(req, res, next) {
  let id = req.params['id'];
  let foundUser = users.find((item) => {
    return (item.id.id == id);
  });

  if (!foundUser) {
    res.send(utils.responseWithSuccess({}, 200, 'User not found!'));
    next();
  }

  let {
    email,
    name,
  } = req.body;
  console.log('email: ', email);
  console.log('name: ', name);

  if (!email || !name) {
    res.send(
      utils.responseWithSuccess({}, 200, 'Missing params! Email and name is required.')
    );
    next();
  }

  foundUser = {
    ...foundUser,
    email,
    name: {
      ...foundUser.name,
      first: name,
      last: name,
    }
  }

  // users = users.filter((item) => {
  //   return (item.id.id != id);
  // });

  res.send(
    utils.responseWithSuccess(foundUser, 200, 'Update success')
  );

});


module.exports = router;










































