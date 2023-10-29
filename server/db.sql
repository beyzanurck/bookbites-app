--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Homebrew)
-- Dumped by pg_dump version 14.9 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: tpl622_8
--

CREATE TABLE public.comments (
    comment_id integer NOT NULL,
    user_id integer,
    api_id character varying(255),
    text text NOT NULL,
    date timestamp without time zone NOT NULL,
    rate double precision,
    CONSTRAINT comments_rate_check CHECK (((rate >= (0)::double precision) AND (rate <= (5)::double precision)))
);


ALTER TABLE public.comments OWNER TO tpl622_8;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl622_8
--

CREATE SEQUENCE public.comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_comment_id_seq OWNER TO tpl622_8;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl622_8
--

ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.comment_id;


--
-- Name: demo_api; Type: TABLE; Schema: public; Owner: tpl622_8
--

CREATE TABLE public.demo_api (
    demo_api_id integer NOT NULL,
    api_id character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    publicationyear integer NOT NULL,
    image_url character varying(500) NOT NULL,
    categories character varying(255) NOT NULL,
    averagerating double precision,
    ratingscount integer,
    description text
);


ALTER TABLE public.demo_api OWNER TO tpl622_8;

--
-- Name: demo_api_demo_api_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl622_8
--

CREATE SEQUENCE public.demo_api_demo_api_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.demo_api_demo_api_id_seq OWNER TO tpl622_8;

--
-- Name: demo_api_demo_api_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl622_8
--

ALTER SEQUENCE public.demo_api_demo_api_id_seq OWNED BY public.demo_api.demo_api_id;


--
-- Name: feeds; Type: TABLE; Schema: public; Owner: tpl622_8
--

CREATE TABLE public.feeds (
    feed_id integer NOT NULL,
    api_id character varying(255) NOT NULL,
    user_id integer,
    isfavorite boolean DEFAULT false,
    shelf_status integer,
    note text,
    CONSTRAINT feeds_shelf_status_check CHECK ((shelf_status = ANY (ARRAY[0, 1, 2])))
);


ALTER TABLE public.feeds OWNER TO tpl622_8;

--
-- Name: feeds_feed_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl622_8
--

CREATE SEQUENCE public.feeds_feed_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feeds_feed_id_seq OWNER TO tpl622_8;

--
-- Name: feeds_feed_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl622_8
--

ALTER SEQUENCE public.feeds_feed_id_seq OWNED BY public.feeds.feed_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tpl622_8
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    image character varying(500),
    auth0_sub character varying(255)
);


ALTER TABLE public.users OWNER TO tpl622_8;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl622_8
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO tpl622_8;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl622_8
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: comments comment_id; Type: DEFAULT; Schema: public; Owner: tpl622_8
--

ALTER TABLE ONLY public.comments ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);


--
-- Name: demo_api demo_api_id; Type: DEFAULT; Schema: public; Owner: tpl622_8
--

ALTER TABLE ONLY public.demo_api ALTER COLUMN demo_api_id SET DEFAULT nextval('public.demo_api_demo_api_id_seq'::regclass);


--
-- Name: feeds feed_id; Type: DEFAULT; Schema: public; Owner: tpl622_8
--

ALTER TABLE ONLY public.feeds ALTER COLUMN feed_id SET DEFAULT nextval('public.feeds_feed_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: tpl622_8
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: tpl622_8
--

COPY public.comments (comment_id, user_id, api_id, text, date, rate) FROM stdin;
\.


--
-- Data for Name: demo_api; Type: TABLE DATA; Schema: public; Owner: tpl622_8
--

COPY public.demo_api (demo_api_id, api_id, title, author, publicationyear, image_url, categories, averagerating, ratingscount, description) FROM stdin;
1	wvqXEAAAQBAJ	Spare	Prince Harry	2023	https://books.google.com/books/publisher/content?id=wvqXEAAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE732E29sIZHqNHHYYl1hJ27Pc5ilMrFGKJUogaucPjdmjxSzizl-rUnUbrY02iValiVuGwdlQLiUr5v5PiQEKrqsBYnSa7x94CVgRsYIRNbjClEwtNGnJ_gZH5mNjDWt49yP3IAf&source=gbs_api	Biography	5	1	This is the first sample description for the API.
3	vHnZCwAAQBAJ	The Body Keeps the Score	Bessel van der Kolk, M.D.	2014	https://books.google.com/books/content?id=T7iJDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	Psychology	4.2	120	This is another example of an API description.
4	XfFvDwAAQBAJ	Atomic Habits	James Clear	2018	https://books.google.com/books/content?id=XfFvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	Business & Economics	4.6	140	Sample description four goes here.
5	Sm5AKLXKxHgC	Harry Potter and the Prisoner of Azkaban	J.K. Rowling	2015	https://books.google.com/books/content?id=Sm5AKLXKxHgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	Fiction	4.5	107	The fifth placeholder sentence is this one.
2	Ayk3EAAAQBAJ	Lessons in Chemistry	Bonnie Garmus	2022	https://books.google.com/books/content?id=Ayk3EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	Fiction	4	80	Lorem ipsum set amend lorem impsum set amend
\.


--
-- Data for Name: feeds; Type: TABLE DATA; Schema: public; Owner: tpl622_8
--

COPY public.feeds (feed_id, api_id, user_id, isfavorite, shelf_status, note) FROM stdin;
1	wvqXEAAAQBAJ	19	f	\N	\N
3	vHnZCwAAQBAJ	19	t	\N	\N
2	wvqXEAAAQBAJ	17	f	\N	\N
4	vHnZCwAAQBAJ	17	f	\N	\N
6	XfFvDwAAQBAJ	17	f	\N	\N
5	Sm5AKLXKxHgC	17	f	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl622_8
--

COPY public.users (user_id, first_name, last_name, email, image, auth0_sub) FROM stdin;
17	Beyzanur	Ceylan	beyzanurceylan77@gmail.com	\N	google-oauth2|104532387427706249809
19	Beyzanur	Kılınç	nurbeyzakilinc@gmail.com	\N	google-oauth2|101574986102351626672
\.


--
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl622_8
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 1, false);


--
-- Name: demo_api_demo_api_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl622_8
--

SELECT pg_catalog.setval('public.demo_api_demo_api_id_seq', 5, true);


--
-- Name: feeds_feed_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl622_8
--

SELECT pg_catalog.setval('public.feeds_feed_id_seq', 6, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl622_8
--

SELECT pg_catalog.setval('public.users_user_id_seq', 19, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl622_8
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- Name: demo_api demo_api_api_id_key; Type: CONSTRAINT; Schema: public; Owner: tpl622_8
--

ALTER TABLE ONLY public.demo_api
    ADD CONSTRAINT demo_api_api_id_key UNIQUE (api_id);


--
-- Name: demo_api demo_api_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl622_8
--

ALTER TABLE ONLY public.demo_api
    ADD CONSTRAINT demo_api_pkey PRIMARY KEY (demo_api_id);


--
-- Name: feeds feeds_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl622_8
--

ALTER TABLE ONLY public.feeds
    ADD CONSTRAINT feeds_pkey PRIMARY KEY (feed_id);


--
-- Name: users users_auth0_sub_key; Type: CONSTRAINT; Schema: public; Owner: tpl622_8
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_auth0_sub_key UNIQUE (auth0_sub);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: tpl622_8
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl622_8
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: comments comments_api_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl622_8
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_api_id_fkey FOREIGN KEY (api_id) REFERENCES public.demo_api(api_id);


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl622_8
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: feeds feeds_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl622_8
--

ALTER TABLE ONLY public.feeds
    ADD CONSTRAINT feeds_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

