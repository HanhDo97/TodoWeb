<template>
    <div class="nav-slide-warrper">
        <button class="expand-nav">
            <font-awesome-icon icon="fa-solid fa-chevron-right" />
        </button>
        <div class="user-workspace">
            <div class="image-container">
                <img src="/src/assets/logo.svg" alt="">
            </div>
            <div class="workspace-text">
                <p>Todo Workspace</p>
                <p>Free</p>
            </div>
        </div>
        <ul class="function-workspace">
            <li><a href="">Boards</a></li>
            <li><a href="">Members</a></li>
            <li><a href="">Workpace setting</a></li>
        </ul>
    </div>
</template>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
    line-height: 2rem;
}

li {
    padding-left: 1rem;
    cursor: pointer;
}

li:hover {
    background-color: gray;
}

.image-container {
    width: 35px;
    height: auto;
    margin-right: 1rem;

}

.user-workspace {
    display: flex;
    align-items: center;
    border-bottom: 1px solid gray;
    padding: 5px;
}

.nav-slide-warrper {
    height: 100%;
    width: 100%;
    position: relative;
    /* background-color: blue; */
}

.expand-nav {
    position: absolute;
    right: 10px;
    top: 20px;
    background-color: transparent;
    border: none;
    color: whitesmoke;
    width: 30px;
    height: 30px;
}

.expand-nav:hover {
    background-color: gray;
    cursor: pointer;
    border-radius: 10px;
}

@media (min-width: 700px) {
    .expand-nav {
        color: var(--ds-text-subtle);
        font-weight: 600;
        background-color: black;
        border-radius: 50%;
        border: none;
        font-size: 13px;
        width: 30px;
        height: 30px;
    }

    .expand-nav:hover {
        cursor: pointer;
        background-color: gray;
        border-radius: 50%;
    }
}
</style>