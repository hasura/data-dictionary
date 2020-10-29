alter table "public"."film_actor"
           add constraint "film_actor_film_id_fkey"
           foreign key ("film_id")
           references "public"."films"
           ("id") on update restrict on delete restrict;
