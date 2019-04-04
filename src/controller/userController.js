//get user phone data
exports.login = (req, res, next) => {
    //getting data by POST
    const cpf =  req.body.cpf;
    const name =  req.body.name;
    const email =  req.body.email;
    const user =  req.body.user;
    const password =  req.body.password;


    global.connection.query(
        `INSERT INTO 
            tbl_pessoa_fisica(cpf, nome, email,
                usuario, senha)
         VALUES(
             '${cpf}', '${name}', '${email}', 
             '${user}', ${password}
             )`,
             function (error, contact){
                 if(error) throw error;
                 console.log(" a new contact´s address was added to database");
                 res.json({'status': 200, 'message': 
                 'Cadastro realizado com sucesso!'});
             }
        );
};
