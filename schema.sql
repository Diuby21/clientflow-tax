-- ClientFlow Tax — schéma Supabase

create extension if not exists "uuid-ossp";

create table comptables (
  id uuid primary key default uuid_generate_v4(),
  nom text not null,
  email text not null unique,
  cabinet text not null
);

create table clients (
  id uuid primary key default uuid_generate_v4(),
  comptable_id uuid not null references comptables (id) on delete cascade,
  nom text not null,
  email text,
  type_client text,
  statut text default 'en_cours',
  deadline date,
  created_at timestamptz not null default now()
);

create table documents (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients (id) on delete cascade,
  type_document text not null,
  statut text,
  fichier_url text
);

-- Migration si la table existe déjà :
-- alter table clients add column if not exists created_at timestamptz not null default now();

create index idx_clients_comptable_id on clients (comptable_id);
create index idx_clients_created_at on clients (created_at desc);
create index idx_documents_client_id on documents (client_id);

alter table comptables enable row level security;
alter table clients enable row level security;
alter table documents enable row level security;

create policy "comptables_select_own" on comptables
  for select using (auth.uid() = id);

create policy "comptables_insert_own" on comptables
  for insert with check (auth.uid() = id);

create policy "comptables_update_own" on comptables
  for update using (auth.uid() = id);

create policy "clients_select_own" on clients
  for select using (comptable_id = auth.uid());

create policy "clients_insert_own" on clients
  for insert with check (comptable_id = auth.uid());

create policy "clients_update_own" on clients
  for update using (comptable_id = auth.uid());

create policy "clients_delete_own" on clients
  for delete using (comptable_id = auth.uid());

create policy "documents_all_own" on documents
  for all using (
    client_id in (
      select c.id from clients c
      join comptables co on c.comptable_id = co.id
      where co.id = auth.uid()
    )
  );
