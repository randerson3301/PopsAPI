exports.get = (req, res, next) => {
     //getting data from the promo
     global.connection.query(`SELECT * FROM tbl_promocao WHERE status = 1`,
     function(error, result, fields){
         if(error) throw error;
         res.json({"status":200, "error": null, "response": result});
        
     })
};
