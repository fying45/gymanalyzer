DO
$$
DECLARE
    table_name text;
BEGIN
    -- Désactiver temporairement les contraintes de clé étrangère
    PERFORM 'ALTER TABLE ' || quote_ident(conname) || ' DISABLE TRIGGER ALL'
    FROM pg_constraint
    WHERE conrelid = 'flyway_schema_history'::regclass::oid;

    -- Boucle pour supprimer le contenu de toutes les tables sauf flyway_schema_history
    FOR table_name IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename <> 'flyway_schema_history'
    LOOP
        EXECUTE format('TRUNCATE TABLE %I CASCADE', table_name);
    END LOOP;

    -- Réactiver les contraintes de clé étrangère
    PERFORM 'ALTER TABLE ' || quote_ident(conname) || ' ENABLE TRIGGER ALL'
    FROM pg_constraint
    WHERE conrelid = 'flyway_schema_history'::regclass::oid;
END
$$;