<template>
  <div class="comment-list">
    <!-- Header da Lista -->
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-bold text-gray-900">
        Comentários
        <span v-if="totalComentarios > 0" class="text-lg text-gray-500 font-normal">
          ({{ totalComentarios }})
        </span>
      </h3>
      
      <!-- Filtros -->
      <div class="flex items-center gap-3">
        <select 
          v-model="filtroSelecionado"
          class="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="todos">Todos</option>
          <option value="positivo">Positivos</option>
          <option value="negativo">Negativos</option>
          <option value="neutro">Neutros</option>
        </select>
        
        <button
          v-if="totalComentarios > 0"
          @click="limparTodos"
          class="text-sm text-red-600 hover:text-red-700 px-3 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors duration-200"
        >
          Limpar Todos
        </button>
      </div>
    </div>

    <!-- Estatísticas -->
    <div v-if="totalComentarios > 0" class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div class="bg-success-50 border border-success-200 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-success-600">{{ estatisticas.positivo }}</div>
        <div class="text-sm text-success-700">Positivos ({{ estatisticas.percentualPositivo }}%)</div>
      </div>
      <div class="bg-danger-50 border border-danger-200 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-danger-600">{{ estatisticas.negativo }}</div>
        <div class="text-sm text-danger-700">Negativos ({{ estatisticas.percentualNegativo }}%)</div>
      </div>
      <div class="bg-warning-50 border border-warning-200 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-warning-600">{{ estatisticas.neutro }}</div>
        <div class="text-sm text-warning-700">Neutros ({{ estatisticas.percentualNeutro }}%)</div>
      </div>
    </div>

    <!-- Lista de Comentários -->
    <div class="space-y-4">
      <!-- Estado vazio -->
      <div v-if="comentariosFiltrados.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">💭</div>
        <h4 class="text-lg font-medium text-gray-600 mb-2">
          {{ totalComentarios === 0 ? 'Nenhum comentário ainda' : 'Nenhum comentário encontrado' }}
        </h4>
        <p class="text-gray-500">
          {{ totalComentarios === 0 
            ? 'Seja o primeiro a compartilhar sua opinião!' 
            : 'Tente ajustar os filtros para ver mais comentários.' 
          }}
        </p>
      </div>

      <!-- Comentários -->
      <div
        v-for="comentario in comentariosFiltrados"
        :key="comentario.id"
        class="card p-4 hover:shadow-md transition-shadow duration-200 animate-slide-up"
      >
        <!-- Header do Comentário -->
        <div class="flex justify-between items-start mb-3">
          <div class="flex items-center gap-3">
            <!-- Avatar -->
            <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span class="text-primary-600 font-semibold text-sm">
                {{ obterIniciais(comentario.autor) }}
              </span>
            </div>
            
            <!-- Info do Autor -->
            <div>
              <div class="font-medium text-gray-900">{{ comentario.autor }}</div>
              <div class="text-sm text-gray-500">{{ formatarData(comentario.timestamp) }}</div>
            </div>
          </div>
          
          <!-- Ações -->
          <div class="flex items-center gap-2">
            <!-- Badge de Sentimento -->
            <SentimentBadge 
              :analise="comentario.analise" 
              :is-loading="comentario.analise === null"
            />
            
            <!-- Botão Remover -->
            <button
              @click="removerComentario(comentario.id)"
              class="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
              title="Remover comentário"
            >
              ❌
            </button>
          </div>
        </div>

        <!-- Conteúdo do Comentário -->
        <div class="ml-13">
          <p class="text-gray-700 leading-relaxed">{{ comentario.texto }}</p>
          
          <!-- Análise Detalhada (se disponível) -->
          <div v-if="comentario.analise && mostrarDetalhes[comentario.id]" class="mt-3 p-3 bg-gray-50 rounded-lg">
            <div class="text-sm text-gray-600">
              <strong>Justificativa:</strong> {{ comentario.analise.justificativa }}
            </div>
            <div class="text-xs text-gray-500 mt-1">
              Confiança: {{ formatarConfianca(comentario.analise.confianca) }}
            </div>
          </div>
          
          <!-- Botão para mostrar/ocultar detalhes -->
          <button
            v-if="comentario.analise"
            @click="toggleDetalhes(comentario.id)"
            class="mt-2 text-xs text-primary-600 hover:text-primary-700"
          >
            {{ mostrarDetalhes[comentario.id] ? '▲ Menos detalhes' : '▼ Mais detalhes' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading para novos comentários -->
    <div v-if="isLoading" class="text-center py-4">
      <div class="inline-flex items-center text-primary-600">
        <span class="animate-spin mr-2">🔄</span>
        Analisando comentário...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCommentStore } from '@/store/commentStore'
import SentimentBadge from './SentimentBadge.vue'

// Store
const commentStore = useCommentStore()

// Estado local
const filtroSelecionado = ref('todos')
const mostrarDetalhes = ref({})

// Estados computados
const totalComentarios = computed(() => commentStore.totalComentarios)
const estatisticas = computed(() => commentStore.estatisticasSentimento)
const isLoading = computed(() => commentStore.isLoading)

const comentariosFiltrados = computed(() => {
  const comentarios = commentStore.comentariosOrdenados
  
  if (filtroSelecionado.value === 'todos') {
    return comentarios
  }
  
  return comentarios.filter(comentario => 
    comentario.analise?.sentimento === filtroSelecionado.value
  )
})

// Métodos
function obterIniciais(nome) {
  return nome
    .split(' ')
    .map(parte => parte.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatarData(timestamp) {
  return new Date(timestamp).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatarConfianca(confianca) {
  return `${Math.round(confianca * 100)}%`
}

function toggleDetalhes(comentarioId) {
  mostrarDetalhes.value[comentarioId] = !mostrarDetalhes.value[comentarioId]
}

function removerComentario(comentarioId) {
  if (confirm('Tem certeza que deseja remover este comentário?')) {
    commentStore.removerComentario(comentarioId)
  }
}

function limparTodos() {
  if (confirm('Tem certeza que deseja remover todos os comentários? Esta ação não pode ser desfeita.')) {
    commentStore.limparComentarios()
    filtroSelecionado.value = 'todos'
    mostrarDetalhes.value = {}
  }
}

// Emits para comunicação com componente pai
const emit = defineEmits(['comentarioRemovido', 'filtroAlterado'])

// Watchers
watch(filtroSelecionado, (novoFiltro) => {
  emit('filtroAlterado', novoFiltro)
})
</script>

<style scoped>
.comment-list {
  @apply animate-fade-in;
}

/* Offset para o avatar */
.ml-13 {
  margin-left: 3.25rem; /* 52px */
}
</style> 