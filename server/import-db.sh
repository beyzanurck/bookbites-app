#!/bin/bash

# Exit script on any error
set -e

# Import the SQL dump into the database
psql $DATABASE_URL < ./db.sql

echo "Database import completed."
