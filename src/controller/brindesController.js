//select all
exports.select = (req, res) => {
    //data from brindes
    global.connection.query(`SELECT * FROM tbl_brinde WHERE status = 1`,
    function(error, result){
        if(error) throw error;
        res.json({"response": result});
    })
};


//select by id
exports.selectById = (req, res) => {
    const id = req.params.brinde_id;

    global.connection.query(
        `SELECT 
            *
        FROM 
            tbl_brinde
        WHERE 
            id_brinde = ${id}`,
        function(error, result){
            if(error) throw error;
            res.json({'response': 
            result});
        } 
    );
};