var express = require('express'),
app = express();

app.listen(process.env.PORT || 5000);

app.use(express.static(__dirname));
