create table public.events
(
    id          bigint primary key generated always as identity,

    name        character varying(255),
    budget      int,
    description text,
    date        date not null,

    created_at  timestamp with time zone default current_timestamp,
    updated_at  timestamp with time zone
);

create
    extension if not exists moddatetime schema extensions;

create trigger
    handle_updated_at
    before update
    on public.events
    for each row
execute
    procedure moddatetime(updated_at);