<template>
  <div class="modal-mask" v-show="isDialogOpen">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-body">
          <slot name="body"> </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="closeDialog">
              {{ textBtnClose }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";

@Component({})
export default class Dialog extends Vue {
  @PropSync("open")
  public isDialogOpen!: boolean;
  @Prop({ type: String, default: "Close" })
  textBtnClose?: string;

  closeDialog(): void {
    this.isDialogOpen = false;
  }
}
</script>

<style scoped lang="scss">
@import "styles.css";
</style>
