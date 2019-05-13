const {
        pageSize,
        api: {messagesPoints: {messages, list, single, create}}
      }         = require('../../config/common_settings');
const express   = require('express');
const router    = express.Router();
const {Message} = require('../../models/message');

/* GET messages listing. */
router.get(`/${messages}/${list}/:page`, function (req, res, next) {
  const {params: {page}} = req;
  Message
    .getList(+page, +pageSize, (err, messege) => {
      if (err) res.sendStatus(500).send(err);
      res.json(messege);
    })
});

/* GET single message. */
router.get(`/${messages}/${single}/:id`, function (req, res, next) {
  const {params: {id}} = req;
  Message
    .getSingel(id, (err, messege) => {
      if (err) res.sendStatus(500).send(err);
      res.json(messege);
    });
});

/* POST creating a new message. */
router.post(`/${messages}/${create}`, function (req, res, next) {
  Message.create(req.body, (err, newMessage) => {
    if (err) res.sendStatus(500).send(err);
    res.json({message: newMessage});
  });
});

module.exports = router;
