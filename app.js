require('dotenv').config()

const
    express = require('express'),
    app = express(),
    port = process.env.APP_PORT || 3000,
    Trivia = require("./core/model/Trivia")

app.get('/fetch', (req, res) => {
    (async () => {
        try {
            const
                fres = await fetch('https://opentdb.com/api.php?amount=50'),
                data = await fres.json(),
                out = []

            if( !data.results ) res.send( 'No Results Found' )

            for ( const [key, item] of Object.entries(data.results) ) {
                const trivia = new Trivia( item.question, item.correct_answer, item.incorrect_answers, item.difficulty, item.type, item.category )
                const exists = await trivia.get({
                    question: item.question,
                    category: item.category,
                })

                if( exists && !exists.length ) {
                    const out_res = await trivia.save()
                    if( out_res ) out.push( out_res )
                }

            }
            res.send( out )
        } catch (e) {
            res.send( e.message )
        }
    })()
})



app.listen( port, () => {
    console.log(`Quiz app listening on port ${port}`);
} )