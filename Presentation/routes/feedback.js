require('dotenv').config();
const { Router } = require("express");
const fetch = require('node-fetch');
const EmailValidator = require("email-validator");
const ThanksView = require('../view-models/thanks');
const FeedbackView = require('../view-models/feedback');
const router = Router();
const Logger = require("../../Common/logger");

const logger = new Logger();
const thanksModel = new ThanksView();

router.post("/", async (req, res) => {
  
  // TODO: isolate validation logic

  const feedbackModel = new FeedbackView();
  feedbackModel.event_id = req.session.eventId;
  feedbackModel.name = req.body.name;
  feedbackModel.email = req.body.email;
  feedbackModel.comments = req.body.comments;

  const validationSummary = {};
  const requiredFieldMessage = "This field is required";
  validationSummary.name = feedbackModel.name ? null : requiredFieldMessage;
  validationSummary.email = feedbackModel.email ? null : requiredFieldMessage;
  validationSummary.comments = feedbackModel.comments ? null : requiredFieldMessage;
  
  if(feedbackModel.email && !EmailValidator.validate(feedbackModel.email)){
    validationSummary.email = "Invalid Email";
  }

  if(validationSummary.name 
    || validationSummary.email 
    || validationSummary.comments) {
    feedbackModel.validationSummary = validationSummary;
    return res.render('feedback', feedbackModel);
  }
  
  if(!!process.env.DEV_ENV){
    req.session.eventId = null;
    return res.render('thanks', thanksModel);
  }
  
  fetch("https://sentry.io/api/0/projects/avatar-box/avatarboxweb/user-feedback/",{
    method: "POST",
    headers: {
      "authorization": `DSN ${process.env.SENTRY_SOURCE}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(feedbackModel)
  }).then(async (_res) => {
    if (_res.ok) {
      req.session.eventId = null;
      res.render('thanks', thanksModel);
    } else {
      req.session.eventId = null;
      const message = await _res.text();
      logger.warn("no feedback submitted");
      logger.warn(`${message || _res.statusText}`);
      res.render('thanks', thanksModel);
    }
  });
})

module.exports = router;