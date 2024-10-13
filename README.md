# Secret Santa

Applikation zum Zulosen von Wichteln.

## Supabase lokal starten

```
supabase start
supabase stop
```

### Types automatisch erstellen

```
npx supabase gen types --lang=typescript --local > src/lib/database.types.ts
```

### Neue Migration erstellen

```
supabase migration new create_table_name
supbase reset
```
