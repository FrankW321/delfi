<template>
  <div class="modal-mask" v-if="isVisible">
    <div class="modal-wrapper">
      <div class="modal-container">
        <button class="close-button" @click="closeModal">X</button>
        <div class="modal-header">
          <div class="progress-number">3/4</div>
          <div class="progress-bar">
            <div
              class="progress-step"
              v-for="index in 4"
              :key="index"
              :class="{ filled: index <= 3 }"
            ></div>
          </div>
          <h2>
            {{ $t('weValue') }}
          </h2>
        </div>
        <div class="modal-body">
          <h2>
            {{ $t('weValueMessage') }}
          </h2>
          <div class="poster">
            <div class="overlay">
              {{ $t('onlyNow') }}<br />
              <span class="offer-percent">-{{ calcPercentage }}%</span>
            </div>
            <div class="content">
              <div class="title">
                <div class="circle"></div>
                <img src="../../assets/icons/king.png" alt="King Icon" />
                <span class="bold">{{ $t('delfi') }}</span> <span> {{ $t('offerPackage') }}</span>
              </div>
              <div class="price">
                <span class="original-price">{{ normalPrice }} </span>
                <span class="discount-price"> {{ offerPrice }} €</span>
              </div>
              <div class="details">
                <span>{{ termName }} {{ $t('next') }} </span>
                <span class="bold"> {{ offerPeriod }}</span>
                <span> {{ $t('onlyInMonth') }} </span>
                <span class="bold"> {{ offerPrice }} € {{ $t('inMonth') }},</span>
                <br />
                {{ $t('normalPrice') }} <span> {{ normalPrice }} €</span> {{ $t('inMonth') }}.
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="continue-button" @click="continueSubscription">{{ $t('wish') }}</button>
          <button class="cancel-button" @click="cancelSubscription">
            {{ $t('cancelSubscription') }}
          </button>
          <div class="help-container">
            <p class="footer-text" @click="redirectSupport">
              {{ $t('needHelpMessage') }} <b>{{ $t('customerSupport') }}</b
              ><span class="blue">></span>
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
import { AppConfig } from '../../config/config'
import { redirect } from '../../utils/utils'

const store = useStore()

const isVisible = computed(() => store.state.isVisible)
const termName = computed(() => store.state.userData?.userInfo?.termName || 'Delfi kogupakett')
const offerPrice = computed(() => store.state.userData?.offer?.price || '5,99')
const offerPeriod = computed(() => store.state.userData?.offer?.billingPeriod || '6')
const normalPrice = computed(() => store.state.userData?.offer?.normalPrice || '10,99')
const calcPercentage = Math.floor((offerPrice.value / normalPrice.value) * 100)

const continueSubscription = () => {
  store.commit('setActiveStep', 'win')
}

const cancelSubscription = () => {
  store.commit('setActiveStep', 'loss')
}

const closeModal = () => {
  store.commit('setIsVisible', false)
  store.commit('resetState')
}

const redirectSupport = () => {
  redirect(AppConfig.supportUrl)
}
</script>
