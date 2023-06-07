const db = require('../databases/db')

class Tag {
    constructor(data) {
        this.id = data.id 
        this.tag = data.tag 
        this.id_article = data.id_article 

    }
  

    static allArticle(id) {
        return new Promise((resolve, reject) => {
            const tags = []
            db.each('SELECT * FROM tags WHERE id_article = ?', 
            id, 
            (err, row) => {
                if (err)
                    reject(err)

                tags.push(new Tag(row))
            }, (err) => {
                resolve(tags)
            })
        })
    }


    toJSON() {
        return {
            id: this.id,
            tag: this.tag,

        }
    }
}

module.exports = Tag