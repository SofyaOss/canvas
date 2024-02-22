<template>
    <div class="wrapper">
        <div class="canvas">
            <canvas ref="canvas" width="500" height="500" @mousemove="move" @click="click"></canvas>
        </div>
        <form>
            <button сlass="show-modal-button" @click="navigate">Загрузить изображение</button>
            <modal-window ref="modal"></modal-window>
        </form>
        <div class="info-panel">
            <div class="top-panel">
                <p>Цвет: {{ pixelColor }}</p>
                <p>Координаты: {{ pixelCoords }}</p>
            </div>
            <div class="bottom-panel">
                <p>Выбранный пиксель:</p>
                <p>Цвет: {{ selectedColor }}</p>
                <div class="color" ref="color"></div>
                <p>Координаты: {{ selectedCoords }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import ModalWindow from '../ModalPage.vue'

export default {
    data() {
        return {
            imgWidth: 0,
            imgHeight: 0,
            pixelColor: "",
            pixelCoords: "",
            selectedColor: "",
            selectedCoords: "",
        };
    },
    components: {
        ModalWindow
    },
    methods: {
        showModal: function () {
                this.$refs.modal.show = true
            },
        move(event) {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext("2d");
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const pxlData = ctx.getImageData(x, y, 1, 1).data;
            this.pixelColor = `rgb(${pxlData[0]}, ${pxlData[1]}, ${pxlData[2]})`;
            this.pixelCoords = `(${x}, ${y})`;
        },
        click(event) {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext("2d");
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const pxlData = ctx.getImageData(x, y, 1, 1).data;
            this.selectedColor = `rgb(${pxlData[0]}, ${pxlData[1]}, ${pxlData[2]})`;
            this.selectedCoords = `(${x}, ${y})`;
            const color = this.$refs.color; 
            color.style.backgroundColor = `rgb(${pxlData[0]}, ${pxlData[1]}, ${pxlData[2]})`;
        },
        fileInput(event) {
            this.file = event.target.files[0];
        },
        navigate() {
            this.$router.push('/');
        },
    },
    mounted() {
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            this.imgWidth = image.width;
            this.imgHeight = image.height;
        };
        const imgData = localStorage.getItem("uploaded_file");
        if (imgData) {
            image.src = imgData;
        } else {
            alert('Изображение не найдено');
            this.$router.push('/');
        }
    },
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
.wrapper {
    /* width: 100vw; */
    /* display: grid;
    grid-template-columns: 1fr 200px; */
    /* max-width: 1vw; */
    /* width: 100%; */
    max-width: 100vw;
    width: 100%;
    display: flex;
}

.canvas {
    height: 100vh;
    overflow: scroll;
    background-color: white;
    max-width: 85vw;
}

form {
    max-width: 150px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 30px;
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

.info-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    max-width: 100vw;
    width: 100%;
    /* max-width: 300px; */
    /* max-width: 25vw; */
    height: 50px;
    /* min-height: 100vh; */
    background-color: #f0f0f0;
    padding: 10px;
    display: flex;
    /* flex-direction: column; */
}
.top-panel {
    display: flex;
    /* flex-direction: column; */
    /* margin-bottom: 20px; */
    justify-content: center;
    align-items: center;
}
.bottom-panel {
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
}
.color {
    width: 20px;
    height: 20px;
    border: 3px solid black;
}
p {
    margin-left: 10px;
}
</style>