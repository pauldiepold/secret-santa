create table events
(
    id          serial primary key,
    name        varchar(255) not null,
    budget      int,
    description text,
    date        date         not null,
    created_at  timestamptz default now()
);