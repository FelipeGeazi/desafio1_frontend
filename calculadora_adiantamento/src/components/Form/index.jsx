import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import "./style.css";
import { useForm } from "react-hook-form";

function Form() {
  const [tomorrow, settomorrow] = useState(0);
  const [fifteendays, setfifteendays] = useState(0);
  const [month, setmonth] = useState(0);
  const [threemonths, setthreemonths] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const dados = JSON.stringify(data);
    api
      .post("", dados, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const myArray = Object.keys(res.data).map((key) => res.data[key]);
        settomorrow(myArray[0]);
        setfifteendays(myArray[1]);
        setmonth(myArray[2]);
        setthreemonths(myArray[3]);
        console.log(myArray);
        toast.success("Parabéns, consulta realizada com sucesso");
      })
      .catch((err) => {
        toast.error("algo está errado");
        console.log(err);
      });

    console.log(data);
  };

  return (
    <div className="painel">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Simulação de Antecipação</h1>

        <label htmlFor="amount">
          Informe o valor da venda
          <input type="text" name="amount" {...register("amount")} />
          {errors.amount?.message && <span>{errors.amount.message}</span>}
        </label>

        <label htmlFor="installments">
          Em quantas parcelas *
          <input
            type="text"
            name="installments"
            {...register("installments")}
          />
          {errors.installments?.message && (
            <span>{errors.installments.message}</span>
          )}
        </label>

        <label htmlFor="mdr">
          Informe a porcentagem de HDR
          <input type="text" name="mdr" {...register("mdr")} />
          {errors.mdr?.message && <span>{errors.mdr.message}</span>}
        </label>

        <button type={"submit"}>Cadastrar</button>
      </form>
      <div className="result">
        <h2>VOCÊ RECEBERÁ:</h2>
        <h3>
          Amanhã:{" "}
          {tomorrow.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </h3>
        <h3>
          Em 15 dias:{" "}
          {fifteendays.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </h3>
        <h3>
          Em 30 dias:{" "}
          {month.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </h3>
        <h3>
          Em 90 dias:{" "}
          {threemonths.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </h3>
      </div>
    </div>
  );
}

export default Form;
