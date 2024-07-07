<script setup lang="ts">
import RightArrowIcon from "../icons/RightArrowIcon.vue";
import {ref} from "vue";
import DownArrowIcon from "../icons/DownArrowIcon.vue";
import CalendarIcon from "../icons/CalendarIcon.vue";
import {IData} from "../types";
import UserIcon from "../icons/UserIcon.vue";
import MailIcon from "../icons/MailIcon.vue";
import PhoneIcon from "../icons/PhoneIcon.vue";

const {deal} = defineProps<{ deal: IData }>()
const isOpen = ref(false);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <tr class="bg-white border-b">
    <td @click="toggleOpen" class="px-6 py-4 cursor-pointer w-6">
      <component :is="isOpen ? DownArrowIcon : RightArrowIcon"/>
    </td>
    <td class="px-6 py-4">
      {{ deal.name }}
    </td>
    <td class="px-6 py-4">
      {{ deal.price }}
    </td>
    <td class="px-2 py-2">
      <div class="p-2 rounded-lg text-gray-600 w-fit" :style="{background: deal.status.color}">
        {{ deal.status.name }}
      </div>
    </td>
    <td class="px-6 py-4">
      <div class="flex gap-2 items-center">
        <UserIcon />
        {{ deal.user.name }}
      </div>
    </td>
    <td class="px-6 py-4 flex gap-2 items-center">
      <CalendarIcon/>
      12.03.3030
    </td>
  </tr>
  <tr v-if="isOpen" class="border-b">
    <td colspan="6" class="px-6 py-4">
      <div class="flex flex-col gap-4">
      <a :href="`mailto:${deal.contact.email}`" class="flex gap-2 items-center">
        <MailIcon />
       {{deal.contact.email}}
      </a>

      <a :href="`telephone:${deal.contact.phone}`" class="flex gap-2 items-center">
        <PhoneIcon />
        {{deal.contact.phone}}
      </a>
      </div>
    </td>
  </tr>
</template>

<style scoped>

</style>