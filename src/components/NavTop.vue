<template>
    <nav>
        <div class="nav-left">
            <button>
                <font-awesome-icon icon="fa-solid fa-bars" />
            </button>
            <button>
                <span class="chart-icon"><font-awesome-icon icon="fa-solid fa-chart-simple" /></span>
                ToDoApp</button>
            <button>Workspace <span>
                    <font-awesome-icon icon="fa-solid fa-chevron-down" />
                </span></button>
            <button>Recent <span>
                    <font-awesome-icon icon="fa-solid fa-chevron-down" />
                </span></button>
            <button>More <span>
                    <font-awesome-icon icon="fa-solid fa-chevron-down" />
                </span></button>
            <button><font-awesome-icon icon="fa-solid fa-plus" /></button>
        </div>
        <div class="nav-right">
            <button>
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </button>
            <button><font-awesome-icon icon="fa-solid fa-bell" /></button>
            <button><font-awesome-icon icon="fa-solid fa-user" /></button>
        </div>
    </nav>
</template>
<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    padding: 5px;
}

nav button span {
    font-size: 12px;
}

nav button:hover .chart-icon {
    color: white;
}

nav button {
    color: var(--ds-text-subtle);
    font-weight: 600;
    background-color: transparent;
    border: none;
    font-size: 16px;
    padding: 10px;
    height:45px;
    min-width: 45px;
}

nav button:hover {
    cursor: pointer;
    background-color: var(--header-button-hovered);
    border-radius: 5px;
}

</style>