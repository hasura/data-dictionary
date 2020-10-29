alter table "public"."film_actor"
           add constraint "film_actor_actor_id_fkey"
           foreign key ("actor_id")
           references "public"."actors"
           ("id") on update restrict on delete restrict;
