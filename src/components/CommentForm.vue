<template>
  <div class="comment-form card p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">
      Adicionar Comentário
    </h3>
    
    <form @submit.prevent="enviarComentario" class="space-y-4">
      <!-- Campo Nome -->
      <div>
        <label for="autor" class="block text-sm font-medium text-gray-700 mb-2">
          Seu nome
        </label>
        <input
          id="autor"
          v-model="form.autor"
          type="text"
          placeholder="Digite seu nome (opcional)"
          class="input"
          :disabled="isLoading"
        />
      </div>

      <!-- Campo Comentário -->
      <div>
        <label for="texto" class="block text-sm font-medium text-gray-700 mb-2">
          Comentário *
        </label>
        <textarea
          id="texto"
          v-model="form.texto"
          rows="4"
          placeholder="Compartilhe sua opinião sobre este produto..."
          class="textarea"
          :disabled="isLoading"
          required
        ></textarea>
        <div class="mt-1 text-xs text-gray-500">
          {{ form.texto.length }}/500 caracteres
        </div>
      </div>

      <!-- Erro -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3">
        <p class="text-sm text-red-600 flex items-center">
          ⚠️ {{ error }}
        </p>
      </div>

      <!-- Aviso sobre IA -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p class="text-sm text-blue-700 flex items-center">
          🤖 <span class="ml-1">Seu comentário será analisado automaticamente por IA para determinar o sentimento.</span>
        </p>
      </div>

      <!-- Botões -->
      <div class="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          :disabled="!podeEnviar"
          :class="[
            'btn flex-1 flex items-center justify-center',
            podeEnviar ? 'btn-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          <span v-if="isLoading" class="animate-spin mr-2">🔄</span>
          {{ isLoading ? 'Analisando...' : 'Enviar Comentário' }}
        </button>
        
        <button
          type="button"
          @click="limparFormulario"
          :disabled="isLoading"
          class="btn btn-secondary"
        >
          Limpar
        </button>
      </div>
    </form>

    <!-- Preview da Análise (se disponível) -->
    <div v-if="previewAnalise" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h4 class="text-sm font-medium text-gray-900 mb-2">📊 Prévia da Análise:</h4>
      <SentimentBadge :analise="previewAnalise" :show-details-default="true" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCommentStore } from '@/store/commentStore'
import SentimentBadge from './SentimentBadge.vue'

// Store
const commentStore = useCommentStore()

// Estado do formulário
const form = ref({
  autor: '',
  texto: ''
})

const error = ref(null)
const previewAnalise = ref(null)

// Estados computados
const isLoading = computed(() => commentStore.isLoading)

const podeEnviar = computed(() => {
  return form.value.texto.trim().length > 0 && 
         form.value.texto.length <= 500 && 
         !isLoading.value
})

// Emits
const emit = defineEmits(['comentarioAdicionado'])

// Watchers
watch(() => commentStore.error, (newError) => {
  if (newError) {
    error.value = newError
  }
})

// Limpar erro quando usuário digita
watch(() => form.value.texto, () => {
  if (error.value) {
    error.value = null
  }
})

// Métodos
async function enviarComentario() {
  try {
    error.value = null
    previewAnalise.value = null

    // Validações básicas
    if (!form.value.texto.trim()) {
      error.value = 'O comentário não pode estar vazio'
      return
    }

    if (form.value.texto.length > 500) {
      error.value = 'O comentário deve ter no máximo 500 caracteres'
      return
    }

    // Dados do comentário
    const dadosComentario = {
      autor: form.value.autor.trim() || 'Anônimo',
      texto: form.value.texto.trim()
    }

    // Adicionar comentário via store
    const comentarioAdicionado = await commentStore.adicionarComentario(dadosComentario)

    // Mostrar preview da análise se disponível
    if (comentarioAdicionado.analise) {
      previewAnalise.value = comentarioAdicionado.analise
      
      // Remover preview após alguns segundos
      setTimeout(() => {
        previewAnalise.value = null
      }, 5000)
    }

    // Limpar formulário
    limparFormulario()

    // Emitir evento
    emit('comentarioAdicionado', comentarioAdicionado)

    // Scroll suave para os comentários (opcional)
    setTimeout(() => {
      const comentariosSection = document.querySelector('.comments-section')
      if (comentariosSection) {
        comentariosSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)

  } catch (err) {
    error.value = err.message || 'Erro ao enviar comentário'
    console.error('Erro ao enviar comentário:', err)
  }
}

function limparFormulario() {
  form.value.autor = ''
  form.value.texto = ''
  error.value = null
  previewAnalise.value = null
}

// Exposar métodos para componente pai se necessário
defineExpose({
  limparFormulario,
  enviarComentario
})
</script>

<style scoped>
.comment-form {
  @apply animate-fade-in;
}

/* Animação para a análise preview */
.sentiment-preview {
  @apply animate-slide-up;
}
</style> 