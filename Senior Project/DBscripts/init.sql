CREATE DATABASE RHA;

CREATE TABLE Members (
        user_id SERIAL PRIMARY KEY,
        username varchar(20),
        firstname varchar(20),
        lastname varchar(20),
        hall varchar(20),
        image varchar(100),
        memberType varchar(30), -- replace admin with this
        active boolean,
        trip_eligible boolean,
        roomNumber INT,
        phoneNumber varchar(11),
        CMNumber INT,
        meet_attend jsonb
        -- meet_attend varchar(1000)
);

CREATE TABLE Expenses (
        expenses_id SERIAL PRIMARY KEY ,
        data jsonb
        -- data varchar(1000)
);

CREATE TABLE Funds (
        funds_id SERIAL PRIMARY KEY,
        fund_name varchar(50),
        funds_amount Money,
        display_on_site boolean
);

CREATE TABLE Proposals (
        proposal_id SERIAL PRIMARY KEY ,
        proposer_id INT references Members (user_id),
        expenses_id INT references Expenses (expenses_id),
        proposal_name varchar(50),
        week_proposed INT,
        quarter_proposed INT,
        money_requested Money,
        approved boolean,
        money_allocated Money,
        paid boolean,
        event_date DATE,
        event_signup_open DATE,
        event_signup_close DATE,
        cost_to_attendee MONEY,
        image_path varchar(100), 
        description varchar(400),
        attendees jsonb
);

CREATE TABLE Committee (
        committeeID SERIAL PRIMARY KEY,
        committeeName varchar(30),
        description varchar(1000),
        image varchar(100)
);

INSERT into Committee VALUES (DEFAULT, 'On-campus', 'The On-campus committee plans everything that RHA does on campus for the residents. We keep Chauncey''s stocked with the
                                        newest DVDs. We plan and run competitive tournaments like Smash Brothers, Texas Hold''em, Holiday Decorating, Res Hall
                                        Feud, and more. We also show movies outdoors on the big screen, and sponsor an Easter egg hunt in the spring. We also
                                        take your best ideas on how to improve the on campus living experience and make them a reality.', '../images/committees/onCampus.jpg');
INSERT into Committee VALUES (DEFAULT, 'Off-campus', 'The RHA Off Campus committee plans events that are held off of the Rose-Hulman campus. RHA will often pay for a portion
                                        of the ticket and organize transportation to make these events more affordable and accessible. Some events include trips
                                        to Six Flags, Turkey Run, Pacers Games, and highly anticipated movies. The Off Campus committee is also responsible
                                        for planning the annual Deming Park Cookout which provides free food to all on campus residents.', '../images/committees/offCampus.jpg');
INSERT into Committee VALUES (DEFAULT, 'Service', 'Volunteer? Do I have to build a house or help run an orphanage? No, volunteering is so much more than that. Everyday
                                        we volunteer our time by helping other people out. The service committee focuses on improving the Terre Haute community.
                                        Several events include helping underprivileged kids at Ryves Hall, hosting Blood Drives and fundraising for local charity
                                        organizations, as well as the quarterly Give Up A Meal (GUAM) program. Join the service committee to find out what service
                                        is really all about.', '../images/committees/service.jpg');
INSERT into Committee VALUES (DEFAULT, 'Publicity', 'Publicity committee is for those who want to help publicize all of the many R.H.A. events. Some of the responsibilities
                                        include making the iconic RHA light board being happily in full support of R.H.A. activities, but can vary week to week.
                                        Frequently, we combine with service to create "surblicity" to create one epic force of a committee. Come check it out!', '../images/committees/publicity.jpg');

CREATE TABLE FrontPageNews (
        newsID SERIAL PRIMARY KEY,
        title varchar(20),
        description varchar(500),
        datePosted DATE
);

INSERT INTO FrontPageNews VALUES (DEFAULT, ' What''s new? ','Residence Hall Association is an organization for students living on campus in a residence hall. If you live in a residence
                        hall, then you are already a member. All you have to do is come to a meeting and have fun sharing ideas! R.H.A has several
                        responsibilities and plans events for on campus residents.', null);

-- Most entries below this point are temporary. Once the database has been begun regular use, these inserts will become obselete
-- BSB 1
INSERT INTO Members VALUES (DEFAULT, 'duncanj', 'Jason', 'Duncan', 'BSB 1', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'wilkinsj', 'Joe', 'Wilkins', 'BSB 1', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'schradn', 'Nathan', 'Schrader', 'BSB 1', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'secrest', 'Taylor', 'Secrest', 'BSB 1', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'hubera', 'Alex', 'Huber', 'BSB 1', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'merleys', 'Shay', 'Merley', 'BSB 1', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'larueg', 'Gavin', 'La Rue', 'BSB 1', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'debrotm', 'Michael', 'DeBrota', 'BSB 1', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'siebenw', 'Wesley', 'Siebenthaler', 'BSB 1', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'senglik', 'Ka', 'Seng Lim', 'BSB 1', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'keltzb', 'Brandon', 'Keltz', 'BSB 1', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'georgen', 'Nihaal', 'George', 'BSB 1', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'dhruvah', 'Harsh', 'Dhruva', 'BSB 1', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'bensenk', 'Kyle', 'Bensen', 'BSB 1', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'donohoc', 'Caleb', 'Donoho', 'BSB 1', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'steward', 'Devon', 'Stewart', 'BSB 1', null, null, false, false, '{"Q1": [0, 0, 0], "Q2": [], "Q3": []}');

-- BSB 2
INSERT INTO Members VALUES (DEFAULT, 'gaidoa', 'Antonio', 'Gaido', 'BSB 2', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'haymanc', 'Chase', 'Hayman', 'BSB 2', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'hendera', 'Andrew', 'Henderson', 'BSB 2', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'lando', 'Owen', 'Land', 'BSB 2', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'wolhfab', 'Brandon', 'Wolhfarth', 'BSB 2', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'kniermj', 'Joseph', 'Knierman', 'BSB 2', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'rohokas', 'Shriraj', 'Rohokale', 'BSB 2', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'vincenr', 'Ryan', 'Vincencio', 'BSB 2', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'narayaa', 'Akarsh', 'Narayan', 'BSB 2', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'heitzd', 'Drake', 'Heitz', 'BSB 2', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'zhangz', 'Zhuoqun', 'Zhang', 'BSB 2', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'mccormt', 'Tyler', 'McCormick', 'BSB 2', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');

-- BSB 3
INSERT INTO Members VALUES (DEFAULT, 'kovacsa', 'Alexa', 'Kovacs', 'BSB 3', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'perezm', 'Marissa', 'Perez', 'BSB 3', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'dins', 'Sidrah', 'Din', 'BSB 3', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'chapmak', 'Katherine', 'Chapman', 'BSB 3', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'gutmanc', 'Christina', 'Gutman', 'BSB 3', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');

-- Speed 1
INSERT INTO Members VALUES (DEFAULT, 'paytonz', 'Zachary', 'Payton', 'Speed 1', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'washbuk', 'Kyle', 'Washburn', 'Speed 1', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'suppa', 'Austin', 'Supp', 'Speed 1', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'flammr', 'Ryan', 'Flamm', 'Speed 1', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'spenced', 'Dallas', 'Spencer', 'Speed 1', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'stichtj', 'Jared', 'Stichtenoth', 'Speed 1', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'footez', 'Zachary', 'Foote', 'Speed 1', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');

-- Speed 2
INSERT INTO Members VALUES (DEFAULT, 'mcmichj', 'John', 'McMichen', 'Speed 2', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'robertc', 'Coleman', 'Robertson', 'Speed 2', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'laui', 'Isaac', 'Lau', 'Speed 2', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'schwindn', 'Nathanael', 'Schwindt', 'Speed 2', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'tylerp', 'Philip', 'Tyler', 'Speed 2', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');

-- Speed 3
INSERT INTO Members VALUES (DEFAULT, 'saluccn', 'Noah', 'Salucci', 'Speed 3', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'mcinerh', 'Haulein', 'McInerney', 'Speed 3', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'barrert', 'Tanner', 'Barrera', 'Speed 3', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'kime', 'Eugene', 'Kim', 'Speed 3', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');

-- Deming 0
INSERT INTO Members VALUES (DEFAULT, 'paula', 'Alexander', 'Paul', 'Deming 0', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'taylorn', 'Nicholas', 'Taylor', 'Deming 0', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'bergc', 'Colin', 'Berg', 'Deming 0', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'palmutj', 'Joshua', 'Palamuttam', 'Deming 0',  null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'feeleyb', 'Brennan', 'Feeley', 'Deming 0',  null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'fletchj', 'James', 'Fletcher', 'Deming 0',  null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'yagerg', 'Guy', 'Yager', 'Deming 0',  null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'brazdap', 'Patrick', 'Braz da Silva', 'Deming 0',  null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'crutchj', 'John', 'Crutchfield', 'Deming 0',  null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'oberlir', 'Ryan', 'Oberlinter', 'Deming 0',  null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');

-- Deming 1
INSERT INTO Members VALUES (DEFAULT, 'blesicv', 'Victor', 'Blesic', 'Deming 1',  null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'prinsa', 'Aaron', 'Prins', 'Deming 1',  null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'walbrind', 'David', 'Walbring', 'Deming 1',  null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'cail', 'Lingzhe', 'Cai', 'Deming 1',  null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'batht', 'Tyler', 'Bath', 'Deming 1',  null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'webern', 'Nicholas', 'Weber', 'Deming 1',  null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'bikakiz', 'Zack', 'Bikakis', 'Deming 1',  null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'mckniga', 'Aidan', 'McKnight', 'Deming 1',  null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');

-- Deming 2
INSERT INTO Members VALUES (DEFAULT, 'waywooj', 'Joshua', 'Waywood', 'Deming 2',  null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'swansoz', 'Zachary', 'Swanson', 'Deming 2',  null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'yus', 'Shijun', 'Yu', 'Deming 2', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'thorntt', 'Tyler', 'Thornton', 'Deming 2', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'marvinj', 'Jason', 'Marvin', 'Deming 2', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');

-- Deming Attic
INSERT INTO Members VALUES (DEFAULT, 'childsc', 'Chaz', 'Childs', 'Deming Attic', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'beckmaj', 'Jacob', 'Beckmann', 'Deming Attic', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'baileyr', 'Ryan', 'Bailey', 'Deming Attic', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'mcpherc', 'Cameron', 'McPherson', 'Deming Attic', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'yangg', 'Guang', 'Yang', 'Deming Attic', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'baqerm', 'Mohammad', 'Baqer', 'Deming Attic', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'houy', 'Youheng', 'Hou', 'Deming Attic', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'bechtoc', 'Cole', 'Bechtold', 'Deming Attic', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');

-- Scharp
INSERT INTO Members VALUES (DEFAULT, 'workinj', 'Jacob', 'Working', 'Scharp', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'allansd', 'Daniel', 'Allanson', 'Scharp', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'lewerb', 'Benjamin', 'Lewer', 'Scharp', null, null, false, false, '{"Q1": [0, 1 ,1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'joness', 'Stephen', 'Jones', 'Scharp', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'mongovs', 'Sean', 'Mongoven', 'Scharp', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'hokee', 'Emily', 'Hoke', 'Scharp', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'oswoode', 'Emma', 'Oswood', 'Scharp', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'mckennk', 'Kelly', 'McKenna', 'Scharp', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'rusnake', 'Emily', 'Rusnak', 'Scharp', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'bockk', 'Kaelyn', 'Bock', 'Scharp', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'sparksb', 'Baylee', 'Sparks', 'Scharp', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'deckera', 'Amie', 'Decker', 'Scharp', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'nafiut', 'Toluwaniose', 'Nafiu', 'Scharp', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'meyerk', 'Katherine', 'Meyer', 'Scharp', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'rogersk', 'Kathryn', 'Rogers', 'Scharp', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'barteea', 'Arica', 'Bartee', 'Scharp', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'clarkb', 'Brittany', 'Clark', 'Scharp', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'kaitlyb', 'Bulley', 'Kaitlyn', 'Scharp', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'blessik', 'Kathryn', 'Blessinger', 'Scharp', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'allenn', 'Natalie', 'Allen', 'Scharp', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'grassj', 'Jamie', 'Grass', 'Scharp', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'hansenm', 'Morgan', 'Hansen', 'Scharp', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');

-- Mees
INSERT INTO Members VALUES (DEFAULT, 'shaferw', 'Wyatt', 'Shafer', 'Mees', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'meyerj', 'Jason', 'Meyer', 'Mees', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'braasck', 'Kyle', 'Braasch', 'Mees', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'kurapam', 'Manoj', 'Kurapati', 'Mees', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'johannc', 'Carlyn', 'Johannigman', 'Mees', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'heffrom', 'Mackenzie', 'Heffron', 'Mees', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'oakleyv', 'Veronica', 'Oakley', 'Mees', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'castonk', 'Kiana', 'Caston', 'Mees', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'wagnerm', 'Madeline', 'Wagner', 'Mees', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'patels', 'Shukun', 'Patel', 'Mees', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'bracej', 'Jayme', 'Brace', 'Mees', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'valtiew', 'Whitney', 'Valtierra', 'Mees', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'anetac', 'Ciepiela', 'Aneta', 'Mees', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'joshuaa', 'Arroyo', 'Joshua', 'Mees', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'dressej', 'Jennifer', 'Dressel', 'Mees', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');

-- Blum
INSERT INTO Members VALUES (DEFAULT, 'wolfeb', 'Bryan', 'Wolfe', 'Blum', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'mikhaid', 'Daniel', 'Mikhail', 'Blum', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'gonzali', 'Igor', 'Gonzalez', 'Blum', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'santanb', 'Brennan', 'Santaniello', 'Blum', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'busches', 'Scott', 'Busche', 'Blum', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'braaksa', 'Ashley', 'Braaksma', 'Blum', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'lir', 'Ronghan', 'Li', 'Blum', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'blacks', 'Sydney', 'Black', 'Blum', null, 'Publicity Chair', false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'wangj', 'Jiawen', 'Wang', 'Blum', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'rudiche', 'Erin', 'Rudich', 'Blum', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'storkl', 'Lauren', 'Stork', 'Blum', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'updikea', 'Alexis', 'Updike', 'Blum', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'hux', 'Xinyu', 'Hu', 'Blum', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'jennal', 'Lewis', 'Jenna', 'Blum', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'millere', 'Elizabeth', 'Miller', 'Blum', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'conoveh', 'Hannah', 'Conover', 'Blum', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'mccuais', 'Samantha', 'McCuaig', 'Blum', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');

-- Percopo 1
INSERT INTO Members VALUES (DEFAULT, 'adamst', 'Ty', 'Adams', 'Percopo 1', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'tuskac', 'Carley', 'Tuska', 'Percopo 1', null, 'Off-Campus Chair', false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'doyelb', 'Michael', 'Doyel', 'Percopo 1', null, 'Service Chair', false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'burkeb', 'Brian', 'Burke', 'Percopo 1', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'turskim', 'Michael', 'Turski', 'Percopo 1', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'jursc', 'Connor', 'Jurs', 'Percopo 1', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'marzari', 'Isabella', 'Marzari', 'Percopo 1', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');

-- Percopo 2
INSERT INTO Members VALUES (DEFAULT, 'majumda', 'Ari-Jit', 'Majumdar', 'Percopo 2', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'crewsm', 'Madeline', 'Crews', 'Percopo 2', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'hunleya', 'Allison', 'Hunley', 'Percopo 2', null, 'President', false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'sheffei', 'Ian', 'Sheffert', 'Percopo 2', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');

-- Percopo 3
INSERT INTO Members VALUES (DEFAULT, 'lindsej', 'Jacob', 'Lindsey', 'Percopo 3', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'guptan', 'Nathan', 'Gupta', 'Percopo 3', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');

-- Apartments E 1
INSERT INTO Members VALUES (DEFAULT, 'domkem', 'Michael', 'Domke', 'Apartments E 1', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'kuzal', 'Luke', 'Kuza', 'Apartments E 1', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'waskule', 'Elizabeth', 'Waskul', 'Apartments E 1', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');

-- Apartments E 2
INSERT INTO Members VALUES (DEFAULT, 'honioue', 'Eleanor', 'Honious', 'Apartments E 2', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'markisg', 'Gabrielle', 'Markison', 'Apartments E 2', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'brauna', 'Anna', 'Braun', 'Apartments E 2', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'hainesc', 'Charisse', 'Haines', 'Apartments E 2', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');

-- Apartments E 3
INSERT INTO Members VALUES (DEFAULT, 'lauriod', 'Daniel', 'Lauriola', 'Apartments E 3', null, 'On-campus Chair', false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'xuz', 'Zihang', 'Xu', 'Apartments E 3', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'pratta', 'Avery', 'Pratt', 'Apartments E 3', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'dudaj', 'Jason', 'Duda', 'Apartments E 3', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'davidj', 'Joshua', 'David', 'Apartments E 3', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'ryank', 'Katharine', 'Ryan', 'Apartments E 3', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');

-- Apartments W 1
INSERT INTO Members VALUES (DEFAULT, 'alangav', 'Vibha', 'Alangar', 'Apartments W 1', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'bushd', 'Dalton', 'Bush', 'Apartments W 1', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'stewartg', 'Grant', 'Stewart', 'Apartments W 1', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'declerm', 'Matthew', 'DeClerck', 'Apartments W 1', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');

-- Apartments W 2
INSERT INTO Members VALUES (DEFAULT, 'usherj', 'James', 'Usher', 'Apartments W 2', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'rodibabs', 'Brooks', 'Rodibaugh', 'Apartments W 2', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'miskowbs', 'Bartosz', 'Miskowiec', 'Apartments W 2', null, 'Vice President', false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');

-- Apartments W 3
INSERT INTO Members VALUES (DEFAULT, 'kraussa', 'Amanda', 'Krauss', 'Apartments W 3', null, 'NCC Chair', false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'lauert', 'Tressa', 'Lauer', 'Apartments W 3', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');

-- Lakeside 1
INSERT INTO Members VALUES (DEFAULT, 'adarvea', 'Allesandro', 'Adarve Cuellar', 'Lakeside 1', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'hullb', 'Brandon', 'Hull', 'Lakeside 1', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'johnsor', 'Russell', 'Johnson', 'Lakeside 1', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'stallas', 'Silven', 'Stallard', 'Lakeside 1', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');

-- Lakeside 2
INSERT INTO Members VALUES (DEFAULT, 'yatesa', 'Austin', 'Yates', 'Lakeside 2', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'wised', 'Douglas', 'Wise', 'Lakeside 2', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'mattoxn', 'Nicole', 'Mattox', 'Lakeside 2', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'kimmelb', 'Benjamin', 'Kimmel', 'Lakeside 2', null, 'Webmaster', false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');

-- Lakeside 3
INSERT INTO Members VALUES (DEFAULT, 'sahabuj', 'Jane', 'Sahabu', 'Lakeside 3', null, null, false, false, '{"Q1": [0, 1, 1], "Q2": [], "Q3": []}');

-- Lakeside 4
INSERT INTO Members VALUES (DEFAULT, 'baira', 'Alexander', 'Bair', 'Lakeside 4', null, null, false, false, '{"Q1": [0, 1, 0], "Q2": [], "Q3": []}');
INSERT INTO Members VALUES (DEFAULT, 'szatkos', 'Scott', 'Szatkowski', 'Lakeside 4', null, null, false, false, '{"Q1": [0, 0, 1], "Q2": [], "Q3": []}');

-- Skinner - None

-- Off-campus
INSERT INTO Members VALUES (DEFAULT, 'colotlk', 'Karina', 'Colotl', 'Off-campus', null, null, false, false, '{"Q1": [0, 0, 0, 1], "Q2": [], "Q3": []}');

--Use top format. date thing doesn't work apparently
INSERT INTO Expenses VALUES (DEFAULT, '{"Receiver": "Allison Hunley", "CM": 1079, "accountCode": 9610, "Description": "Exec Retreat", "AmountUsed": 80.77, "DateReceived": "2016-9-13", "DateProcessed": "", "Receipts": [{"Amount": 27.82, "InvoiceDate": "2016-8-13"}, {"Amount": 52.95, "InvoiceDate": "2016-8-13"}]}');
INSERT INTO Expenses VALUES (DEFAULT, '{"Receiver": "Amanda Krauss", "CM": 1126, "accountCode": 9610, "Description": "Pop Rocks for Recognition", "AmountUsed": 75.50, "DateReceived": "2016-9-27", "DateProcessed": "", "Receipts": [{"Amount": 75.50, "InvoiceDate":"2016-9-19"}]}');
INSERT INTO Expenses VALUES (DEFAULT, '{"Receiver": "Charles Childs", "CM": 2853, "accountCode": 9610, "Description": "Bonfire Guarding DemingSpeed", "AmountUsed": 329.96, "DateReceived": "2016-4-10", "DateProcessed": "", "Receipts": [{"Amount": 329.96, "InvoiceDate": "2016-9-27"}]}');
INSERT INTO Expenses VALUES (DEFAULT, '{"Receiver": "Daniel Lauriola", "CM": 1140, "accountCode": 9610, "Description": "Beach Volleyball Tourney", "AmountUsed": 300.00, "DateReceived": "2016-9-27", "DateProcessed": "", "Receipts": [{"Amount": 137.69, "InvoiceDate": "2016-9-24"}, {"Amount": 54.70, "InvoiceDate": "2016-9-25"}, {"Amount": 107.61, "InvoiceDate": "2016-9-24"}]}');
INSERT INTO Expenses VALUES (DEFAULT, '{"Receiver": "Daniel  Lauriola", "CM": 1140, "accountCode": 9610, "Description": "Movie on Speed Lawn", "AmountUsed": 1073.00, "DateReceived": "2016-9-27", "DateProcessed": "", "Receipts": [{"Amount": 1073.00, "InvoiceDate": "2016-8-16"}]}');
INSERT INTO Expenses VALUES (DEFAULT, '{"Receiver": "Daniel Mikhail", "CM": 431, "accountCode": 9610, "Description": "Bonfire Guarding BlumMees", "AmountUsed": 199.57, "DateReceived": "2016-10-4", "DateProcessed": "", "Receipts": [{"Amount": 152.27, "InvoiceDate": "2016-9-25"}, {"Amount": 47.30, "InvoiceDate": "2016-9-25"}]}');
INSERT INTO Expenses VALUES (DEFAULT, '{"Receiver": "Eric Liobis", "CM": 4006, "accountCode": 9610, "Description": "2016 Planners", "AmountUsed": 4936.25, "DateReceived": "2016-8-31", "DateProcessed": "", "Receipts": [{"Amount": 4936.25, "InvoiceDate": "2016-6-24"}]}');
INSERT INTO Expenses VALUES (DEFAULT, '{"Receiver": "Eric Liobis", "CM": 4006, "accountCode": 9610, "Description": "Grillin and Chillin Tickets", "AmountUsed": 451.00, "DateReceived": "2016-10-12", "DateProcessed": "", "Receipts": [{"Amount": 451.00, "InvoiceDate": "2016-10-5"}]}');
INSERT INTO Expenses VALUES (DEFAULT, '{"floor": "Percopo", "Receiver": "Jacob Lindsey", "CM": 395, "accountCode": 9610, "Description": "Hall Ed", "AmountUsed": 176.00, "DateReceived": "2016-9-27", "DateProcessed": "", "Receipts": [{"Amount": 176.00, "InvoiceDate": "2016-9-17"}]}');
INSERT INTO Expenses VALUES (DEFAULT, '{"Receiver": "Jacob Working", "CM": 1382, "accountCode": 9610, "Description": "Bonfire Guarding Scharp", "AmountUsed": 94.98, "DateReceived": "2016-10-12", "DateProcessed": "", "Receipts": [{"Amount": 94.98, "InvoiceDate": "2016-9-26"}]}');
INSERT INTO Expenses VALUES (DEFAULT, '{"Receiver": "Swank Motion Pictures, Inc.", "Address": "DBA Residence Life Cinema | 2844 Paysphere Circle | Chicago, IL 60674-0", "accountCode": 9610, "Description": "Rose-Hulman Movie Server", "AmountUsed": 9965.44, "DateReceived": "2016-9-13", "DateProcessed": "", "Receipts": [{"Amount": 9965.44, "InvoiceDate": "2016-9-6"}]}');
INSERT INTO Expenses VALUES (DEFAULT, '{"Receiver": "Sydney Black", "CM": 2229, "accountCode": 9610, "Description": "Exec Retreat Sydney", "AmountUsed": 17.89, "DateReceived": "2016-9-13", "DateProcessed": "", "Receipts": [{"Amount": 3.18, "InvoiceDate": "2016-8-22"}, {"Amount": 3.18, "InvoiceDate": "2016-8-24"}, {"Amount": 11.53, "InvoiceDate": "2016-8-13"}]}');
INSERT INTO Expenses VALUES (DEFAULT, '{"Receiver": "Turner Coaches, Inc.", "Address": "P.O. Box 2852 | Terre Haute, IN 47802-0852", "accountCode": 9610, "Description": "Turner Travel to Mason, OH", "AmountUsed": 3030.00, "DateReceived": "2016-9-26", "DateProcessed": "", "Receipts": [{"Amount": 3030.00, "InvoiceDate": "2016-10-1"}]}');

-- Current Funds Tab
INSERT INTO Funds VALUES (DEFAULT, 'Rollover', 31778.60, false);
INSERT INTO Funds VALUES (DEFAULT, 'Fall Income', 26160.00, false);
INSERT INTO Funds VALUES (DEFAULT, 'Winter Income', 24520.00, false);
INSERT INTO Funds VALUES (DEFAULT, 'Spring Income', 25000.00, false);
INSERT INTO Funds VALUES (DEFAULT, 'Additions', 0.00, false);
INSERT INTO Funds VALUES (DEFAULT, 'Total Money', 107458.60, false);
INSERT INTO Funds VALUES (DEFAULT, 'Total Floor Money', -19245.00, false);
INSERT INTO Funds VALUES (DEFAULT, 'Acquired Participation Floor Money', -1098.47, false);
INSERT INTO Funds VALUES (DEFAULT, 'Possible to be gotten Floor Money', -17538.75, false);
INSERT INTO Funds VALUES (DEFAULT, 'Missed Floor Money', -607.78, false);
INSERT INTO Funds VALUES (DEFAULT, 'Awarded Floor Money', 0.00, false);
INSERT INTO Funds VALUES (DEFAULT, 'Total Without Floor Money', 88213.60, false);
INSERT INTO Funds VALUES (DEFAULT, 'iMoney Proposals', -48793.00, false);
INSERT INTO Funds VALUES (DEFAULT, 'Amount Budgeted', -6325.03, false);
INSERT INTO Funds VALUES (DEFAULT, 'Cleared Deductions', 0.00, false);
INSERT INTO Funds VALUES (DEFAULT, 'Deductions', -10263.79, false);
INSERT INTO Funds VALUES (DEFAULT, 'General Funds', 23439.56, false);
INSERT INTO Funds VALUES (DEFAULT, 'Total iMoney', 48793.00, false);
INSERT INTO Funds VALUES (DEFAULT, 'Floor Money', 17538.75, false);
INSERT INTO Funds VALUES (DEFAULT, 'Total Budget', 89771.31, false);


-- Floor Money tab
INSERT INTO Funds VALUES (DEFAULT, 'BSB 0-1', 41.34, true);
INSERT INTO Funds VALUES (DEFAULT, 'BSB 2', 43.17, true);
INSERT INTO Funds VALUES (DEFAULT, 'BSB 3', 41.34, true);
INSERT INTO Funds VALUES (DEFAULT, 'Speed 1', 30.31, true);
INSERT INTO Funds VALUES (DEFAULT, 'Speed 2', 43.17, true);
INSERT INTO Funds VALUES (DEFAULT, 'Speed 3', 43.17, true);
INSERT INTO Funds VALUES (DEFAULT, 'Demind 0', 27.56, true);
INSERT INTO Funds VALUES (DEFAULT, 'Deming 1', 20.21, true);
INSERT INTO Funds VALUES (DEFAULT, 'Deming 2', 38.58, true);
INSERT INTO Funds VALUES (DEFAULT, 'Deming Attic', 26.64, true);
INSERT INTO Funds VALUES (DEFAULT, 'Blum', 62.46, true);
INSERT INTO Funds VALUES (DEFAULT, 'Mees', 68.89, true);
INSERT INTO Funds VALUES (DEFAULT, 'Scharp', 64.30, true);
INSERT INTO Funds VALUES (DEFAULT, 'Percopo 0-1', 76.24, true);
INSERT INTO Funds VALUES (DEFAULT, 'Percopo 2', 60.62, true);
INSERT INTO Funds VALUES (DEFAULT, 'Percopo 3', 46.14, true);
INSERT INTO Funds VALUES (DEFAULT, 'Apartments E 1', 32.15, true);
INSERT INTO Funds VALUES (DEFAULT, 'Apartments E 2', 35.82, true);
INSERT INTO Funds VALUES (DEFAULT, 'Apartments E 3', 37.66, true);
INSERT INTO Funds VALUES (DEFAULT, 'Apartments W 1', 26.57, true);
INSERT INTO Funds VALUES (DEFAULT, 'Apartments W 2', 35.82, true);
INSERT INTO Funds VALUES (DEFAULT, 'Apartments W 3', 34.91, true);
INSERT INTO Funds VALUES (DEFAULT, 'Lakeside 1', 41.25, true);
INSERT INTO Funds VALUES (DEFAULT, 'Lakeside 2', 53.28, true);
INSERT INTO Funds VALUES (DEFAULT, 'Lakeside 3', 33.17, true);
INSERT INTO Funds VALUES (DEFAULT, 'Lakeside 4', 33.72, true);

-- If both week and qtr proposed are -1, the event was last year 
-- proposal_id SERIAL PRIMARY KEY ,
--        proposer_id INT references Members (user_id),
--        expenses_id INT references Expenses (expenses_id),
--        proposal_name varchar(50),
--        week_proposed INT,
--        quarter_proposed INT,
--        money_requested Money,
--        approved boolean,
--        money_allocated Money,
--        paid boolean,
--        event_date DATE,
--        event_signup_open DATE,
--        event_signup_close DATE,
--        cost_to_attendee MONEY,
--        image_path varchar(100), 
--        description varchar(400),
--        attendees jsonb

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'test', -1, -1, 7000.00, true, 7000.00, true, '2016-12-12', '2016-12-13', '2016-12-30', 30, '../images/abc123.png', 'This is a random description about an event that doesnt exist!');

--01 proposal_id
--02 proposer_id
--03 expenses_id
--04 proposal_name
--05 week_proposed
--06 quarter_proposed
--07 money_requested
--08 approved
--09 money_allocated
--10 paid
--11 event_date
--12 event_signup_open
--13 event_signup_close
--14 cost_to_attendee
--15 image_path
--16 description
--17 attendees
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Planners', -1, -1, 7000.00, true, 7000.00, true, '2016-11-11', '2016-11-01', '2016-11-9');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Fall Blood Drive', -1, -1, 700.00, true, 700.00, false, '2016-10-11', '2016-10-1', '2016-10-9'); -- May break because of date
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Fall Speed Lawn Movie', -1, -1, 1200.00, true, 1200.00, true, '2016-8-30', '2016-8-1', '2016-8-28');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Exec Fund', -1, -1, 1500.00, true, 1500.00, false, '2016-11-1', '2016-10-1', '2016-10-30');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Movie Server', -1, -1, 2000.00, true, 2000.00, true, '2016-11-29', '2016-11-1', '2016-11-27');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'RHA Swag', -1, -1, 2500.00, true, 2500.00, false, '2016-11-21', '2016-11-1', '2016-11-19');

-- Fall = 0, Winter = 1, Spring = 2
-- week: 1--11, 1 = first week, 11 = finals week
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Cheap Food Day', 1, 1, NULL, false, 200.00, false, '2016-9-5', '2016-9-5', '2016-9-5', 10, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Lambda Chi Watermelon Bash', 1, 1, 100.00, true, 100.00, false, '2016-9-8', '2016-9-8', '2016-9-8', 10, '../images/abc123.png');


INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Chi Omega Run for Wishes', 2, 0, NULL, false, 150.00, false, '2016-9-11', '2016-9-11', '2016-9-11', 5, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Conferences', 2, 0, NULL, false, 5000.00, false, '2016-9-12', '2016-9-12', '2016-9-12', 0, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Beach Volleyball and Cookout', 2, 0, 400.00, true, 400.00, true, '2016-9-13', '2016-9-13', '2016-9-13', 5, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Grillin and Chillin', 2, 0, 500.00, true, 500.00, false, '2016-9-14', '2016-9-14', '2016-9-14', 8, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Pop Rocks', 2, 0, 100.00, true, 100.00, true, '2016-9-15', '2016-9-15', '2016-9-15', 5, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Bonfire Guarding', 2, 0, 800.00, true, 800.00, false, '2016-9-16', '2016-9-16', '2016-9-16', 0, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Percopo Hall Ed', 2, 0, 300.00, true, 300.00, true, '2016-9-17', '2016-9-17', '2016-9-17', 0, '../images/abc123.png');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Cooking Competition', 3, 0, NULL, false, 400.00, false, '2016-9-20', '2016-9-20', '2016-9-20', 5, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Kings Island', 3, 0, 6000.00, true, 6000.00, false, '2016-9-23', '2016-9-23', '2016-9-23', 15, '../images/abc123.png');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Haunted House', 4, 0, NULL, false, 375.00, false, '2016-9-26', '2016-9-26', '2016-9-26', 10, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Haunted Trail', 4, 0, NULL, false, 1000.00, false, '2016-9-30', '2016-9-30', '2016-9-30', 0, '../images/abc123.png');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'BSB 3 Cookout', 6, 0, NULL, false, 1000.00, false, '2016-10-10', '2016-10-10', '2016-10-10', 0, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Tri-Hop', 6, 0, NULL, false, 248.00, false, '2016-10-14', '2016-10-14', '2016-10-14', 7, '../images/abc123.png');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Random Acts of Kindness', 7, 0, NULL, false, 275.00, false, '2016-10-16', '2016-10-16', '2016-10-16', 0, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'BSB 3 Trick-or-Treat', 7, 0, NULL, false, 200.00, false, '2016-10-17', '2016-10-17', '2016-10-17', 0, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'GUAM Cookie Cart', 7, 0, NULL, false, 300.00, false, '2016-10-18', '2016-10-18', '2016-10-18', 5, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Reverse Trick-or-Treating', 7, 0, NULL, false, 20.00, false, '2016-10-19', '2016-10-19', '2016-10-19', 3, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Paws on the Patio', 7, 0, NULL, false, 200.00, false, '2016-10-20', '2016-10-20', '2016-10-20', 0, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Trunk R Treat', 7, 0, NULL, false, 50.00, false, '2016-10-21', '2016-10-21', '2016-10-21', 0, '../images/abc123.png');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'No Shave Novemeber', 8, 0, NULL, true, 200.00, false, '2016-10-24', '2016-10-24', '2016-10-24', 5, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Lazer Tag-Pokemon Tourney', 8, 0, NULL, false, 150.00, false, '2016-10-28', '2016-10-28', '2016-10-28', 10, '../images/abc123.png');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Lazer Tag Off-campus', 9, 0, NULL, false, 500.00, false, '2016-10-31', '2016-10-31', '2016-10-31', 12, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Blood Drive', 9, 0, NULL, true, 800.00, false, '2016-11-1', '2016-11-1', '2016-11-1', 5, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'ISA Diwali', 9, 0, NULL, false, 125.00, false, '2016-11-3', '2016-11-3', '2016-11-3', 8, '../images/abc123.png');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Ski Trip', 1, 1, NULL, true, 3375.00, false, '2016-11-28', '2016-11-28', '2016-11-28', 15, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Room Christmas Decoration Contest', 1, 1, NULL, true, 225.00, false, '2016-11-30', '2016-11-30','2016-11-30', 0, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Floor Christmas Decoration Contest', 1, 1, NULL, true, 450.00, false, '2016-12-2', '2016-12-2', '2016-12-2', 0, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Mug Decoration', 1, 1, NULL, true, 300.00, false, '2016-12-2', '2016-12-2', '2016-12-2', 0, '../images/abc123.png');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Salvation Army Tree', 1, 1, NULL, true, 150.00, false, '2016-12-3', '2016-12-3', '2016-12-3', 5, '../images/abc123.png');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Assassins', 3, 1, NULL, true, 100.00, false, '2016-12-12', '2016-12-12', '2016-12-12', 0, '../images/abc123.png');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'EWB Wallyball Tourney', 4, 1, NULL, false, 80.00, false, '2016-12-15', '2016-12-1', '2016-13-');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Greatest Floor', 4, 1, NULL, false, 2750.00, false, '2016-11-22', '2016-11-2', '2016-11-20');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Mr. Rose', 5, 1, NULL, false, 150.00, false, '2016-11-27', '2016-11-1', '2016-11-20');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Lunar New Years Celebration', 7, 1, NULL, false, 125.00, false, '2016-2-8', '2016-1-20', '2016-2-6');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Lunar New Years Celebration', 7, 1, NULL, false, 125.00, false, '2017-1-28', '2016-1-1', '2016-1-26');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Blood Drive', 7, 1, NULL, false, 800.00, false, '2016-12-26', '2016-12-5', '2016-12-24');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Super Smash Bros Tournament', 7, 1, NULL, false, 200.00, false, '2016-11-29', '2016-11-1', '2016-1-27');


INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Random Acts of Kindness', 8, 1, NULL, false, 200.00, false, '2016-10-27', '2016-10-5', '2016-10-25');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Nerds that Cook', 8, 1, NULL, false, 150.00, false, '2016-12-22', '2016-12-1', '2016-12-20');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Rock Out for Ryland', 3, 2, NULL, false, 1000.00, false, '2016-11-7', '2016-10-20', '2016-11-5');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Easter Egg Hunt', 3, 2, NULL, false, 300.00, false, '2016-11-8', '2016-10-10', '2016-11-6');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'SAA Color Smash', 3, 2, NULL, false, 120.00, false, '2016-11-23', '2016-11-1', '2016-11-20');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Dishes for Wishes', 4, 2, NULL, false, 250.00, false, '2016-10-25', '2016-10-1', '2016-10-23');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Deming Park Cookout', 4, 2, NULL, false, 1200.00, false, '2016-11-2', '2016-10-11', '2016-11-1');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Movie on the Lawn', 5, 2, NULL, false, 1200.00, false, '2016-11-30', '2016-11-10', '2016-11-28');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Campus Beautification', 6, 2, NULL, false, 500.00, false, '2016-10-27', '2016-10-5', '2016-10-25');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'SHPE Cinco de Mayo', 6, 2, NULL, false, 200.00, NULL, false, '2016-5-5', '2016-4-15', '2016-5-3');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'House Keepers Appreciation', 6, 2, NULL, false, 500.00, false, '2017-1-15', '2017-1-1', '2017-1-14');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Paws on the Patio', 6, 2, NULL, false, 200.00, false, '2017-2-7', '2017-1-20', '2017-2-6');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Blood Drive', 6, 2, NULL, false, 800.00, false, '2017-4-4', '2017-3-20', '2017-4-3');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Tri Delta Teeter Totter-a-thon', 6, 2, NULL, false, 300.00, false, '2017-5-20', '2017-5-1', '2017-5-19');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Rose Riot', 7, 2, NULL, false, 7500.00, false, '2017-3-7', '2017-2-24', '2017-3-6');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'ISA Global Cuisine Night', 7, 2, NULL, false, 100.00, false, '2017-4-15', '2017-4-1', '2017-4-14');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Student Involvement Award Dinner', 7, 2, NULL, false, 1000.00, false, '2017-6-1', '2017-5-10', '2017-5-30');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Planners', 7, 2, NULL, false, 7000.00, false, '2017-3-27', '2017-3-4', '2017-3-27');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Fall Blood Drive', 7, 2, NULL, false, 800.00, false, '2016-10-1', '2016-9-2', '2016-9-30');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Fall Speed Lawn Movie', 7, 2, NULL, false, 1200.00, false, '2017-10-2', '2017-9-2', '2017-10-1');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Tropical Sno', 8, 2, NULL, false, 300.00, false, '2017-12-17', '2017-11-26', '2017-12-17');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Rock Out for Ryland Tickets', 8, 2, NULL, false, 375.00, false, '2017-4-20', '2017-4-1', '2017-4-19');

INSERT INTO Proposals VALUES (DEFAULT, 1, 1, 'Hall Improvement Funds', 9, 2, 10000.00, true, 10000.00, false, '2017-3-24', '2017-3-1', '2017-3-23');
INSERT INTO Proposals VALUES (DEFAULT, 1, 1, "Thomas' 22nd Birthday", 9, 2, 10000.00, true, 10000.00, false, '2017-2-6', '2017-1-1', '2017-2-1');
