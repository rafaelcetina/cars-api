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

CREATE TABLE public.recommendation
(
    id serial,
    brand_id integer,
    model_id integer,
    content text NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (brand_id) REFERENCES public.brand(id) ON DELETE CASCADE,
    FOREIGN KEY (model_id) REFERENCES public.model(id) ON DELETE CASCADE,
    UNIQUE (brand_id, model_id)
);


GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO db_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE, SELECT ON SEQUENCES TO db_user;

GRANT ALL ON ALL TABLES IN SCHEMA public TO db_user;


TRUNCATE brand RESTART IDENTITY CASCADE;
TRUNCATE model RESTART IDENTITY CASCADE;
