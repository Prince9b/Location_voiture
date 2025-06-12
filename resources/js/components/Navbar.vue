<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-xl font-bold">
              Location Voiture
            </router-link>
          </div>

          <!-- Navigation Links -->
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link
              to="/"
              class="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500"
            >
              Accueil
            </router-link>
            <router-link
              to="/cars"
              class="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500"
            >
              Voitures
            </router-link>
          </div>
        </div>

        <!-- Auth Navigation -->
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <template v-if="!isAuthenticated">
            <router-link
              to="/login"
              class="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md"
            >
              Connexion
            </router-link>
            <router-link
              to="/register"
              class="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md ml-4"
            >
              Inscription
            </router-link>
          </template>
          
          <template v-else>
            <div class="relative ml-3">
              <div>
                <button
                  @click="toggleDropdown"
                  class="flex items-center text-gray-900 hover:text-gray-600"
                >
                  <span class="mr-2">{{ user.name }}</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div
                v-if="showDropdown"
                class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              >
                <div class="py-1">
                  <router-link
                    to="/profile"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mon Profil
                  </router-link>
                  <a
                    @click="handleLogout"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Déconnexion
                  </a>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden">
          <button
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!showMobileMenu"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="showMobileMenu" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          to="/"
          class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
        >
          Accueil
        </router-link>
        <router-link
          to="/cars"
          class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
        >
          Voitures
        </router-link>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <template v-if="!isAuthenticated">
          <div class="space-y-1">
            <router-link
              to="/login"
              class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Connexion
            </router-link>
            <router-link
              to="/register"
              class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Inscription
            </router-link>
          </div>
        </template>
        <template v-else>
          <div class="space-y-1">
            <router-link
              to="/profile"
              class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Mon Profil
            </router-link>
            <a
              @click="handleLogout"
              class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Déconnexion
            </a>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter()
    const isAuthenticated = ref(false)
    const user = ref(null)
    const showDropdown = ref(false)
    const showMobileMenu = ref(false)

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const response = await axios.get('/api/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          user.value = response.data
          isAuthenticated.value = true
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error)
        isAuthenticated.value = false
        user.value = null
      }
    }

    const handleLogout = async () => {
      try {
        await axios.post('/api/logout')
        localStorage.removeItem('token')
        isAuthenticated.value = false
        user.value = null
        router.push('/login')
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
      }
    }

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value
    }

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }

    onMounted(() => {
      checkAuth()
    })

    return {
      isAuthenticated,
      user,
      showDropdown,
      showMobileMenu,
      handleLogout,
      toggleDropdown,
      toggleMobileMenu
    }
  }
}
</script> 