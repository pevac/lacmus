const fs = require('fs');
const uniqid = require('uniqid');

/* GET users listing. */

module.exports = function(app, filePath){
  app.get('/api/clients/:page/\:item', function(req, res, next) {
    fs.readFile(filePath,  function(err, data){
      if (err){
        console.log(err);
      } else {
        let content  = JSON.parse(data);
        let itemPerPage = req.params.item;
        let page = req.params.page;
        let items = [];
        for(let i=(page-1)*itemPerPage, j=0; j<itemPerPage && i<content.length; i++, j++){
            items[j] = content[i];
        }
        res.json({clients:items, totalItems: content.length});
      }    
    });
  });

  app.get("/api/clients/:id", function(req, res, next) {
    fs.readFile(filePath, "utf8", function readFileCallback(err, data){
      if (err){
        console.log(err);
      } else {
        let content  = JSON.parse(data);
        let item = {};
        for(let i=0; i<content.length; i++){
          if(content[i].id == req.params.id){
            item = content[i];
          }
        }

        res.json(item);
    }});
  });

  app.post('/api/clients', function(req, res, next) {
    fs.readFile(filePath, "utf8", function readFileCallback(err, data){
      if (err){
        console.log(err);
      } else {
        console.log( req.body);
        let content  = JSON.parse(data);
        let item  = req.body;
        item.id = uniqid.time();
        content.push(item);
        
        fs.writeFile(filePath, JSON.stringify(content), function(error) {
            if (error) {
              console.error("write error:  " + error.message);
            } else {
              console.log("Successful Write");
              res.send("Successful Write")
            }
        });
    }});
  });

  app.put("/api/clients/:id", function(req, res, next) {
    fs.readFile(filePath, "utf8", function readFileCallback(err, data){
      if (err){
        console.log(err);
      } else {
        let content  = JSON.parse(data);

        for(let i=0; i<content.length; i++){
          if(content[i].id == req.params.id){
            content[i] = req.body;
          }
        }

        fs.writeFile(filePath, JSON.stringify(content), function(error) {
            if (error) {
              console.error("write error:  " + error.message);
            } else {
              console.log("Successful Update");
              res.send("Successful Update")
            }
        });
    }});
  });

  app.delete('/api/clients/:id', function(req, res, next) {
    fs.readFile(filePath, "utf8", function readFileCallback(err, data){
      if (err){
        console.log(err);
      } else {
        let content  = JSON.parse(data);

        for(let i=0; i<content.length; i++){
          if(content[i].id == req.params.id){
            content.splice(i, 1);
            --i;
          }
        }

        fs.writeFile(filePath, JSON.stringify(content), function(error) {
            if (error) {
              console.error("write error:  " + error.message);
            } else {
              console.log("Successful Delete");
              res.send("Successful Delete")
            }
        });
    }});
  });
}




