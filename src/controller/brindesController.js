//declarando pagarme
const pagarme = require('pagarme');

//select all
exports.select = (req, res) => {
    //data from brindes
    global.connection.query(`SELECT * FROM tbl_brinde WHERE status = 1`,
    function(error, result){
        if(error) throw error;
        res.json({"response": result});
    })
};

//select all compras
exports.selectCompras = (req, res) => {
    const idPF = req.params.id_p_fisica;
    //data from brindes
    global.connection.query(`SELECT * FROM tbl_compra_brinde WHERE id_p_fisica = ${idPF}`,
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

exports.insert = (req, res) => {
    //getting data by POST
    const id_p_fisica =  req.body.id_p_fisica;
    const dt_compra =  req.body.dt_compra;
    const valor_total =  req.body.valor_total;
    const status_pedido =  req.body.status_pedido;
    const logradouro =  req.body.logradouro;
    const bairro =  req.body.bairro;
    const cidade =  req.body.cidade;
    const uf =  req.body.uf;

    global.connection.query(
        `INSERT INTO tbl_compra_brinde
        (
            id_p_fisica,
            dt_compra,
            valor_total,
            peso_total,
            volume_total,
            status_pedido,
            status,
            logradouro,
            bairro,
            cidade,
            uf)
        VALUES
            (
            ${id_p_fisica},
            '${dt_compra}',
            ${valor_total},
            1,
            1,
            '${status_pedido}',
            1,
            '${logradouro}',
            '${bairro}',
            '${cidade}',
            '${uf}')`,
             function (error){
                 if(error) throw error;
                 res.json({'success': true, 'message': 
                    'Compra realizada com sucesso!'});
             }
        );
};



//conexão com pagar.me
exports.buy = (req, res) => {
     //getting data by POST
     const holder =  req.body.holder;
     const mes =  req.body.mes;
     const ano =  req.body.ano;
     const codSeg  =  req.body.codSeg ;
     const numCartao = req.body.numCartao ;
     const anoDigit = ano.substring(2, 4);

     const id = req.body.id_p_fisica;
     const email = req.body.email;
     const name = req.body.name;
     const data_nascimento = req.body.data_nascimento;
     const uf = req.body.uf;
     const logradouro = req.body.logradouro;
     const cidade = req.body.cidade;
     const num = req.body.num;
     const cep = req.body.cep;
     const item = req.body.item

     const card = {} 
     card.card_holder_name = holder
     card.card_expiration_date =  mes  + anoDigit;
     card.card_number = numCartao;
     card.card_cvv = codSeg;

    // pega os erros de validação nos campos do form e a bandeira do cartão
    var cardValidations = pagarme.validate({card: card})
				
    //verifica a validade do cartão
    if(!cardValidations.card.card_number)
      res.json({'success':false, 'message':'Oops, número de cartão incorreto'});
     
    
    pagarme.client.connect({ encryption_key: 'ek_test_IDW9bbVSmjmYmaMxAQaSoD023y84xm' })
      .then(client => client.security.encrypt(card))
      .then(card_hash => card_hash)

    //Script para realizar a transação
      pagarme.client.connect({ api_key: 'ak_test_nlWrn8okbIUe8n7UfLUXvq4I0mcH0A' })
        .then(client => client.transactions.create({
            "amount": 21000,
            "card_number": card.card_number,
            "card_cvv":  card.card_cvv,
            "card_expiration_date": card.card_expiration_date,
            "card_holder_name": card.card_holder_name,
            "customer": {
            "external_id": id,
            "name": card.card_holder_name,
            "type": "individual",
            "country": "br",
            "email": email,
            "phone_numbers": [
                "+5511948612289",
                
            ],
            "documents": [
                {
                "type": "cpf",
                "number":  '83596639476'
                }
            ],
            "birthday": data_nascimento
            },
            "billing": {
            "name": name,
            "address": {
                "country": "br",
                "state": uf,
                "city": cidade,
                "neighborhood": "null",
                "street":logradouro,
                "street_number":num,
                "zipcode": cep
            }
            },
            "shipping": {
            "name": name,
            "fee": 1000,
            "delivery_date": '2019-12-01',
            "expedited": true,
            "address": {
                "country": "br",
                "state": "sp",
                "city": cidade,
                "neighborhood": "null",
                "street": logradouro,
                "street_number": num,
                "zipcode": cep
        }
        },
        "items": [item]
    }))
    .then(transaction => {
        if(transaction.refuse_reason == null){
            res.json({'success': true, 'message': "Parabéns, você acaba de adquirir uma compra da Pop´s"});
           
        } else {
            res.json({'success': false, 'message': "Essa não! Sua compra não poder ser efetuada. Por favor, verifique os dados inseridos"});
        }
        //console.log(transaction)
    });
   
 
}