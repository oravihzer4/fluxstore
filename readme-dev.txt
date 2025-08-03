
to post new product send object : 
on path : localhost:8182/products/

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
on path : localhost:8182/users/
 {
    "name":{
        "first" : "First",
        "middle": "Middle",
        "last": "Last"
    },
    "phone":"0000000000",
    "email":"email@mail.com",
    "password": "Abcdefg123!",
    "image": {
        "url":"Image Url",
        "alt":""
    } ,
    "address" : {
        "state":"state",
        "country":"country",
        "city":"city",
        "street":"street",
        "houseNumber":111,
        "zipCode":000000
    }

}
to login user send object :
on path : localhost:8182/users/login

(adminuser below)
{
        "email":"LOLA@gmail.com",
    "password": "Abcdefg123!"
}
