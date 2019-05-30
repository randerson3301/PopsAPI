//essa função irá trazer o nome dos estabelecimentos que compraram o produto pesquisado
exports.searchPlaces = (req, res) => {
    const q = '%'+ req.params.q +'%';
   
    const sql = `CALL sp_search_places(?)`;

    global.connection.query(sql, q,
        function(error, result, fields){
                if(error) throw error;
                
                res.json({"success": true, "result": result[0]});
        });
};


exports.select = (req, res) => {
        const sql = `SELECT pj.*, e.logradouro, e.bairro, e.cidade, e.cep
        FROM tbl_pessoa_juridica AS pj
        INNER JOIN tbl_p_juridica_endereco AS pje ON pj.cnpj = pje.cnpj
        INNER JOIN tbl_endereco AS e ON pje.id_endereco = e.id_endereco`;

        global.connection.query(sql,
                function(error, result, fields){
                        if(error) throw error;
                        
                        res.json({"success": true, "result": result});
                });

}

exports.getAddress = (req, res) => {
    const cnpj =  req.params.cnpj;
   
    const sql = `CALL sp_endereco_estabelecimentos(?)`;

    global.connection.query(sql, cnpj,
        function(error, result, fields){
                if(error) throw error;
                
                res.json({"success": true, "result": result[0]});
        });
};