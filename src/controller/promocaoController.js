exports.get = (req, res, next) => {
     //getting data from the promo
     global.connection.query(`SELECT * FROM tbl_promocao WHERE status = 1`,
     function(error, result, fields){
         if(error) throw error;
         res.json({"status":200, "error": null, "response": result});
        
     })
};

//subscribe the user in a promotion
exports.subscribeUser = (req, res) => {
    const user_id = req.params.id;
    const promo_id = req.params.promo_id;
    
    if(verifyUserAlreadySubscribed(user_id, promo_id)) {
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

//Essa função irá validar se o usuário já está cadastrado numa promoção específica
function verifyUserAlreadySubscribed(userId, promoId) {
    const id = userId;
    const promo = promoId;
    global.connection.query(`
        SELECT * FROM 
            tbl_pessoa_promocao
        WHERE id_p_fisica = ` + id + " AND  id_promocao =" +  promo,
    function(error, response){
        if(error) throw error;
        const numRows = response.length;
        
        console.log(numRows);

        if(numRows == 0){
            return true;
        }
        return false;
    });
}
