//insert 
exports.insert = (req, res, next) => {
    //getting data by POST
    const cpf =  req.body.cpf;
    const name =  req.body.name;
    const email =  req.body.email;
    const user =  req.body.user;
    const password =  req.body.password;


    global.connection.query(
        `INSERT INTO 
            tbl_pessoa_fisica(cpf, nome, email,
                usuario, senha, status)
         VALUES(
             '${cpf}', '${name}', '${email}', 
             '${user}', ${password}, 0
             )`,
             function (error){
                 if(error) throw error;
                 console.log(" a new contact´s address was added to database");
                 res.json({'status': 200, 'message': 
                 'Cadastro realizado com sucesso!'});
             }
        );
};

//select by id
exports.selectById = (req, res) => {
    const id = req.params.user_id;

    global.connection.query(
        `SELECT 
            cpf, nome, email, usuario
        FROM 
            tbl_pessoa_fisica
        WHERE 
            id_p_fisica = ${id}`,
        function(error, result){
            if(error) throw error;
            res.json({'status': 200, 'response': 
            result});
        } 
    );
};

//update user
exports.update = (req, res) => {
    const id = req.params.user_id;

     //getting data by POST
     const cpf =  req.body.cpf;
     const name =  req.body.name;
     const email =  req.body.email;
     const user =  req.body.user;
    
     global.connection.query(`UPDATE tbl_pessoa_fisica 
     SET cpf = '${cpf}', nome = '${name}', 
     email = '${email}', usuario = '${user}' 
     WHERE id_p_fisica = ${id}`, function(error){
         if(error) throw error;
         res.json({"status":"200", 
         "message":"seus dados foram atualizados com sucesso!"});
    });
};

//update user password
exports.updatePassword = (req, res) => {
    const id = req.params.user_id;

     //getting data by POST
     const password =  req.body.password;
    
     global.connection.query(`UPDATE tbl_pessoa_fisica 
     SET senha = '${password}' 
     WHERE id_p_fisica = ${id}`, function(error){
         if(error) throw error;
         res.json({"status":"200", 
         "message":"senha atualizada com sucesso!"});
    });
};

//user authentication
exports.login = (req, res) => {
    const username = req.body.user;
    const password = req.body.password;

    global.connection.query(`
      SELECT 
        cpf, nome, email, usuario 
      FROM 
        tbl_pessoa_fisica 
      WHERE
        usuario = '${username}' AND senha = '${password}'`,
        function(error, result){
            
            if(error) return error;
           // console.log(result);
            if(result[0] == null){
                res.json({"success":false, "message": "não foi!", "response": result});
            } else {
                res.json({"success":true, "message": "Autenticado com sucesso!", "response": result});
            }
        });
}
