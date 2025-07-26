table of contents - dev

to post new product send object : 

{
    "title":"blabla",
    "description": "blublu",
    "category":"blibli",
    "price": 92881,
    "inStock": true,
    "image" : {
    "url": "",
    "alt" : ""
    }
}
* only admin can post new products
 



 to create new user send object : 
 {
    "name":{
        "first" : "Or",
        "middle": "Raziel",
        "last": "Avikzer"
    },
    "phone":"0545920145",
    "email":"oravihzer4@gmail.com",
    "password": "Abcdefg123!",
    "image": {
        "url":"https://art.pixilart.com/b3679033fcbf417.png",
        "alt":""
    } ,
    "address" : {
        "state":"Israel",
        "country":"IL",
        "city":"RSHLZ",
        "street":"Jerusalem",
        "houseNumber":71,
        "zipCode":130000
    }

}
to login user send object :
on path : localhost:8182/users/login
{
        "email":"LOLA@gmail.com",
    "password": "Abcdefg123!"
}