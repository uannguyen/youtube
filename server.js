const express = require('express');
const path = require('path');
const router = express.Router()

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  console.log('AAAAAAAAAAAAAAAA')
  res.json('OK')
});

app.get('/list', function (req, res) {
  console.log('AAAAAAAAAAAAAAAA')
  res.json('OK')
});
router.route('/list').get(
    async (req, res, next) => {
      try {
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        return res.json('OK')
      } catch (error) {
        console.log(error.message)
      }
    }
  )
app.use('/api', router)
app.listen(4040);