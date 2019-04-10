
//Essa função irá validar se o usuário já está cadastrado numa promoção específica
exports.verifyUserAlreadySubscribed = (userId, promoId, res) => {
    const id = userId;
    const promo = promoId;

    global.connection.query(`
        SELECT * FROM 
            tbl_pessoa_promocao
        WHERE id_p_fisica = ` + id + ` AND  id_promocao = ` +  promo,
    function(error, response){
        if(error) throw error;
      // console.log("Nº de linhas: " + response.length);

       return response.length;
           
     });
};
