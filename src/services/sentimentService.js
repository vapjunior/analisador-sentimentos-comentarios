import { GoogleGenerativeAI } from '@google/generative-ai'

/**
 * Análise de sentimento usando validador sintático
 * @param {string} comentario - O comentário a ser analisado
 * @returns {Promise<Object>} - Resultado da análise com sentimento e confiança
 */
export async function analisarSentimento(comentario) {
    return analiseSentimento(comentario)
}

/**
 * Análise de sentimento mock (para desenvolvimento/demonstração)
 * @param {string} comentario - O comentário a ser analisado
 * @returns {Object} - Resultado mock da análise
 */
function analiseSentimento(comentario) {
  const palavrasPositivas = [
    'excelente', 'ótimo', 'bom', 'maravilhoso', 'perfeito', 'recomendo', 
    'adorei', 'fantástico', 'satisfeito', 'qualidade', 'rápido', 'eficiente'
  ]
  
  const palavrasNegativas = [
    'ruim', 'péssimo', 'horrível', 'defeito', 'problema', 'lento', 
    'caro', 'insatisfeito', 'decepcionado', 'não recomendo', 'terrível'
  ]
  
  const textoLowerCase = comentario.toLowerCase()
  
  let pontuacaoPositiva = 0
  let pontuacaoNegativa = 0
  
  palavrasPositivas.forEach(palavra => {
    if (textoLowerCase.includes(palavra)) {
      pontuacaoPositiva++
    }
  })
  
  palavrasNegativas.forEach(palavra => {
    if (textoLowerCase.includes(palavra)) {
      pontuacaoNegativa++
    }
  })
  
  let sentimento = 'neutro'
  let confianca = 0.6
  let justificativa = 'Análise baseada em palavras-chave'
  
  if (pontuacaoPositiva > pontuacaoNegativa) {
    sentimento = 'positivo'
    confianca = Math.min(0.9, 0.6 + (pontuacaoPositiva * 0.1))
    justificativa = `Detectadas ${pontuacaoPositiva} expressões positivas`
  } else if (pontuacaoNegativa > pontuacaoPositiva) {
    sentimento = 'negativo'
    confianca = Math.min(0.9, 0.6 + (pontuacaoNegativa * 0.1))
    justificativa = `Detectadas ${pontuacaoNegativa} expressões negativas`
  }
  
  return {
    sentimento,
    confianca,
    justificativa,
    timestamp: new Date().toISOString(),
    mock: true
  }
}