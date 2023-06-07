const db = require('../databases/db')
const Tags = require('./Tag');
const Commentaire = require('./Commentaire');

class Article {
    static #table_name = 'articles';

   

    constructor(data) {
        this.id = data.id || null
        this.titre = data.titre || null
        this.content = data.content || null
        this.date_created = new Date().toISOString()
        this.date_updated =  new Date().toISOString()
        this.visible = 1; 
        this.tags = []
        this.commentaires = []
     
    }

    async get_tag() {
        this.tags = await Tags.allArticle(this.id)
    }

    async get_commentaire() {
        this.commentaires = await Commentaire.allArticle(this.id)
    }

   

   
    static all() {
        return new Promise((resolve, reject) => {
            const articles = []
            db.each('SELECT * FROM articles', (err, row) => {
                if (err)
                    reject(err)

                    articles.push(new Article(row))
            }, async (err) => {
                for (const article of articles) {
                    await article.get_tag();
                    await article.get_commentaire();

                }

                resolve(articles)
            })
        })
    }
    static find(id) {
        return new Promise((resolve, reject) => {
            const articles = []
            db.each('SELECT * FROM articles WHERE id = ?',
            [id], 
            (err, row) => {
                if (err)
                    reject(err)

                    articles.push(new Article(row))
            }, async (err) => {
                for (const article of articles) {
                    await article.get_tag();
                    await article.get_commentaire();

                }

                resolve(articles)
            })
        })
    }
  
    
    create() {
        db.run(
            "INSERT INTO articles(titre, content, date_created, date_updated, visible) VALUES (?, ?, ?, ?, ?)",
            this.titre,
            this.content,
            this.date_created,
            this.date_updated,
            this.visible,
            (err) => {
                if (err) {
                    console.error("Erreur lors de l'insertion de l'article :", err.message);
                } else {
                    console.log("Article inséré avec succès !");
                }
            }
        );
    }
    
    update(id) {
        return new Promise((resolve, reject) => {
            db.run(
            "UPDATE articles SET titre = ?, content = ?, date_updated = ?, visible = ? WHERE id = ?",
            this.titre,
            this.content,
            new Date().toISOString(),
            this.visible,
            id,
            (err, rows) => {
                if (err)
                    reject(err)

                resolve(rows)
            })
        })
    }
    


    static delete(id) {
        return new Promise((resolve, reject) => {
           db.run('DELETE FROM articles WHERE id = ?', 
           [id],
           (err, rows) => {
            if (err)
                reject(err)
    
            resolve(rows)
        })
    })
    }
 /**
     * Cette fonction est appelé par défaut l'orsque le model est convertit en 
     * objet JSON, il nous permet de définir le schema de la Resource que nous renvoyons
     * @returns Une ressource
     */
    toJSON() {
        return {
            id: this.id,
            title: this.titre,
            content: this.content,
            created_at: this.date_created,
            last_edit: this.date_updated,
            visible: this.visible,
            tags: this.tags,
            commentaires: this.commentaires
        }
    }
    }
  
   
 


module.exports = Article