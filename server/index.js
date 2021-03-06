const express = require('express')
const morgan = require('morgan')
const cors = require('cors');

// we'll just use some variables as the "database" to get started

const db = {
  tabBlocks: [
    {
      tabs: [
        {
          title: 'Embracing Discovery',
          description: 'Every creative endeavor requires that you take risks. If you try and don\'t succeed, you\'ve still learned something. It took Thomas Edison more than 10,000 tries to invent a viable lightbulb. You\'re not failing. You\'re discovering what doesn\'t work.',
          media: {
            type: 'image',
            url: 'https://images.articulate.com/f:jpg%7Cpng,a:retain,b:fff/rise/courses/S3jQ2LjHDoRsPUQmR7dp6hA7-IaoYPA4/q0r7xIVMCo4RkD5A.gif'
          }
        },
        {
          title: 'Gaining Insight',
          description: 'To spark creativity, feed your brain material like you\'re cramming for a tough test. Then stop thinking about the problem you want to solve. Go surfing or take a leisurely walk. Research shows that letting your mind wander fosters creativity.\n\nIt’s also found that meditation helps you spot and solve problems in creative ways. It promotes divergent thinking that gets novel ideas flowing. According to these studies, meditation also makes you more open to considering new solutions. Time to breathe.',
          media: null
        },
        {
          title: 'Making It Real',
          description: 'No creative process is truly complete until it manifests a tangible reality. Whether your idea is an action or a physical creation, bringing it to life will likely involve the hard work of iteration, testing, and refinement.\n\nJust be wary of perfectionism. Push yourself to share your creations with others. By maintaining an open stance, you’ll be able to learn from their feedback. Consider their responses new material that you can draw from the next time you’re embarking on a creative endeavor.',
          media: null
        },
        {
          title: 'Love the Work',
          description: 'Every creative endeavor requires that you take risks. If you try and don\'t succeed, you\'ve still learned something. It took Thomas Edison more than 10,000 tries to invent a viable lightbulb. You\'re not failing. You\'re discovering what doesn\'t work.',
          media: {
            type: 'image',
            url: 'https://images.articulate.com/f:jpg%7Cpng,a:retain,b:fff/rise/courses/S3jQ2LjHDoRsPUQmR7dp6hA7-IaoYPA4/kcA21C-HvSKNkEmO.png'
          }
        },
      ]
    }
  ],
  flashcardBlocks: [
    {
      cards: [
        {
          front: {
            type: 'text',
            content: 'Front of card 1'
          },
          back: {
            type: 'text',
            content: 'Back of card 1'
          }
        },
        {
          front: {
            type: 'text',
            content: 'Front of card 2'
          },
          back: {
            type: 'image',
            content: 'https://images.articulate.com/f:jpg%7Cpng,a:retain,b:fff/rise/courses/S3jQ2LjHDoRsPUQmR7dp6hA7-IaoYPA4/55J-c_DLx5JdTJ_7.jpg'
          }
        },
        {
          front: {
            type: 'text',
            content: 'Front of card 3'
          },
          back: {
            type: 'text',
            content: 'Café au lait crema so cup est single shot acerbic. Saucer as, black crema organic single origin mocha. Half and half as iced caffeine robusta wings instant. Caramelization brewed con panna, aftertaste, seasonal, froth and, a medium ristretto caramelization caffeine. Mocha crema, lungo, bar, roast in coffee that latte as grinder latte. Cortado, acerbic, grounds coffee doppio brewed sweet. Id, plunger pot single shot, filter, galão spoon blue mountain aged beans. As whipped et chicory aftertaste java robusta est half and half.'
          }
        }
      ]
    }
  ],
  knowledgeCheckBlocks:  [
    {
      question: {
        id: '064dc82e-e679-4979-b3d5-7d1162e358d1',
        text: 'What is this a picture of?',
        media: {
          type: 'image',
          url: 'https://images.articulate.com/f:jpg%7Cpng,a:retain,b:fff/rise/courses/S3jQ2LjHDoRsPUQmR7dp6hA7-IaoYPA4/d229V-nstxA6tZdi.gif'
        }
      },
      answers: [
        {
          id: 'bc176f18-d954-460b-a552-b403be0de319',
          text: 'Cookies and coffee',
          isCorrect: true
        },
        {
          id: 'a125465a-af7c-44ce-9d1d-22da0748a738',
          text: 'Donuts and cider',
          isCorrect: false
        }
      ],
      feedback: 'I just love cookies and a warm cup of coffee!'
    }
  ],
  userState: {
    isCorrectAnswer: false,
    selectedOption: '',
    isSubmittedState: false
  }
}

function server() {
  const app = express()
  const port = process.env.PORT || 5000

  app.use(cors())
  app.use(morgan('dev'))

  app.get('/tab-blocks', (req, res) => res.send(db.tabBlocks))
  app.get('/flashcard-blocks', (req, res) => res.send(db.flashcardBlocks))
  app.get('/knowledge-check-blocks', (req, res) => res.send(db.knowledgeCheckBlocks))
  app.put('/user/state', express.json(), (req, res) => {
    db.userState = { ...db.userState, ...req.body }
    res.send(db.userState)
  })
  app.get('/user/state', (req, res) => res.send(db.userState))

  app.start = app.listen.bind(app, port, () => console.log(`Listening on port ${port}`))

  return app
}

if (require.main === module) server().start()

module.exports = server
