<template>
  <div class="modal-mask" v-if="isVisible">
    <div class="modal-wrapper">
      <div class="modal-container">
        <button class="close-button" @click="continueSubscription">X</button>
        <div class="modal-header">
          <div v-if="daysSubscribed > 0" class="progress-number">1/4</div>
          <div v-if="daysSubscribed > 0" class="progress-bar">
            <div
              class="progress-step"
              v-for="index in 4"
              :key="index"
              :class="{ filled: index <= 1 }"
            ></div>
          </div>
          <h2 v-if="daysSubscribed > 0">Kas oled kindel, et soovid tellimust lõpetada?</h2>
        </div>
        <div class="modal-body">
          <h2 class="start-page-heading" v-if="daysSubscribed > 0">
            Oled meiega olnud juba <b class="bold-blue">{{ daysSubscribed }}</b> päeva, ärme lahe
            veel lahku
          </h2>
          <h1 class="" v-else>Tere tulemast Delfisse!</h1>
          <h2 class="start-page-heading" v-if="hasSharedAccounts">
            Sul on jagatud lugemisõiguseid, arvesta ka nendega
          </h2>
          <h2 class="start-page-heading">
            Ära jää ilma maailma tippsündmustest, mis mõjutavad kogu maailma. Käesolev aasta toob
            teiste seas USA presidendivalimised, Olümpiamängud ning ühe eriti ägeda salaprojekti,
            mida tasub oodata.
          </h2>
        </div>
        <div class="modal-footer">
          <button class="continue-button" @click="continueSubscription" v-if="hasSharedAccounts">
            Jätkan tellimusega
          </button>

          <button v-if="daysSubscribed" class="cancel-button" @click="cancelSubscription">
            Edasi tühistama
          </button>
          <button v-if="!daysSubscribed" class="continue-button" @click="startSubscription">
            Telli delfi
          </button>
          <div class="help-container">
            <p class="footer-text" @click="redirectSupport">
              Vajad abi? <b>Meie klienditugi aitab </b><span class="blue">></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const isVisible = computed(() => store.state.isVisible)
const hasSharedAccounts = computed(() => store.state.userData?.userInfo?.hasSharedAccounts || false)
const daysSubscribed = computed(() => {
  const userData = store.state.userData
  return userData?.userInfo?.daysSubscribed || 0
})

const continueSubscription = () => {
  store.commit('setIsVisible', false)
  store.commit('resetState')
}

const cancelSubscription = () => {
  store.commit('setActiveStep', 'reason')
}

const startSubscription = () => {
  store.commit('setIsVisible', false)
}

const redirectSupport = () => {
  window.location.href = 'https://delfimeedia.ee/kontakt/'
}
</script>
