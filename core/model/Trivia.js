const {query} = require('../db')

class Trivia {
    constructor ( question, correct_answer, incorrect_answers, difficulty, type, category ) {
        this.table = "trivias"

        this.question = question
        this.correct_answer = correct_answer
        this.incorrect_answers = incorrect_answers
        this.difficulty = difficulty
        this.type = type
        this.category = category
    }

    async get( data = {} ) {
        const sql = `SELECT * FROM trivias WHERE ${Object.entries( data ).map(item => `${item[0]} = ?`).join(" AND ")} LIMIT 1`

        let values = []

        for (let item of Object.entries(data)) values.push(item[1])

        const res = await query(sql, values)
        if( res ) return res.rows
    }

    async save() {
        const sql = `INSERT INTO trivias (question, correct_answer, incorrect_answers, difficulty, type, category) VALUES ( ?, ?, ?, ?, ?, ?)`
        const res = await query(sql, [
            this.question,
            this.correct_answer,
            this.incorrect_answers,
            this.difficulty,
            this.type,
            this.category
        ])
        if( res && res.affectedRows ) return true
    }
}

module.exports = Trivia