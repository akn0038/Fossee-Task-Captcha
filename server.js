let express = require('express')
//const hostname = "206.189"


let app = express()

app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(express.static('Images'))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// To Generate a captcha
function GenerateCaptcha() {
    let cap1 = Math.ceil(Math.random() * 10) + ''
    let cap2 = Math.ceil(Math.random() * 10) + ''
    let cap3 = Math.ceil(Math.random() * 10) + ''

    let capstr = new Array(4).join().replace(/(.|$)/g, function () { return ((Math.random() * 36) | 0).toString(36)[Math.random() < .5 ? "toString" : "toUpperCase"](); })
    let captchacode = capstr + cap1 + cap2 + cap3
    return captchacode
}

// To Validate the Captcha and Input
function ValidateCaptcha(captchacode, inputtext){
    captchacode = removeSpaces(captchacode)
    inputtext = removeSpaces(inputtext)

    return captchacode == inputtext
}

// Removes Spaces from the Captcha and Input
function removeSpaces(string) {  
    return string.split(' ').join('')
} 

let captcha

app.get('/', function(req,res){
    captcha = GenerateCaptcha()
    res.render('captcha',{captcha: captcha})
})

app.post('/captcha-validate', function(req,res){
    if(ValidateCaptcha(captcha, req.body.textCompare)){
        res.render('resume')
    }
    else {
        res.render('404')
    }
})

app.get('/captcha-validate' , function(req,res){
    res.render('4041')
})



app.listen(8080)