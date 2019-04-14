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

exports.getAddress = (req, res) => {
    const cnpj =  req.params.cnpj;
   
    const sql = `CALL sp_endereco_estabelecimentos(?)`;

    global.connection.query(sql, cnpj,
        function(error, result, fields){
                if(error) throw error;
                
                res.json({"success": true, "result": result[0]});
        });
};