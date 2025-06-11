<template>
  <div class="card">
    <!-- Imagem do Produto -->
    <div class="relative">
      <img 
        :src="produto.imagem" 
        :alt="produto.nome"
        class="w-full h-64 object-cover"
        @error="handleImageError"
      />
      <div class="absolute top-4 right-4">
        <span class="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {{ produto.categoria }}
        </span>
      </div>
    </div>

    <!-- Informações do Produto -->
    <div class="p-6">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            {{ produto.nome }}
          </h2>
          <p class="text-gray-600 text-sm mb-3">
            {{ produto.marca }}
          </p>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold text-primary-600">
            {{ formatarPreco(produto.preco) }}
          </div>
          <div v-if="produto.precoOriginal" class="text-sm text-gray-500 line-through">
            {{ formatarPreco(produto.precoOriginal) }}
          </div>
        </div>
      </div>

      <!-- Avaliação -->
      <div class="flex items-center mb-4">
        <div class="flex items-center">
          <span v-for="estrela in 5" :key="estrela" class="text-lg">
            {{ estrela <= produto.avaliacao ? '⭐' : '☆' }}
          </span>
        </div>
        <span class="ml-2 text-sm text-gray-600">
          ({{ produto.totalAvaliacoes }} avaliações)
        </span>
      </div>

      <!-- Descrição -->
      <p class="text-gray-700 mb-6 leading-relaxed">
        {{ produto.descricao }}
      </p>

      <!-- Especificações -->
      <div class="border-t border-gray-200 pt-4 mb-6">
        <h3 class="font-semibold text-gray-900 mb-3">Especificações:</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div v-for="(valor, chave) in produto.especificacoes" :key="chave" class="flex">
            <span class="font-medium text-gray-600 capitalize w-32">{{ chave }}:</span>
            <span class="text-gray-900">{{ valor }}</span>
          </div>
        </div>
      </div>

      <!-- Ações -->
      <div class="flex flex-col sm:flex-row gap-3">
        <button class="btn-primary flex-1 flex items-center justify-center">
          Adicionar ao Carrinho
        </button>
        <button class="btn-secondary flex items-center justify-center">
          Favoritar
        </button>
      </div>

      <!-- Status -->
      <div class="mt-4 flex items-center justify-between text-sm">
        <span class="flex items-center">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          {{ produto.estoque > 0 ? `${produto.estoque} em estoque` : 'Fora de estoque' }}
        </span>
        <span class="text-gray-500">
          SKU: {{ produto.sku }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  produto: {
    type: Object,
    required: true,
    default: () => ({
      id: '1',
      nome: 'Smartphone Galaxy Pro',
      marca: 'TechBrand',
      categoria: 'Eletrônicos',
      preco: 1299.99,
      precoOriginal: null,
      avaliacao: 4.5,
      totalAvaliacoes: 128,
      descricao: 'Um smartphone moderno com câmera de alta qualidade, tela AMOLED e processador de última geração. Ideal para quem busca performance e tecnologia.',
      especificacoes: {
        tela: '6.7" AMOLED',
        processador: 'Snapdragon 888',
        memoria: '8GB RAM',
        armazenamento: '256GB',
        camera: '108MP + 12MP + 5MP',
        bateria: '4500mAh',
        sistema: 'Android 13'
      },
      estoque: 15,
      sku: 'SGP-256-BLK',
      imagem: '/api/placeholder/400/300'
    })
  }
})

// Métodos
function formatarPreco(preco) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}

function handleImageError(event) {
  // Fallback para uma imagem placeholder em caso de erro
  event.target.src = 'https://via.placeholder.com/400x300/e5e7eb/6b7280?text=Produto'
}
</script> 