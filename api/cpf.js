import { cpf } from "cpf-cnpj-validator";

export default async function handler(req, res) {
  const API_KEY_ASAAS = process.env.API_KEY_ASAAS;

  for (let i = 0; i < 100; i++) {
    const documento = cpf.generate();

    const response = await fetch("https://www.asaas.com/api/v3/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access_token": API_KEY_ASAAS
      },
      body: JSON.stringify({
        name: "Lead Vercel",
        email: "teste@example.com",
        cpfCnpj: documento,
        phone: "71999999999"
      })
    });

    if (response.status === 200) {
      return res.status(200).json({ CpfCnpj: documento });
    }

    await new Promise((r) => setTimeout(r, 100));
  }

  return res.status(500).json({ erro: "Nenhum CPF foi aceito" });
}
