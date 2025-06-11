<template>
  <div class="product-view">
    <!-- Breadcrumb -->
    <nav class="mb-6" aria-label="Breadcrumb">
      <div class="flex items-center space-x-2 text-sm text-gray-500">
        <span>Início</span>
        <span>›</span>
        <span>{{ produto.categoria }}</span>
        <span>›</span>
        <span class="text-gray-900 font-medium">{{ produto.nome }}</span>
      </div>
    </nav>

    <!-- Layout Principal -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Coluna Principal - Produto -->
      <div class="lg:col-span-2">
        <ProductCard :produto="produto" />
        
        <!-- Aviso sobre API -->
        <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div class="flex items-start">
            <span class="text-blue-500 mr-3 text-lg">🤖</span>
            <div class="text-sm text-blue-700">
              <p class="font-medium mb-1">Análise de Sentimento com IA</p>
              <p>
                {{ isGoogleAIConfigured 
                  ? 'Esta aplicação utiliza o Google AI Studio (Gemini) para análise automática de sentimentos em tempo real.'
                  : 'API do Google AI não configurada. Utilizando análise mock para demonstração.' 
                }}
              </p>
              <p class="mt-2 text-xs">
                Desenvolvido para o minicurso "Build With A.I." - Unimar & Google
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar - Comentários -->
      <div class="lg:col-span-1">
        <!-- Estatísticas Resumidas -->
        <div v-if="totalComentarios > 0" class="card p-4 mb-6">
          <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
            Resumo das Opiniões
          </h3>
          
          <!-- Gráfico de Barras Simples -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-success-600">Positivo</span>
              <span class="text-sm font-medium">{{ estatisticas.percentualPositivo }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-success-500 h-2 rounded-full transition-all duration-500"
                :style="{ width: `${estatisticas.percentualPositivo}%` }"
              ></div>
            </div>
            
            <div class="flex items-center justify-between">
              <span class="text-sm text-danger-600">Negativo</span>
              <span class="text-sm font-medium">{{ estatisticas.percentualNegativo }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-danger-500 h-2 rounded-full transition-all duration-500"
                :style="{ width: `${estatisticas.percentualNegativo}%` }"
              ></div>
            </div>
            
            <div class="flex items-center justify-between">
              <span class="text-sm text-warning-600">Neutro</span>
              <span class="text-sm font-medium">{{ estatisticas.percentualNeutro }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-warning-500 h-2 rounded-full transition-all duration-500"
                :style="{ width: `${estatisticas.percentualNeutro}%` }"
              ></div>
            </div>
          </div>
          
          <!-- Nota Geral -->
          <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="text-center">
              <div class="text-2xl font-bold" :class="notaGeralClass">
                {{ notaGeral }}/5
              </div>
              <div class="text-sm text-gray-600">Nota baseada nos sentimentos</div>
            </div>
          </div>
        </div>

        <!-- Formulário de Comentário -->
        <CommentForm 
          @comentario-adicionado="onComentarioAdicionado"
          class="mb-6"
        />
      </div>
    </div>

    <!-- Seção de Comentários (Largura Total) -->
    <div class="comments-section mt-12">
      <CommentList 
        @comentario-removido="onComentarioRemovido"
        @filtro-alterado="onFiltroAlterado"
      />
    </div>

    <!-- Botão Scroll to Top -->
    <button
      v-show="showScrollTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 bg-primary-500 text-white p-3 rounded-full shadow-lg hover:bg-primary-600 transition-all duration-200 z-50"
      title="Voltar ao topo"
    >
      ⬆️
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCommentStore } from '@/store/commentStore'
import { useSentimentAnalysis } from '@/composables/useSentimentAnalysis'
import ProductCard from '@/components/ProductCard.vue'
import CommentForm from '@/components/CommentForm.vue'
import CommentList from '@/components/CommentList.vue'

// Stores e Composables
const commentStore = useCommentStore()
const { isConfigured: isGoogleAIConfigured } = useSentimentAnalysis()

// Dados do produto (normalmente viriam de uma API ou props)
const produto = ref({
  id: '1',
  nome: 'Smartphone Galaxy Pro Max',
  marca: 'TechBrand',
  categoria: 'Eletrônicos',
  preco: 1599.99,
  precoOriginal: 1899.99,
  avaliacao: 4.2,
  totalAvaliacoes: 128,
  descricao: 'Um smartphone premium com câmera profissional de 108MP, tela AMOLED de 6.7", processador de última geração e bateria de longa duração. Design elegante e performance excepcional para usuários exigentes.',
  especificacoes: {
    tela: '6.7" AMOLED 120Hz',
    processador: 'Snapdragon 8 Gen 2',
    memoria: '12GB RAM',
    armazenamento: '256GB + microSD',
    camera: '108MP + 12MP + 5MP',
    bateria: '5000mAh com carregamento rápido',
    sistema: 'Android 14',
    conectividade: '5G, Wi-Fi 6E, Bluetooth 5.3',
    resistencia: 'IP68'
  },
  estoque: 23,
  sku: 'SGPM-256-BLK',
  imagem: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop'
})

// Estados computados
const totalComentarios = computed(() => commentStore.totalComentarios)
const estatisticas = computed(() => commentStore.estatisticasSentimento)

const notaGeral = computed(() => {
  if (totalComentarios.value === 0) return 0
  
  const { positivo, negativo, neutro, total } = estatisticas.value
  
  // Cálculo baseado nos sentimentos (positivo = 5, neutro = 3, negativo = 1)
  const pontuacaoTotal = (positivo * 5) + (neutro * 3) + (negativo * 1)
  const nota = pontuacaoTotal / total
  
  return Math.round(nota * 10) / 10 // Arredondar para 1 casa decimal
})

const notaGeralClass = computed(() => {
  if (notaGeral.value >= 4.5) return 'text-success-600'
  if (notaGeral.value >= 3.5) return 'text-warning-600'
  return 'text-danger-600'
})

// Estado para scroll
const showScrollTop = ref(false)

// Event handlers
function onComentarioAdicionado(comentario) {
  console.log('Novo comentário adicionado:', comentario)
  // Pode adicionar lógica adicional aqui, como notificações
}

function onComentarioRemovido(comentarioId) {
  console.log('Comentário removido:', comentarioId)
}

function onFiltroAlterado(filtro) {
  console.log('Filtro alterado para:', filtro)
}

// Scroll handlers
function handleScroll() {
  showScrollTop.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Definir título da página
  document.title = `${produto.value.nome} - Análise de Sentimentos | Build With A.I.`
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.product-view {
  @apply animate-fade-in;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Transições suaves para elementos dinâmicos */
.comments-section {
  @apply transition-all duration-300;
}
</style> 