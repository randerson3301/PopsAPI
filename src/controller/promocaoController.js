const validator = require('../utils/validator');

exports.get = (res) => {
     //getting data from the promo
     global.connection.query(`SELECT * FROM tbl_promocao WHERE status = 1`,
     function(error, result, fields){
         if(error) throw error;
         res.json({"status":200, "error": null, "response": result});
        
     })
};

//subscribe the user in a promotion
exports.subscribeUser = (req, res) => {
    const user_id = req.params.user_id;
    const promo_id = req.params.promo_id;
   
    

    console.log(validator.verifyUserAlreadySubscribed(user_id, promo_id));
    
    if(validator.verifyUserAlreadySubscribed(user_id, promo_id) == 0) {
        console.log(validator.verifyUserAlreadySubscribed(user_id, promo_id));
        global.connection.query(`
            INSERT INTO 
                tbl_pessoa_promocao(id_p_fisica, id_promocao)
            VALUES(${user_id}, ${promo_id})`,
        function(error){
            if(error) throw error;
            res.json({"status":200, "error": null, "message": "Inscrição realizada com sucesso!"});
        });
    } else {
        res.json({"status":403, "message": "Você já está inscrito nessa promoção"});
    }
};
