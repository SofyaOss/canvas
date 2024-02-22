<template>
    <div v-if="show" class="modal-shadow" @click.self="closeModal">
        <div class="modal">
            <div class="modal-close" @click="closeModal">&#10006;</div>
            <slot name="title">
                <h3 class="modal-title">Заголовок</h3>
            </slot>
            <slot name="body">
                <form @submit.prevent="submit" class="modal-content">
            <div class="wrapper">
                <label for="file_input">Файл:</label>
                <input type="file" id="file_input" ref="fileInput" @change="fileInput">
            </div>
            <div class="wrapper">
                <label for="urlInput">Или url:</label>
                <input type="text" id="urlInput" v-model="imgUrl">
            </div>
            
            <button type="submit">Продолжить</button>
        </form>
            </slot>
            <slot name="footer">
                <div class="modal-footer">
                    <button class="modal-footer__button" @click="closeModal">
                        Ок
                    </button>
                </div>
            </slot>
        </div>
    </div>
</template>
 
<script>
    export default {
        name: "ModalWindow",
        data: function () {
            return {
                show: false
            }
        },
        methods: {
            closeModal: function () {
                this.show = false
            },
            fileInput(event) {
                this.file = event.target.files[0];
            },
            submit() {
                if (this.imgUrl.trim() !== '') {
                    localStorage.setItem("uploaded_file", this.imgUrl);
                    this.navigate();
                } else if (this.file !== null) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                    localStorage.setItem("uploaded_file", e.target.result);
                        this.navigate();
                    };
                    reader.readAsDataURL(this.file);
                } else {
                    alert('Изображение не выбрано');
                }
            },
            navigate() {
                this.$router.push('/image');
            }
        }
    }
</script>
 
<style scoped>
    .modal-shadow {
        position: absolute;
        top: 0;
        left: 0;
        min-height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.39);
    }
 
    .modal {
        background: #fff;
        border-radius: 8px;
        padding: 15px;
        min-width: 420px;
        max-width: 480px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
        .modal-close {
            border-radius: 50%;
            color: #fff;
            background: #2a4cc7;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 7px;
            right: 7px;
            width: 30px;
            height: 30px;
            cursor: pointer;
        }
 
        .modal-title {
            color: #0971c7;
        }
 
        .moda-content {
            margin-bottom: 20px
        }
 
        .modal-footer__button {
                background-color: #0971c7;
                color: #fff;
                border: none;
                text-align: center;
                padding: 8px;
                font-size: 17px;
                font-weight: 500;
                border-radius: 8px;
                min-width: 150px;
            }
</style>