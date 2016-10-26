CREATE DATABASE RHA;

CREATE TABLE Member (
	member_id		SERIAL PRIMARY KEY,
	username 		varchar(10),
	admin 			boolean,
	active 			boolean,
	trip_eligible 	boolean,
	meet_attend 	jsonb
);

CREATE TABLE Expenses (
	expenses_id SERIAL PRIMARY KEY,
	data 		jsonb
);

CREATE TABLE Funds (
	funds_id 	SERIAL PRIMARY KEY,
	fund_name 	varchar(50),
	data 		jsonb
);

CREATE TABLE Proposal (
	proposal_id 		SERIAL PRIMARY KEY,
	proposer_id 		INT REFERENCES Member(member_id), 
	expenses_id 		INT REFERENCES Expenses(expenses_id),
	proposal_name 		varchar(50),
	week_proposed 		INT,
	quarter_proposed 	INT,
	money_requested 	Money,
	approved 			boolean,
	money_allocated 	Money,
	signups_open 		boolean,
	paid 				boolean
);

CREATE TABLE Open_Event (
	event_id 			SERIAL PRIMARY KEY,
	admin_id 			INT REFERENCES Member(member_id),
	proposal_id 		INT REFERENCES Proposal(proposal_id),
	event_name 			varchar(50),
	event_description 	varchar(250),
	event_date 			DATE,
	event_signup_open 	DATE,
	event_signup_close 	DATE
);

-- CREATE TABLE Receipt (
-- 	data json NOT NULL
-- );