const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
 
var Publishable_Key = ''
var Secret_Key = ''
 
const stripe = require('stripe')(Secret_Key)
 
const port = process.env.PORT || 3000

 
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
 

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
 
app.get('/', function(req, res){
    res.render('Home', {
    key: Publishable_Key
    })
})
 
app.post('/payment', function(req, res){
 
   
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Sanket Patel',
        address: {
            line1: '200 Paint Post ',
            postal_code: 'M1H6A4A',
            city: 'Toronto',
            state: 'Ontario',
            country: 'Canada',
        }
    })
    .then((customer) => {
 
        return stripe.charges.create({
            amount: 500,    
            description: 'Ninjas products',
            currency: 'CAD',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("Thank you for the shooping from Ninjas Store")// If no error occurs
    })
    .catch((err) => {
        res.send(err)    // If some error occurs
    });
})
 
app.listen(port, function(error){
    if(error) throw error
    console.log("Server Running Successfully")
})

