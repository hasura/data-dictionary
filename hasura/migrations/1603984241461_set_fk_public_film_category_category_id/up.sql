alter table "public"."film_category"
           add constraint "film_category_category_id_fkey"
           foreign key ("category_id")
           references "public"."categories"
           ("id") on update restrict on delete restrict;
