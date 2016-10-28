var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:rhasite@rha-website-0.csse.rose-hulman.edu/rha'


router.get('/api/v1/proposals', (req, res, next) => {
  const results = [];

  pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    const query = client.query('SELECT proposal_name, event_date, event_signup_close, cost_to_attendee, image_path, description, attendees FROM proposals WHERE approved = true AND event_date > CURRENT_DATE ORDER BY proposal_id ASC;');
    
    query.on('row', (row) => {
    	results.push(row);
    });

    query.on('end', () => {
    	done();
    	return res.json(results);
    });
  });
});

router.post('/api/v1/proposal', (req, res, next) => {
  const results= [];

  const data = {name: req.body.name, cost_to_attendee: req.body.cost_to_attendee, event_date: req.body.event_date, event_signup_open: req.body.event_signup_open, event_signup_close: req.body.event_signup_close, image_path: req.body.image_path, description: req.body.description, proposer_id: req.body.proposer_id, week_proposed: req.body.week_proposed, quarter_proposed: req.body.quarter_proposed, money_requested: req.body.money_requested, approved: req.body.approved};

  pg.connect(connectionString, (err, client, done) => {

    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    client.query('INSERT INTO proposals(proposal_name, cost_to_attendee, event_date, event_signup_open, event_signup_close, image_path, description, proposer_id, week_proposed, quarter_proposed, money_requested, approved) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);',
      [data.name, data.cost_to_attendee, data.event_date, data.event_signup_open, data.event_signup_close, data.image_path, data.description, data.proposer_id, data.week_proposed, data.quarter_proposed, data.money_requested, data.approved]);
		
    const query = client.query('SELECT * FROM proposals ORDER BY proposal_id ASC');

    query.on('row', (row) => {
      results.push(row);
    });

    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});


