exports.select = (req, res) => {
     //getting data from the promo
     global.connection.query(`SELECT * FROM tbl_promocao WHERE status = 1`,
     function(error, result){
         if(error) throw error;
         res.json({"success":true, "response": result});
     });
};

//subscribe the user in a promotion
exports.subscribeUser = (req, res) => {
    const user_id = req.params.user_id;
    const promo_id = req.params.promo_id;
    
    const sql = `SET @p1 = ${user_id}; SET @p2 = ${promo_id}; 
    CALL sp_verify_subscription_before_insert(@p1, @p2);`;

    global.connection.query(sql, 
        function(error, result){
                if(error) throw error;
                //resgatando o valor na posição 2 do result, que também é um vetor
                //e resgatando a posição 0 dele, em seguida é acessado _status que retornou da sp
                const status = result[2][0]._status
                
                if(status == 1) {
                    res.json({"success": true, "message": "Inscrição realizada com sucesso!"});
                } else {
                    res.status(403).json({"success": false, "message": "Você já foi cadastrado nessa promoção"});
                }
        });
};
