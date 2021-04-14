cd /root/data/fl/hillsb/clerk/ftp
for f in /root/data/fl/hillsb/clerk/ftp/Citation_DDS*.csv
do
  sudo mysql --local-infile=1 -u root -e \
  "LOAD DATA LOCAL INFILE '"$f"' INTO TABLE RAW.HILLSBOROUGH_CLERK_CITATION_DDS FIELDS   ENCLOSED BY '\"'   TERMINATED BY ','   ESCAPED BY '' LINES   TERMINATED BY '\r\n' IGNORE 1 ROWS;"
done

for f in /root/data/fl/hillsb/clerk/ftp/ProbateFiling*.csv
do
  sudo mysql --local-infile=1 -u root -e \
  "LOAD DATA LOCAL INFILE '"$f"' INTO TABLE RAW.HILLSBOROUGH_CLERK_PROBATE FIELDS   ENCLOSED BY '\"'   TERMINATED BY ','   ESCAPED BY '' LINES   TERMINATED BY '\r\n' IGNORE 1 ROWS;"
done

for f in /root/data/fl/hillsb/clerk/ftp/CriminalFiling*.csv
do
  sudo mysql --local-infile=1 -u root -e \
  "LOAD DATA LOCAL INFILE '"$f"' INTO TABLE RAW.HILLSBOROUGH_CLERK_CRIMINAL FIELDS   ENCLOSED BY '\"'   TERMINATED BY ','   ESCAPED BY '' LINES   TERMINATED BY '\r\n' IGNORE 1 ROWS;"
done

for f in /root/data/fl/hillsb/clerk/ftp/CivilFiling*.csv
do
  sudo mysql --local-infile=1 -u root -e \
  "LOAD DATA LOCAL INFILE '"$f"' INTO TABLE RAW.HILLSBOROUGH_CLERK_CIVIL FIELDS   ENCLOSED BY '\"'   TERMINATED BY ','   ESCAPED BY '' LINES   TERMINATED BY '\r\n' IGNORE 1 ROWS;"
done


sudo mysql --local-infile=1 -u root -e \
"LOAD DATA LOCAL INFILE '/root/data/fl/hillsb/prop_app/proc/hillsborough_pa_allsales.txt' INTO TABLE RAW.HILLSBOROUGH_PROP_APP_ALL_SALES FIELDS   ENCLOSED BY '\"'   TERMINATED BY '\t'   ESCAPED BY '' LINES   TERMINATED BY '\n' IGNORE 1 ROWS;"

sudo mysql --local-infile=1 -u root -e \
"LOAD DATA LOCAL INFILE '/root/data/fl/hillsb/prop_app/proc/hillsborough_pa_parcel.txt' INTO TABLE RAW.HILLSBOROUGH_PROP_APP_PARCEL FIELDS   ENCLOSED BY '\"'   TERMINATED BY '\t'   ESCAPED BY '' LINES   TERMINATED BY '\n' IGNORE 1 ROWS;"
