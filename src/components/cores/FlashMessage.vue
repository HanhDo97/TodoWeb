<script setup>
import { computed, onUpdated, ref } from 'vue';
import { useFlashMessage } from '@/stores/FlassMessage';
import { storeToRefs } from 'pinia';

const flashMessage = useFlashMessage();
const { messages } = storeToRefs(flashMessage);
const isHoveringMap = ref(new Map());

onUpdated(() => {
    setTimeout(() => {
        let flashEls = document.getElementsByName('flash-wrapper');

        flashEls.forEach((el, index) => {
            if (!el.classList.contains('animate-to-top')) {
                el.classList.add('animate-to-top');
                let bar = el.querySelector('.round-time-bar');
                let timeBar = el.querySelector('.round-time-bar div');

                // set Message
                let timeout = el.querySelector('.timeout').textContent;
                let type = el.querySelector('.type').textContent;
                console.log(timeout);
                bar.style.setProperty('--duration', timeout);
                bar.setAttribute('data-color', type == 'error' ? 'red' : '#25b065');


                // Initialize hover state
                isHoveringMap.value.set(el, false);

                // Add event listeners to handle hovering
                el.addEventListener('mouseenter', () => {
                    isHoveringMap.value.set(el, true);
                    timeBar.style.animationPlayState = 'paused';
                });
                el.addEventListener('mouseleave', () => {
                    isHoveringMap.value.set(el, false);
                    timeBar.style.animationPlayState = 'running';
                });

                var countDown = setInterval(() => {
                    if (!isHoveringMap.value.get(el)) {
                        timeout--;
                    }
                    if (timeout <= 0 && !isHoveringMap.value.get(el)) {
                        el.style.display = 'none';
                        clearInterval(countDown);

                        // If all elements were hidden then reset the message bag
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
});

</script>

<template>
    <div v-for="(message, index) in messages" :key="index" name="flash-wrapper" class="flash-wrapper"
        :style="{ bottom: message.bottom + 'px' }">
        <div class="content">
            <div class="timeout" style="display: none;">{{ message.timeout }}</div>
            <div class="type" style="display: none;">{{ message.type }}</div>
            <div class="text">
                <div v-if="message.isLoading && message.type === 'loading'" class="loader">
                </div>
                <div v-else-if="message.isLoading && message.type === 'error'" style="color: brown;">
                    <font-awesome-icon icon="fa-solid fa-circle-xmark" />
                </div>
                <div v-else-if="message.isLoading && message.type === 'success'" style="color: aquamarine;">
                    <font-awesome-icon icon="fa-solid fa-circle-check" />
                </div>
                <div v-else class=""></div>
                <p>{{ message.message }}</p>
            </div>
        </div>
        <div class="round-time-bar" data-style="smooth">
            <div></div>
        </div>
    </div>
</template>

<style scoped>
.round-time-bar {
    margin-top: 1rem;
    overflow: hidden;
}

.round-time-bar div {
    height: 5px;
    transform-origin: left center;
    /* background: #25b065; */
}

.round-time-bar[data-color="red"] div {
    background: red;
}

.round-time-bar[data-color="#25b065"] div {
    background: #25b065;
}

.round-time-bar[data-style="smooth"] div {
    animation: roundtime calc(var(--duration) * 1s) linear forwards;
}

@keyframes roundtime {
    to {
        /* More performant than `width` */
        transform: scaleX(0);
    }
}

.loader {
    width: 25px;
    padding: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #25b065;
    --_m:
        conic-gradient(#0000 10%, #000),
        linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 1s infinite linear;
}

@keyframes l3 {
    to {
        transform: rotate(1turn)
    }
}

.border {
    margin-top: 10px;
    height: 5px;
    width: 100%;
}

.text {
    font-size: 16px;
    color: rgb(255, 255, 255);
    display: flex;
    gap: 1rem;
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
