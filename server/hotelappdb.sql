--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2024-09-27 12:18:45

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
-- TOC entry 221 (class 1259 OID 24663)
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    booking_id integer NOT NULL,
    user_id integer,
    room_id integer,
    booking_start date,
    booking_end date,
    total_price integer
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24662)
-- Name: bookings_booking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bookings_booking_id_seq OWNER TO postgres;

--
-- TOC entry 3360 (class 0 OID 0)
-- Dependencies: 220
-- Name: bookings_booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_booking_id_seq OWNED BY public.bookings.booking_id;


--
-- TOC entry 217 (class 1259 OID 24640)
-- Name: hotels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hotels (
    hotel_id integer NOT NULL,
    hotel_name character varying(255),
    hotel_location character varying(255)
);


ALTER TABLE public.hotels OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 24639)
-- Name: hotels_hotel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hotels_hotel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hotels_hotel_id_seq OWNER TO postgres;

--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 216
-- Name: hotels_hotel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hotels_hotel_id_seq OWNED BY public.hotels.hotel_id;


--
-- TOC entry 219 (class 1259 OID 24649)
-- Name: rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooms (
    room_id integer NOT NULL,
    hotel_id integer,
    room_name character varying,
    room_category character varying,
    room_capacity integer,
    room_beds integer,
    room_baths integer,
    room_utilities text[],
    room_isavailable boolean,
    room_description text,
    room_price integer,
    s3_file_locations text[]
);


ALTER TABLE public.rooms OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24648)
-- Name: rooms_room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rooms_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rooms_room_id_seq OWNER TO postgres;

--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 218
-- Name: rooms_room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rooms_room_id_seq OWNED BY public.rooms.room_id;


--
-- TOC entry 215 (class 1259 OID 24629)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    is_admin boolean,
    user_name character varying(255),
    email character varying(254),
    password character varying(255),
    wish_list integer[],
    booking_list integer[]
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 24628)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 3191 (class 2604 OID 24666)
-- Name: bookings booking_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN booking_id SET DEFAULT nextval('public.bookings_booking_id_seq'::regclass);


--
-- TOC entry 3189 (class 2604 OID 24643)
-- Name: hotels hotel_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels ALTER COLUMN hotel_id SET DEFAULT nextval('public.hotels_hotel_id_seq'::regclass);


--
-- TOC entry 3190 (class 2604 OID 24652)
-- Name: rooms room_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms ALTER COLUMN room_id SET DEFAULT nextval('public.rooms_room_id_seq'::regclass);


--
-- TOC entry 3188 (class 2604 OID 24632)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3354 (class 0 OID 24663)
-- Dependencies: 221
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (booking_id, user_id, room_id, booking_start, booking_end, total_price) FROM stdin;
11	3	103	2024-09-21	2024-09-24	300
12	3	103	2024-09-18	2024-09-20	200
13	3	214	2024-09-26	2024-09-28	600
14	3	206	2024-09-26	2024-09-28	700
15	5	208	2024-09-26	2024-09-28	600
\.


--
-- TOC entry 3350 (class 0 OID 24640)
-- Dependencies: 217
-- Data for Name: hotels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hotels (hotel_id, hotel_name, hotel_location) FROM stdin;
1	The Grand Hotel	Paris
2	Beachside Inn	Sydney
3	Cityscape Suites	Dubai
4	Mountain View Lodge	Islamabad
5	Sunset Valley Resort	Paris
6	Desert Mirage Hotel	Dubai
\.


--
-- TOC entry 3352 (class 0 OID 24649)
-- Dependencies: 219
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooms (room_id, hotel_id, room_name, room_category, room_capacity, room_beds, room_baths, room_utilities, room_isavailable, room_description, room_price, s3_file_locations) FROM stdin;
103	3	Single Economy	City Side	1	1	1	{WiFi," TV"}	t	An affordable single room	100	{https://i.imgur.com/qGZYwuC.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
101	1	Double Deluxe	City Side	2	1	1	{WiFi," TV"," Mini-Bar"}	t	A cozy room with city view	200	{https://i.imgur.com/B2ycCbq.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
102	2	Ocean View Suite	Beach Side	4	2	2	{WiFi," TV"," Balcony"}	t	A luxurious suite with ocean view	300	{https://i.imgur.com/kss3qtV.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/qJcOfJX.jpg}
203	1	Tranquil Countryside Escape	Country Side	3	2	2	{WiFi,TV,"Private patio or Balcony","Barbecue grill","Camp fire"}	f	Experience the beauty of the countryside with this stunning suite that offers not only luxurious accommodations but also breathtaking views of nature. The spacious room features a private patio for evening relaxation, and guests can enjoy the outdoor barbecue grill and campfire setup for an authentic countryside experience.	350	{https://i.imgur.com/Ui9y7tY.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
204	1	City Adventure Haven	City Side	1	1	1	{WiFi,TV,Mini-Bar}	t	An affordable option for solo travelers, this compact yet comfortable room offers all the essential amenities needed for a pleasant stay. Guests will appreciate the convenient city location, making it an ideal base for exploring the city's attractions while still enjoying modern comforts.	150	{https://i.imgur.com/nIbvbrH.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
206	2	Urban Elegance Suite	City Side	3	2	1	{WiFi,TV,"Private patio or Balcony"}	t	A sophisticated suite located in the heart of the city, this room provides an oasis of calm with its elegant furnishings and private balcony. Perfect for business travelers or tourists, the suite offers stunning city views and all the comforts needed for a relaxing stay after a busy day exploring or working in the city.	350	{https://i.imgur.com/XqWJW2g.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
208	2	Seaside Romance Suite	Beach Front	4	2	2	{WiFi,TV,"Private patio or Balcony"}	t	This romantic beach-front suite is the perfect getaway for couples looking to escape. Offering stunning views of the ocean from the private balcony, the room also features luxurious amenities, including a jacuzzi and a spacious living area, making it a top choice for those seeking a romantic and unforgettable beachside vacation.	300	{https://i.imgur.com/yLUZI6o.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
209	3	Poolside Paradise Deluxe	Amazing Pools	4	2	2	{WiFi,TV,"Private Pool"}	t	A stunning deluxe room with exclusive access to amazing pools and recreational facilities, this is the perfect choice for families or groups looking to enjoy a fun and relaxing stay. Guests can unwind by the private pool or explore the resort's various amenities, ensuring a delightful experience for all ages.	500	{https://i.imgur.com/L9TwlyG.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
210	3	Central City Budget Retreat	City Side	1	1	1	{WiFi,TV,Mini-Bar}	f	An affordable single room located in the city center, offering guests easy access to all the main attractions. The room is designed with simplicity and comfort in mind, featuring essential amenities like WiFi and a mini-bar, perfect for solo travelers looking for an economical yet convenient stay.	150	{https://i.imgur.com/kKlUvB1.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
214	4	Countryside Serenity Suite	Country Side	3	2	1	{WiFi,TV,"Private patio or Balcony"}	f	This countryside suite offers a peaceful retreat with its elegant design and scenic surroundings. Guests can relax on the private patio, enjoy fresh air, and take in the beautiful landscape, all while being pampered with modern conveniences that ensure a comfortable and memorable stay.	300	{https://i.imgur.com/GnLkoQA.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
212	3	Desert Serenity Suite	Desert	2	1	1	{WiFi,TV,Mini-Bar,"Camp fire"}	t	A unique desert-inspired suite that offers a blend of luxury and solitude. With its serene surroundings, this room allows guests to disconnect from the hustle and bustle of city life and immerse themselves in the peaceful desert environment. The campfire area offers a chance to experience evenings under the clear desert sky, making it a one-of-a-kind experience.	200	{https://i.imgur.com/d8syzP5.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
202	1	Desert Oasis Retreat	Desert	2	1	1	{WiFi,TV,Mini-Bar,"Camp fire"}	t	A cozy and comfortable room designed to offer a modern oasis in the desert. With all the necessary amenities such as WiFi, TV, and a mini-bar, this room is perfect for travelers who seek both adventure and comfort, offering a unique opportunity to enjoy campfire evenings under the stars.	250	{https://i.imgur.com/8KgY6BO.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg,https://i.imgur.com/qJcOfJX.jpg}
201	1	Oceanfront Paradise Suite	Beach Front	4	2	2	{WiFi,TV,"Private patio or Balcony","Barbecue grill","Camp fire"}	t	A spacious suite with an elegant design, combining modern conveniences with stunning beachfront views. This room provides guests with the perfect balance of luxury and relaxation, ideal for those looking to unwind by the sea while still enjoying high-end facilities like a private balcony and a cozy campfire area.	300	{https://i.imgur.com/Fif1e9u.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
205	2	Countryside Luxury Retreat	Country Side	4	2	2	{WiFi,TV,Mini-Bar,"Barbecue grill","Camp fire"}	t	An extravagant suite located in the heart of the countryside, offering guests a truly luxurious experience with top-notch amenities. The room features a private balcony with sweeping views, a mini-bar stocked with premium beverages, and a dedicated outdoor space for barbecues and campfires, making it a perfect choice for families or groups looking for a memorable retreat.	400	{https://i.imgur.com/C77gBTA.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
207	2	Adventurer’s Campfire Haven	Camping	2	1	1	{WiFi,TV,Mini-Bar,"Camp fire"}	f	For travelers seeking adventure with a touch of comfort, this room is perfect for camping enthusiasts. With amenities like a mini-bar, TV, and WiFi, guests can enjoy the rustic outdoors while still having access to modern conveniences. The campfire area offers a unique opportunity to gather around and enjoy a peaceful evening under the stars.	180	{https://i.imgur.com/AvG30EI.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
211	3	Beachside Deluxe Escape	Beach Front	3	2	2	{WiFi,TV,"Private patio or Balcony"}	t	A spacious deluxe room with breathtaking views of the ocean and direct beach access. The room is elegantly furnished and comes equipped with modern conveniences such as WiFi and a private patio, making it ideal for guests who want to enjoy the beauty of the beach in style.	400	{https://i.imgur.com/z4ndRqu.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
224	6	Desert Adventure Room	Desert	2	1	1	{WiFi,TV,Mini-Bar,"Camp fire"}	t	A cozy room designed for adventure seekers, located in the heart of the desert. With amenities like a mini-bar and campfire area, guests can enjoy both comfort and a taste of the great outdoors, perfect for those looking to explore the beauty of the desert landscape.	210	{https://i.imgur.com/tiByZH5.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
220	5	Countryside Cozy Retreat	Country Side	3	2	1	{WiFi,TV,"Private patio or Balcony"}	t	A charming retreat in the countryside, this cozy room provides a peaceful escape from the busy city life. Guests can enjoy the serene views from the private patio, making it an ideal location for relaxation and rejuvenation in a natural setting.	220	{https://i.imgur.com/KE8nfoI.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
213	4	Luxury Cityside Retreat	City Side	4	2	2	{WiFi,TV,Mini-Bar,"Barbecue grill","Camp fire"}	t	A modern and luxurious deluxe room situated in a prime city location. With top-tier amenities, including a mini-bar and a barbecue grill, this room offers an unforgettable experience for both business and leisure travelers. The campfire area adds a touch of warmth to the overall experience, making it a great choice for those looking to relax after a long day.	350	{https://i.imgur.com/7mwIQei.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
215	4	Poolside Getaway Standard	Amazing Pools	2	1	1	{WiFi,TV,Mini-Bar,"Barbecue grill"}	t	A cozy and comfortable standard room offering guests access to the resort's incredible pool facilities. Whether relaxing by the pool or enjoying a barbecue in the outdoor area, this room is perfect for couples or small families looking for a fun and enjoyable stay.	280	{https://i.imgur.com/C77gBTA.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
222	6	Luxury Camping Experience	Camping	2	1	1	{WiFi,TV,"Camp fire"}	t	This unique camping experience combines the thrill of the outdoors with modern amenities. The room is equipped with a TV, WiFi, and a campfire area, allowing guests to enjoy evenings under the stars while still having access to essential comforts.	200	{https://i.imgur.com/DmpvIIG.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
216	4	Budget Beachside Escape	Beach Front	1	1	1	{WiFi,TV,Mini-Bar}	t	This affordable beachfront room is perfect for solo travelers or couples looking for a budget-friendly option by the sea. The room comes equipped with all basic amenities and provides direct access to the beach, allowing guests to enjoy the sun, sand, and surf without breaking the bank.	200	{https://i.imgur.com/8KgY6BO.jpg,https://i.imgur.com/0M9zkkt.jpg,https://i.imgur.com/qJcOfJX.jpg,https://i.imgur.com/3kX7mbH.jpg,https://i.imgur.com/eEoiwIj.jpg,https://i.imgur.com/Bv9cFZF.jpg}
\.


--
-- TOC entry 3348 (class 0 OID 24629)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, is_admin, user_name, email, password, wish_list, booking_list) FROM stdin;
4	\N	Hassan	mujtabanq@hotmail.com	$2b$10$jG.MQX9fs7hCjw5YBfEEjOKuDUH2/4qUnEzm5sgsV.sFPRffVduqC	\N	\N
3	\N	Saiyed Naqvi	murtaza.naqvi.2003@gmail.com	$2b$10$3sOXaUNM2ZalYDk2CGfpDuYd4qUEW1L/zj3jwml65XYt4mVpEZYQa	{204,202}	\N
5	\N	testuser1	testemail1@gmail.com	$2b$10$lzzLj20B6cBlGlykr9zptee2vnoXOAA8w92n7n.gEHJSaUYNMA4Dq	{}	\N
\.


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 220
-- Name: bookings_booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_booking_id_seq', 15, true);


--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 216
-- Name: hotels_hotel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hotels_hotel_id_seq', 1, false);


--
-- TOC entry 3366 (class 0 OID 0)
-- Dependencies: 218
-- Name: rooms_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rooms_room_id_seq', 1, false);


--
-- TOC entry 3367 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 5, true);


--
-- TOC entry 3201 (class 2606 OID 24668)
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (booking_id);


--
-- TOC entry 3197 (class 2606 OID 24647)
-- Name: hotels hotels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT hotels_pkey PRIMARY KEY (hotel_id);


--
-- TOC entry 3199 (class 2606 OID 24656)
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (room_id);


--
-- TOC entry 3193 (class 2606 OID 24638)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3195 (class 2606 OID 24636)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3203 (class 2606 OID 24674)
-- Name: bookings bookings_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(room_id);


--
-- TOC entry 3204 (class 2606 OID 24669)
-- Name: bookings bookings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 3202 (class 2606 OID 24657)
-- Name: rooms rooms_hotel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_hotel_id_fkey FOREIGN KEY (hotel_id) REFERENCES public.hotels(hotel_id);


-- Completed on 2024-09-27 12:18:45

--
-- PostgreSQL database dump complete
--

