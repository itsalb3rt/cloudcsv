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
              <v-btn color="primary" to="/auth/register" text class="float-right">{{$t('auth.register')}}</v-btn>
              <h1 class="text-center">{{$t('auth.login')}}</h1>
              <div class="mt-10 mb-3">
                <v-text-field
                  name="userName"
                  :label="$t('auth.userName')"
                  id="userName"
                  type="text"
                  placeholder="jhondoe"
                  outlined
                ></v-text-field>
                <v-text-field
                  name="password"
                  :label="$t('auth.password')"
                  id="password"
                  type="password"
                  placeholder="*********"
                  outlined
                ></v-text-field>
              </div>
              <div class="text-center">
                <v-btn color="primary">{{$t('auth.login')}}</v-btn>
              </div>
              <div class="text-center mt-3 mb-3">
                <router-link to="/auth/recovery-account">{{$t('auth.forgotPassword')}}</router-link>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { getAllUsers, getUser } from '@/api/Users.api';
export default {
  mounted() {
    getAllUsers().then(response=>{
      console.log(response.data)
    })
  },
  data() {
    return {
      materialImage: require("@/assets/images/MaterialData.png")
    };
  }
};
</script>