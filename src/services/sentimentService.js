import { GoogleGenerativeAI } from '@google/generative-ai'

// Configuração da API Key (deve ser definida nas variáveis de ambiente)
const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY

// Inicialização do Google AI
let genAI = null
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY)
}

/**
 * Análise de sentimento usando Google AI Studio
 * @param {string} comentario - O comentário a ser analisado
 * @returns {Promise<Object>} - Resultado da análise com sentimento e confiança
 */
export async function analisarSentimento(comentario) {
  // Fallback para quando não há API key configurada
  if (!genAI || !API_KEY) {
    console.warn('Google AI API Key não configurada. Usando análise mock.')
    return analiseMockSentimento(comentario)
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    
    const prompt = `
    Analise o sentimento do seguinte comentário sobre um produto e responda APENAS com um JSON no formato:
    {"sentimento": "positivo|negativo|neutro", "confianca": 0.95, "justificativa": "breve explicação"}
    
    Comentário: "${comentario}"
    
    Critérios:
    - positivo: elogios, satisfação, recomendação
    - negativo: críticas, insatisfação, problemas
    - neutro: informativo, sem opinião clara, misto
    
    Responda APENAS com o JSON, sem texto adicional.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Parse da resposta JSON
    const jsonMatch = text.match(/\{.*\}/s)
    if (jsonMatch) {
      const analise = JSON.parse(jsonMatch[0])
      
      // Validação básica do resultado
      if (analise.sentimento && ['positivo', 'negativo', 'neutro'].includes(analise.sentimento)) {
        return {
          sentimento: analise.sentimento,
          confianca: analise.confianca || 0.8,
          justificativa: analise.justificativa || 'Análise automática',
          timestamp: new Date().toISOString()
        }
      }
    }
    
    throw new Error('Resposta inválida da API')
    
  } catch (error) {
    console.error('Erro na análise de sentimento:', error)
    
    // Fallback para análise mock em caso de erro
    return analiseMockSentimento(comentario)
  }
}

/**
 * Análise de sentimento mock (para desenvolvimento/demonstração)
 * @param {string} comentario - O comentário a ser analisado
 * @returns {Object} - Resultado mock da análise
 */
function analiseMockSentimento(comentario) {
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

/**
 * Verifica se a API do Google AI está configurada
 * @returns {boolean}
 */
export function isGoogleAIConfigured() {
  return !!(genAI && API_KEY)
} 