import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Cadastrar = () => {

    const [produto, setProduto] = useState({
        titulo: '',
        descricao: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setProduto({
        ...produto, [e.target.name]: e.target.value
    });

    const cadastrarProduto = async e => {
        e.preventDefault();

        await fetch("http://localhost:8080/cadastrar.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ produto })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson)
                if (responseJson.erro) {
                    setStatus({
                        type: 'erro',
                        mensagem: responseJson.messagem
                    });
                } else {
                    setStatus({
                        type: 'success',
                        mensagem: responseJson.messagem
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Erro ao cadastrar'
                });
            });
    }

    return (
        <div className="container">
            <h1>Cadastrar</h1>
            {status.type === 'erro' ? <div className="alert alert-danger">{status.mensagem}</div> : ""}
            {status.tydive === 'success' ? <div className="alert alert-success">{status.mensagem}</div> : ""}
            <form onSubmit={cadastrarProduto}>
                <div class="form-group">
                    <label>Título</label>
                    <input type="titulo" class="form-control" id="titulo" name="titulo" placeholder="Título do produto" onChange={valorInput} />
                </div>
                <div class="form-group">
                    <label>Descrição</label>
                    <input type="descricao" class="form-control" id="descricao" name="descricao" placeholder="Descrição do produto" onChange={valorInput} />
                </div>
                <button type="submit" class="btn btn-primary">Cadastrar</button>
                <br />
                <br />
                <Link to="/">
                    <button type="button" class="btn btn-primary">Listar</button>
                </Link>
            </form>
        </div >
    )
}