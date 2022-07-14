<template>
  <div class="modal-mask" v-show="isDialogOpen">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-body">
          <slot name="body"> </slot>
          {{ data }}
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button
              class="mx-2 modal-default-button inline-block p-2 text-white bg-red-500 shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none"
              :disabled="isDeleting"
              @click="deleteItem"
            >
              Eliminar
            </button>
            <button
              class="mx-2 modal-default-button inline-block p-2"
              @click="closeDialog"
            >
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
import NoteService from "@/services/NoteService";

@Component({})
export default class Dialog extends Vue {
  protected noteService = new NoteService();

  @PropSync("open")
  public isDialogOpen!: boolean;
  @Prop({ type: String, default: "Close" })
  textBtnClose?: string;
  @Prop()
  data: number | null = null;

  public isDeleting = false;

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  onDelete(): void {
    this.isDeleting = false;
    this.closeDialog();
    this.$emit("onDelete");
  }

  deleteItem(): void {
    this.isDeleting = true;
    this.noteService
      .delete(this.data)
      .then(() => {
        this.onDelete();
      })
      .catch()
      .finally(() => {
        this.isDeleting = false;
      });
  }
}
</script>

<style scoped lang="scss">
@import "styles.css";
</style>
