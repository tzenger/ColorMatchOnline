const express = require('express');
const app = require('express')();
app.use(express.static('public'));

app.listen(process.env.PORT || 1234, function() {
	console.log('listening on 1234');
});