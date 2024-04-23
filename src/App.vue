<script setup>
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <!-- <RouterLink to="/">Home</RouterLink> -->
        <!-- <RouterLink to="/about">About</RouterLink> -->
        <div class="nav-left">
          <button>
            <font-awesome-icon icon="fa-solid fa-bars" />
          </button>
          <button>
            <span><font-awesome-icon icon="fa-solid fa-chart-simple" /></span>
            ToDoApp</button>
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
    </div>
  </header>

  <img src="./img/loading.gif" alt="Loading" />

</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
}

nav button span {
  font-size: 12px;
}

nav button {
  color: var(--ds-text-subtle);
  font-weight: 600;
  background-color: transparent;
  border: none;
  font-size: 16px;
}

.nav-left button:hover {
  cursor: pointer;
  background-color: var(--header-button-hovered);
  border-radius: 5px;
}

.nav-right button:hover {
  cursor: pointer;
  background-color: var(--header-button-hovered);
  border-radius: 50%;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
