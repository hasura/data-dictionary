alter table "public"."film_category"
           add constraint "film_category_film_id_fkey"
           foreign key ("film_id")
           references "public"."films"
           ("id") on update restrict on delete restrict;
