<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <img alt="Vue logo" src="/logo.png">
    <button @click="caughtError">装饰器捕获上报</button>
    <button @click="reportInfo">主动捕获上报</button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Hibug from 'hibug'
import { reportInfo } from 'hibug'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted() {
    Hibug.init({
      report(errorList) {
       console.log(errorList);
      }
    })
  },
  methods: {
    reportInfo() {
      reportInfo('Hello World');
    }
  }
}
</script>
