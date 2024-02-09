<template>
  <div>
    <header class="fixed top-0 flex justify-center md:justify-start mx-auto w-full bg-white py-2 shadow-md  lg:py-3 px-5">
      <Logo />
    </header>
  </div>
</template>

<script>
import Logo from './atoms/Logo.vue'
export default{
    components:{Logo}
}
</script>