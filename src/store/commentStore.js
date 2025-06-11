import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { analisarSentimento } from '@/services/sentimentService'

export const useCommentStore = defineStore('comment', () => {
  // Estado
  const comentarios = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Getters computados
  const totalComentarios = computed(() => comentarios.value.length)
  
  const estatisticasSentimento = computed(() => {
    const stats = {
      positivo: 0,
      negativo: 0,
      neutro: 0,
      total: comentarios.value.length
    }
    
    comentarios.value.forEach(comentario => {
      if (comentario.analise?.sentimento) {
        stats[comentario.analise.sentimento]++
      }
    })
    
    return {
      ...stats,
      percentualPositivo: stats.total > 0 ? Math.round((stats.positivo / stats.total) * 100) : 0,
      percentualNegativo: stats.total > 0 ? Math.round((stats.negativo / stats.total) * 100) : 0,
      percentualNeutro: stats.total > 0 ? Math.round((stats.neutro / stats.total) * 100) : 0
    }
  })

  const comentariosOrdenados = computed(() => {
    return [...comentarios.value].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    )
  })

  // Actions
  async function adicionarComentario(dadosComentario) {
    if (!dadosComentario.texto?.trim()) {
      throw new Error('O comentário não pode estar vazio')
    }

    isLoading.value = true
    error.value = null

    try {
      // Criar objeto do comentário
      const novoComentario = {
        id: Date.now().toString(),
        autor: dadosComentario.autor || 'Anônimo',
        texto: dadosComentario.texto.trim(),
        timestamp: new Date().toISOString(),
        analise: null
      }

      // Adicionar à lista temporariamente
      comentarios.value.push(novoComentario)

      // Analisar sentimento
      try {
        const resultadoAnalise = await analisarSentimento(novoComentario.texto)
        
        // Atualizar comentário com a análise
        const index = comentarios.value.findIndex(c => c.id === novoComentario.id)
        if (index !== -1) {
          comentarios.value[index].analise = resultadoAnalise
        }
      } catch (analiseError) {
        console.error('Erro na análise de sentimento:', analiseError)
        // Manter o comentário mesmo se a análise falhar
        const index = comentarios.value.findIndex(c => c.id === novoComentario.id)
        if (index !== -1) {
          comentarios.value[index].analise = {
            sentimento: 'neutro',
            confianca: 0.5,
            justificativa: 'Erro na análise automática',
            erro: true
          }
        }
      }

      // Salvar no localStorage
      salvarNoStorage()

      return novoComentario

    } catch (err) {
      error.value = err.message || 'Erro ao adicionar comentário'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function removerComentario(id) {
    const index = comentarios.value.findIndex(c => c.id === id)
    if (index !== -1) {
      comentarios.value.splice(index, 1)
      salvarNoStorage()
    }
  }

  function limparComentarios() {
    comentarios.value = []
    salvarNoStorage()
  }

  function salvarNoStorage() {
    try {
      localStorage.setItem('comentarios-sentimento', JSON.stringify(comentarios.value))
    } catch (err) {
      console.error('Erro ao salvar no localStorage:', err)
    }
  }

  function carregarDoStorage() {
    try {
      const dadosSalvos = localStorage.getItem('comentarios-sentimento')
      if (dadosSalvos) {
        comentarios.value = JSON.parse(dadosSalvos)
      }
    } catch (err) {
      console.error('Erro ao carregar do localStorage:', err)
      comentarios.value = []
    }
  }

  function obterComentarioPorId(id) {
    return comentarios.value.find(c => c.id === id)
  }

  function filtrarPorSentimento(sentimento) {
    return comentarios.value.filter(c => c.analise?.sentimento === sentimento)
  }

  // Inicializar carregando dados salvos
  carregarDoStorage()

  return {
    // Estado
    comentarios,
    isLoading,
    error,
    
    // Getters
    totalComentarios,
    estatisticasSentimento,
    comentariosOrdenados,
    
    // Actions
    adicionarComentario,
    removerComentario,
    limparComentarios,
    carregarDoStorage,
    obterComentarioPorId,
    filtrarPorSentimento
  }
}) 