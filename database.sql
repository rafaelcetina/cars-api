CREATE TABLE public.model
(
    id serial,
    name text NOT NULL,
	average_price integer,
	brand_id integer,
    PRIMARY KEY (id),
	UNIQUE (name, brand_id)
);

CREATE TABLE public.brand
(
    id serial,
    name text NOT NULL,
    PRIMARY KEY (id),
  UNIQUE (name)
);


GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO db_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE, SELECT ON SEQUENCES TO db_user;

GRANT ALL ON ALL TABLES IN SCHEMA public TO db_user;


TRUNCATE brand RESTART IDENTITY;
TRUNCATE model RESTART IDENTITY;
