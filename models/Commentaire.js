const db = require('../databases/db')

class Commentaire {
    constructor(data) {
        this.id = data.id
        this.auteur = data.auteur
        this.content = data.content
        this.created_at = new Date().toISOString()
        this.updated_at =  new Date().toISOString()
        this.id_article = data.id_article
    }

    static allArticle(id) {
        return new Promise((resolve, reject) => {
            const commentaires = []
            db.each('SELECT * FROM commentaires WHERE id_article = ?', 
            id, 
            (err, row) => {
                if (err)
                    reject(err)

                commentaires.push(new Commentaire(row))
            }, (err) => {
                resolve(commentaires)
            })
        })
    }

    static allAuteur(author) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM commentaires WHERE auteur = ?', 
            author,
            (err, rows) => {
                if (err)
                    reject(err)

                resolve(rows)
            })
        })
    }

    
    create() {
        return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO commentaires(auteur,content,id_article) VALUES (?, ?, ?)",
            this.auteur,
            this.content,
            this.id_article,
            (err, rows) => {
                if (err)
                    reject(err)

                resolve(rows)
            })
        })
    }
    
    update(id) {
        return new Promise((resolve, reject) => {
        db.run(
            "UPDATE commentaires SET auteur = ?, content = ?, updated_at = ?, id_article = ? WHERE id = ?",
            this.auteur,
            this.content,
            new Date().toISOString(),
            this.id_article,
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
       db.run('DELETE FROM commentaires WHERE id = ?', 
       [id],
       (err, rows) => {
        if (err)
            reject(err)

        resolve(rows)})
})
}

toJSON() {
    return {
        id: this.id,
        post_id: this.id_article,
        author: this.auteur,
        content: this.content,
        created_at: this.created_at,
        last_edit: this.updated_at
     

    }
}
}


module.exports = Commentaire
