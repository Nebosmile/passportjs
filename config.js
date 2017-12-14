module.exports={
    port:4000,
    db:"mongodb://127.0.0.1:27017/builds",
    options:{
        // pass:"~+3:3;y51unlDCS:2(-e-Cy]",
        // user:"buildsmaster3000",
        'useMongoClient':true,
    },
    hash:{
        length:24,
        iteration:10000
    },
    jwtsecret:"mysecretkey",
}
