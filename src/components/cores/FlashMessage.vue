<script setup>
import { onUpdated, ref } from 'vue';
import { useFlashMessage } from '@/stores/FlassMessage';
import { storeToRefs } from 'pinia';

const flashMessage = useFlashMessage();
const { messages } = storeToRefs(flashMessage);

onUpdated(() => {
    setTimeout(() => {
        let flashEls = document.getElementsByName('flash-wrapper');

        flashEls.forEach((el, index) => {
            if (!el.classList.contains('animate-to-top')) {
                el.classList.add('animate-to-top');

                let timeout = flashMessage.timeout;

                var countDown = setInterval(() => {
                    timeout--;

                    if (timeout <= 0) {
                        el.style.display = 'none';
                        clearInterval(countDown);

                        // If all element was hiddened then reset message bag
                        if (index == flashEls.length - 1) {
                            flashMessage.resetMessage();
                        }
                    }
                }, 1000)
            } else {
                // calculate position of element
                let translate = (flashEls.length - index - 1) * (-100 - 10)
                el.style.transform = `translateY(${translate}%)`;
            }
        })
    }, 0);
})
</script>

<template>
    <div v-for="(message, index) in messages" :key="index" name="flash-wrapper" class="flash-wrapper"
        :style="{ bottom: message.bottom + 'px' }">
        <div class="content">
            <div class="icon"></div>
            <div class="text">
                <p>{{ message.message }}</p>
            </div>
        </div>
        <div :id="'border' + index" class="border" :style="{
            'background-color': message.type == 'error' ? 'red' : null
        }"></div>
    </div>
</template>

<style scoped>
.border {
    margin-top: 10px;
    width: 100%;
    height: 5px;
    background-color: rgb(60, 255, 0);
}

.text {
    font-size: 16px;
    color: rgb(255, 255, 255);
}

.flash-wrapper {
    position: absolute;
    right: 20px;
    background-color: black;
    width: 350px;
    padding: 10px;
    border-radius: 5px;
    transition: all 0.5s ease;
    bottom: 50px;
    transform: translateY(50%);
}

.animate-to-top {
    transform: translateY(0%);
}

.move-to-top {
    transform: translateY(-110%);
}
</style>
