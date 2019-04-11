
//Essa função irá validar se o usuário já está cadastrado numa promoção específica
exports.verifyUserAlreadySubscribed = (user_id, promo_id) => {
  
    const id = user_id;
    const promo = promo_id;

    global.connection.query(`
        SELECT * FROM 
            tbl_pessoa_promocao
        WHERE id_p_fisica = ` + id + ` AND  id_promocao = ` +  promo,
    function(error, response){
        if(error) throw error;
      // console.log("Nº de linhas: " + response.length);
       console.log(response.length);
       if(response[0] == null) {
         return true;
            //return result;
       } 
        return false;
     });
};
