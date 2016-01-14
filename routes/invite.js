var express = require('express');
var router = express.Router();
var InvitationController = require('../controllers/invitationController');
var invite = new InvitationController();

router.get('/invite', invite.invite);
router.post('/inviteReg', invite.inviteReg);
router.get('/inviteList', invite.inviteList);

module.exports = router;
