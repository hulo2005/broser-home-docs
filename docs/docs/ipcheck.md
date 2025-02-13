<script setup>
import { defineAsyncComponent } from 'vue';

const TeamManage = defineAsyncComponent(() => import('../components/docManage.vue'));
</script>

<TeamManage docId="5" />