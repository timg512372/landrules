require('dotenv').config();
const  auto = async (tp, id) => {
    var https = require('https');
    var querystring = require('querystring');
    var base_url = 'https://api.typingdna.com/';
    var apiKey = process.env.TYPINGDNA_KEY;
    var apiSecret = process.env.TYPINGDNA_SECRET;
    var id = id;
    var data = {
    tp : tp,
    }
  

    function callback(responseData, res) {
        console.log('calling back weewooweewoo')
        console.log("responseData: " + responseData)
        if (responseData) {
            res.status(200).send(responseData)
        }
    }
    
     var options = {
    hostname : base_url,
    port : 443,
    path : '/auto/' + id,
    method : 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
        'Authorization': 'Basic ' + new Buffer(apiKey + ':' + apiSecret).toString('base64'),
    },
    };

    var responseData = '';
    var req = https.request(options, function(res) {

    res.on('data', function(chunk) {
        responseData += chunk;
    });

    res.on('end', function() {
        console.log(JSON.parse(responseData));
        callback(JSON.parse(responseData), res)
    });
    

    });
    
    req.on('error', function(e) {
    console.error(e);
    });
    req.write(
    querystring.stringify(data)
    );
    
    req.end();
    return responseData
    

   
}

module.exports = {auto}