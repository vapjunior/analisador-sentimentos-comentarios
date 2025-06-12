import { ref, computed } from 'vue'
import { analisarSentimento, isGoogleAIConfigured } from '@/services/sentimentService'

export function useSentimentAnalysis() {
  const isAnalyzing = ref(false)
  const error = ref(null)
  const lastAnalysis = ref(null)

  // Configuração da API
  const isConfigured = computed(() => isGoogleAIConfigured())

  /**
   * Analisa o sentimento de um texto
   * @param {string} texto - Texto para análise
   * @returns {Promise<Object>} - Resultado da análise
   */
  async function analyze(texto) {
    if (!texto?.trim()) {
      throw new Error('Texto não pode estar vazio')
    }

    isAnalyzing.value = true
    error.value = null

    try {
      const resultado = await analisarSentimento(texto.trim())
      lastAnalysis.value = resultado
      return resultado
    } catch (err) {
      error.value = err.message || 'Erro na análise de sentimento'
      throw err
    } finally {
      isAnalyzing.value = false
    }
  }

  /**
   * Obtém a cor do tema baseada no sentimento
   * @param {string} sentimento - positivo, negativo ou neutro
   * @returns {string} - Classe CSS do Tailwind
   */
  function getSentimentColor(sentimento) {
    const cores = {
      positivo: 'text-success-600 bg-success-50 border-success-200',
      negativo: 'text-danger-600 bg-danger-50 border-danger-200',
      neutro: 'text-warning-600 bg-warning-50 border-warning-200'
    }
    return cores[sentimento] || cores.neutro
  }

  /**
   * Obtém o texto descritivo do sentimento
   * @param {string} sentimento - positivo, negativo ou neutro
   * @returns {string} - Descrição em português
   */
  function getSentimentLabel(sentimento) {
    const labels = {
      positivo: 'Positivo',
      negativo: 'Negativo',
      neutro: 'Neutro'
    }
    return labels[sentimento] || labels.neutro
  }

  /**
   * Formata a confiança como porcentagem
   * @param {number} confianca - Valor entre 0 e 1
   * @returns {string} - Porcentagem formatada
   */
  function formatConfidence(confianca) {
    return `${Math.round(confianca * 100)}%`
  }

  /**
   * Determina se a confiança é alta o suficiente
   * @param {number} confianca - Valor entre 0 e 1
   * @returns {boolean} - True se confiança é alta
   */
  function isHighConfidence(confianca) {
    return confianca >= 0.7
  }

  /**
   * Reseta o estado da análise
   */
  function reset() {
    isAnalyzing.value = false
    error.value = null
    lastAnalysis.value = null
  }

  return {
    // Estado
    isAnalyzing,
    error,
    lastAnalysis,
    isConfigured,

    // Métodos
    analyze,
    getSentimentColor,
    getSentimentLabel,
    formatConfidence,
    isHighConfidence,
    reset
  }
} 