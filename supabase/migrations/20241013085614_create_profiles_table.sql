CREATE TABLE public.profiles
(
    id         bigint primary key generated always as identity,

    user_id    UUID REFERENCES auth.users (id) unique,
    full_name  character varying(255) not null,
    picture    character varying(255),

    created_at  timestamp with time zone default current_timestamp,
    updated_at  timestamp with time zone
);

create
    extension if not exists moddatetime schema extensions;

create trigger
    handle_updated_at
    before update
    on public.profiles
    for each row
execute
    procedure moddatetime(updated_at);