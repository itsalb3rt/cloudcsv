<template>
  <div>
    <v-card style="margin-top:10%">
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-img :src="materialImage" width="100%" height="100%"></v-img>
          </v-col>
          <v-col cols="6">
            <v-form ref="loginForm">
              <h1 class="text-center">{{$t('auth.recoveryAccount')}}</h1>
              <p class="mt-3 mb-3">
                {{$t('auth.newPassword')}}
              </p>
              <div class="mt-10 mb-3">
                <v-text-field
                  name="password"
                  :label="$t('auth.password')"
                  id="password"
                  type="password"
                  placeholder="*********"
                  outlined
                ></v-text-field>
                <v-text-field
                  name="confirmPassword"
                  :label="$t('auth.confirmPassword')"
                  id="confirmPassword"
                  type="password"
                  placeholder="*********"
                  outlined
                ></v-text-field>
              </div>
              <div class="text-center">
                <v-btn color="success">{{$t('auth.recoveryAccount')}}</v-btn>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  mounted() {
    if(this.$route.query.token === undefined){
      this.$router.push('/auth/login');
    }
  },
  data() {
    return {
      materialImage: require("@/assets/images/MaterialData.png")
    };
  }
};
</script>