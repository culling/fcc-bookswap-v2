var http = require("http");
var https = require("https");

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

var BookModel   = mongoExport.books.BookModel;

exports.lookup = function(title, callback){
    //console.log(escape(title));
    var hostname = "www.googleapis.com"
    var path = "/books/v1/volumes?q=intitle:" + escape(title);
    //console.log(path);
    https.get({hostname: hostname, path: path},
    function(response){
        var responseBody="";
        response.on("data", function(data){
        responseBody += data;
        });
        response.on("end", function(){
            //console.log(responseBody);
            var booksObjectResponseObject = responseBody;

            callback(booksObjectResponseObject);
        });
    });
};


exports.create  = function(rawBookObject){
    console.log("Book - Create Called");

    if(rawBookObject.owner){
        var book = {
            authors: rawBookObject.volumeInfo.authors ,
            title: rawBookObject.volumeInfo.title ,
            owner: rawBookObject.owner._id,
            thumbnailUrl: rawBookObject.volumeInfo.imageLinks.smallThumbnail
        }
        var newBook = new BookModel(book);
        //console.log(newBook);
        newBook.save();
    }
};


exports.lookupAll = function(done){
    console.log("Book - lookupAll Called");
    BookModel.find()
	    .populate("owner")
        .exec(
        function(err, results){
            if(err) return handleError(err);
            done(results);
        }
    );
}

exports.update = function(book, done){
    console.log("Book - Update Called");
    //console.log(book);

    mongoExport.books.BookModel.update({_id: book._id}, 
        book,
        function(err, updatedBook){
            if (err){
                console.error(err);
                done(err)
            } else {
                console.log("Updated Book");
                //console.log(updatedBook);
                done(null, updatedBook);
            }
        }
    )
}


