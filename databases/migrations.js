const db = require('./db')

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS articles');
    db.run("CREATE TABLE IF NOT EXISTS articles(   \
        id INTEGER PRIMARY KEY AUTOINCREMENT,   \
        titre VARCAHR(50) NOT NULL, \
        content VARCAHR(50) NOT NULL,\
         date_created DATETIME, \
         date_updated DATETIME , \
          visible BOOLEAN   \
    )")
    db.run('DROP TABLE IF EXISTS commentaires');
    db.run("CREATE TABLE IF NOT EXISTS commentaires(   \
        id INTEGER PRIMARY KEY AUTOINCREMENT,   \
        id_article INTEGER, \
        auteur VARCHAR(255) ,\
        content VARCHAR(255), \
        created_at DATETIME, \
        updated_at DATETIME, \
        FOREIGN KEY (id_article) REFERENCES articles(id)   \
    )")

    db.run('DROP TABLE IF EXISTS tags');
    db.run("CREATE TABLE IF NOT EXISTS tags(   \
        id INTEGER PRIMARY KEY AUTOINCREMENT,   \
        id_article INTEGER, \
        tag VARCAHR(50) NOT NULL, \
        FOREIGN KEY (id_article) REFERENCES articles(id)   \
    )")
    console.log('Table articles, commentaires, tags créée')
})

db.close()
