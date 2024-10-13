CREATE TABLE public.event_profile
(
    id         bigint primary key generated always as identity,

    profile_id bigint references profiles,
    event_id   bigint references events,

    created_at  timestamp with time zone default current_timestamp,
    updated_at  timestamp with time zone
);

create
extension if not exists moddatetime schema extensions;

create trigger
    handle_updated_at
    before update
    on public.event_profile
    for each row
    execute
        procedure moddatetime(updated_at);
