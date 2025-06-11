# Exemplos de Limitações na Análise de Sentimentos Sintática

Este documento apresenta exemplos de comentários que demonstram as limitações de uma análise de sentimentos baseada apenas em correspondência de palavras-chave. Esses casos justificam o uso de abordagens baseadas em IA para interpretação semântica e contextual.

---

## 🟠 Casos com Ironia ou Sarcasmo

**Comentário:**  
> “Nossa, que ótimo, o produto quebrou no primeiro uso.”  
**Análise:** Contém a palavra “ótimo”, mas o sentimento é negativo.

**Comentário:**  
> “Fantástico... só que não. Me arrependi totalmente.”  
**Análise:** Palavras positivas (“fantástico”) são anuladas pela ironia.

---

## 🔴 Casos com Negação Complexa

**Comentário:**  
> “Não é bom, nem um pouco.”  
**Análise:** A palavra “bom” está presente, mas é precedida de negação.

**Comentário:**  
> “Não posso dizer que fiquei satisfeito.”  
**Análise:** “Satisfeito” é positivo, mas a negação altera o sentido.

---

## 🟡 Casos com Sentimento Misto ou Confuso

**Comentário:**  
> “O atendimento foi bom, mas o produto veio com defeito.”  
**Análise:** Há termos positivos e negativos; exige interpretação de contexto.

**Comentário:**  
> “A entrega foi rápida, porém o serviço é horrível.”  
**Análise:** Pode ser rotulado como positivo se focar só em "rápido".

---