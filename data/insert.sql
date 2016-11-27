use virus;

load data local infile 'virus.csv' into table virus fields terminated by ',' ignore 1 lines (accesion, sample, source, country, isolate_t, submit_t, reference, length, orf);
