<template>
    <div>
        <form @submit.prevent="submit">
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgUrl: '',
            file: null
        };
    },
    methods: {
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
};
</script>

<style scoped>
    form {
        max-width: 500px;
        width: 100%;
        min-height: 400px;
        margin: 100px auto;
        border: 2px solid black;
        border-radius: 17px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .wrapper {
        max-width: 300px;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    label {
        margin-bottom: 10px;
    }
    input {
        width: 150px;
        height: 30px;
        margin-bottom: 10px;
    }
    button {
        cursor: pointer;
        margin-top: 50px;
        width: 150px;
        height: 50px;
        border-width: 3px;
        border-color: rgb(73, 152, 255);
        background-color: rgb(73, 152, 255);
    }
    button:hover {
        transition: .3s;
        background-color: white;
    }
</style>