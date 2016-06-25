var express = require('express');
var router = express.Router();

router.get('', (req, res) => {
  res.sendFile('/app/index.html', {'root': './'} );
});

module.exports = router;
