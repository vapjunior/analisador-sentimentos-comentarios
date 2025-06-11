<template>
  <div class="sentiment-badge">
    <!-- Badge Principal -->
    <div 
      :class="[
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200',
        sentimentClass,
        { 'animate-pulse-slow': isLoading }
      ]"
    >
      
      <!-- Texto -->
      <span v-if="isLoading">
        Analisando...
      </span>
      <span v-else>
        {{ sentimentLabel }}
      </span>
      
      <!-- Confiança -->
      <span v-if="!isLoading && analise?.confianca" class="ml-2 text-xs opacity-75">
        ({{ formatarConfianca(analise.confianca) }})
      </span>
    </div>

    <!-- Detalhes Expandidos -->
    <div v-if="showDetails && !isLoading && analise" class="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <!-- Justificativa -->
      <div v-if="analise.justificativa" class="text-sm text-gray-700 mb-2">
        <strong>Análise:</strong> {{ analise.justificativa }}
      </div>
      
      <!-- Barra de Confiança -->
      <div class="mb-2">
        <div class="flex justify-between items-center text-xs text-gray-600 mb-1">
          <span>Confiança</span>
          <span>{{ formatarConfianca(analise.confianca) }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            :class="[
              'h-2 rounded-full transition-all duration-500',
              analise.confianca >= 0.7 ? 'bg-success-500' : 
              analise.confianca >= 0.5 ? 'bg-warning-500' : 'bg-danger-500'
            ]"
            :style="{ width: `${analise.confianca * 100}%` }"
          ></div>
        </div>
      </div>
      
      <!-- Metadados -->
      <div class="flex justify-between items-center text-xs text-gray-500">
        <span v-if="analise.timestamp">
          {{ formatarData(analise.timestamp) }}
        </span>
        <span v-if="analise.mock" class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
          Modo Demonstração
        </span>
        <span v-else-if="analise.erro" class="bg-red-100 text-red-800 px-2 py-1 rounded">
          Erro na Análise
        </span>
        <span v-else class="bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Google AI
        </span>
      </div>
    </div>

    <!-- Botão para expandir/recolher detalhes -->
    <button 
      v-if="!isLoading && analise"
      @click="toggleDetails"
      class="mt-1 text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
    >
      {{ showDetails ? '▲ Menos detalhes' : '▼ Mais detalhes' }}
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useSentimentAnalysis } from '@/composables/useSentimentAnalysis'

// Props
const props = defineProps({
  analise: {
    type: Object,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  showDetailsDefault: {
    type: Boolean,
    default: false
  }
})

// Composables
const { getSentimentColor,  getSentimentLabel, formatConfidence } = useSentimentAnalysis()

// Estado local
const showDetails = ref(props.showDetailsDefault)

// Computed
const sentimentClass = computed(() => {
  if (props.isLoading) {
    return 'text-gray-600 bg-gray-50 border-gray-200'
  }
  return props.analise?.sentimento ? getSentimentColor(props.analise.sentimento) : 'text-gray-600 bg-gray-50 border-gray-200'
})

const sentimentLabel = computed(() => {
  return props.analise?.sentimento ? getSentimentLabel(props.analise.sentimento) : 'Sem análise'
})

// Métodos
function toggleDetails() {
  showDetails.value = !showDetails.value
}

function formatarConfianca(confianca) {
  return formatConfidence(confianca)
}

function formatarData(timestamp) {
  return new Date(timestamp).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.sentiment-badge {
  @apply inline-block;
}

.animate-pulse-slow {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style> 