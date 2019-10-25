<template>
    <div>
        
    </div>
</template>
<script>
export default {
    mounted(){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        this.$store.commit('auth/SET_LOGGED',false);
        this.$store.commit('auth/SET_USER',[]);
        this.$router.push('/auth/login');
    }
}
</script>