<script setup>
const emit = defineEmits(["closeModal"]);
</script>

<template>
  <div
    class="
      relative
      w-11/12
      max-w-2xl
      m-auto
      p-8
      bg-gradient-to-br
      from-zinc-500
      to-zinc-400
      text-lg text-black
    "
  >
    <button
      @click="$emit('closeModal')"
      class="
        sticky
        top-2
        float-right
        bg-black
        px-2
        rounded
        text-amber-300
        font-bold
        hover:ring-1 hover:ring-amber-300
      "
    >
      close
    </button>
    <h2 class="font-bold text-xl">Current Leaderboard</h2>
    <p class="my-4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Elit scelerisque
      mauris pellentesque pulvinar pellentesque habitant morbi tristique. Urna
      condimentum mattis pellentesque id nibh tortor id. Faucibus nisl tincidunt
      eget nullam non nisi. Dignissim enim sit amet venenatis urna cursus eget
      nunc scelerisque. Sed libero enim sed faucibus turpis. Est ante in nibh
      mauris cursus. Augue mauris augue neque gravida in fermentum. Pulvinar
      neque laoreet suspendisse interdum consectetur libero id faucibus. Orci eu
      lobortis elementum nibh tellus molestie nunc non blandit. Massa id neque
      aliquam vestibulum. Leo integer malesuada nunc vel. Augue interdum velit
      euismod in pellentesque massa placerat duis ultricies. Nulla porttitor
      massa id neque aliquam. Elementum eu facilisis sed odio morbi. Mauris
      rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar
      pellentesque. Eget sit amet tellus cras adipiscing enim.
    </p>

    <p class="my-4">
      Vel pretium lectus quam id. Aliquet porttitor lacus luctus accumsan tortor
      posuere ac ut. Sed faucibus turpis in eu mi bibendum neque egestas. Massa
      tincidunt dui ut ornare lectus sit amet. Dignissim diam quis enim
      lobortis. Suscipit adipiscing bibendum est ultricies integer. Mattis
      pellentesque id nibh tortor. Cursus euismod quis viverra nibh. In
      fermentum et sollicitudin ac orci phasellus. Neque gravida in fermentum et
      sollicitudin. Elit ut aliquam purus sit amet luctus venenatis. Adipiscing
      diam donec adipiscing tristique risus nec feugiat in fermentum. Eu non
      diam phasellus vestibulum lorem. Libero nunc consequat interdum varius
      sit. Tempor orci dapibus ultrices in iaculis nunc sed augue. Id diam vel
      quam elementum pulvinar etiam non quam lacus. Justo donec enim diam
      vulputate ut pharetra sit amet. Odio euismod lacinia at quis risus sed
      vulputate odio ut.
    </p>

    <p class="my-4">
      Adipiscing elit ut aliquam purus. Felis eget nunc lobortis mattis aliquam.
      Enim diam vulputate ut pharetra sit amet. Ipsum dolor sit amet consectetur
      adipiscing elit pellentesque habitant. Semper auctor neque vitae tempus
      quam. Commodo ullamcorper a lacus vestibulum sed arcu non odio euismod.
      Eget magna fermentum iaculis eu non diam phasellus vestibulum. Integer
      vitae justo eget magna fermentum iaculis eu non diam. Quisque egestas diam
      in arcu cursus euismod quis. Ornare suspendisse sed nisi lacus sed viverra
      tellus.
    </p>

    <p class="my-4">
      Id volutpat lacus laoreet non curabitur gravida arcu ac. Vel orci porta
      non pulvinar neque laoreet suspendisse. Nibh nisl condimentum id venenatis
      a condimentum vitae sapien. Et magnis dis parturient montes. Gravida quis
      blandit turpis cursus in hac habitasse platea dictumst. Erat pellentesque
      adipiscing commodo elit at imperdiet dui accumsan sit. Metus dictum at
      tempor commodo. Faucibus scelerisque eleifend donec pretium vulputate
      sapien nec sagittis aliquam. Ultrices sagittis orci a scelerisque purus
      semper eget duis. Nec ullamcorper sit amet risus nullam eget felis eget
      nunc. Quis commodo odio aenean sed adipiscing diam. Penatibus et magnis
      dis parturient montes nascetur. Aenean euismod elementum nisi quis
      eleifend quam adipiscing vitae. Mauris sit amet massa vitae. Bibendum est
      ultricies integer quis auctor. Ut tellus elementum sagittis vitae. In
      fermentum posuere urna nec. Congue eu consequat ac felis donec. Pretium
      fusce id velit ut tortor pretium.
    </p>

    <p class="my-4">
      Velit egestas dui id ornare arcu odio ut sem nulla. Odio eu feugiat
      pretium nibh. Et netus et malesuada fames ac turpis egestas. Eget felis
      eget nunc lobortis mattis. Vel orci porta non pulvinar neque laoreet.
      Mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Sem
      viverra aliquet eget sit amet tellus cras. Proin nibh nisl condimentum id
      venenatis a condimentum. Orci sagittis eu volutpat odio facilisis mauris
      sit. Ultricies mi quis hendrerit dolor. Egestas egestas fringilla
      phasellus faucibus. Non diam phasellus vestibulum lorem sed risus
      ultricies. Vel elit scelerisque mauris pellentesque pulvinar pellentesque
      habitant.
    </p>
  </div>
</template>