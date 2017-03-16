/*Save contents of tables to individual CSVs for backup*/

COPY Proposals TO '/tmp/proposals.csv' DELIMITER ',' CSV HEADER;
COPY Funds TO '/tmp/funds.csv' DELIMITER ',' CSV HEADER;
COPY Members TO '/tmp/members.csv' DELIMITER ',' CSV HEADER;
COPY Expenses TO '/tmp/expenses.csv' DELIMITER ',' CSV HEADER;
COPY Committee TO '/tmp/committee.csv' DELIMITER ',' CSV HEADER;
COPY InfoText TO '/tmp/committee.csv' DELIMITER '.' CSV HEADER;
COPY Equipment TO '/tmp/equipment.csv' DELIMITER ',' CSV HEADER;
COPY Rentals TO '/tmp/rentals.csv' DELIMITER ',' CSV HEADER;
COPY FloorMoney TO '/tmp/floormoney.csv' DELIMITER ',' CSV HEADER;
COPY FloorExpenses TO '/tmp/floorexpenses.csv' DELIMITER ',' CSV HEADER;


DROP TABLE Proposals CASCADE;
DROP TABLE Funds CASCADE;
DROP TABLE Members CASCADE;
DROP TABLE Expenses CASCADE;
DROP TABLE Committee CASCADE;
Drop TABLE InfoText CASCADE;
DROP TABLE Equipment CASCADE;
DROP TABLE Rentals CASCADE;
DROP TABLE FloorAttendanceNumerics CASCADE;
DROP TABLE FloorMoney CASCADE;
DROP TABLE FloorExpenses CASCADE;
