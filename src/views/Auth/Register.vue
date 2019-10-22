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
              <h1 class="text-center">{{$t('auth.register')}}</h1>
              <div class="mt-10 mb-3">
                <v-text-field
                  name="fullName"
                  :label="$t('auth.fullName')"
                  id="fullName"
                  type="text"
                  placeholder="Jhon Doe Smith"
                  outlined
                ></v-text-field>
                <v-text-field
                  name="email"
                  :label="$t('auth.email')"
                  id="email"
                  type="email"
                  placeholder="jhondoe@domain.com"
                  outlined
                ></v-text-field>
                <v-text-field
                  name="userName"
                  :label="$t('auth.userName')"
                  id="userName"
                  type="text"
                  placeholder="jhondoe"
                  outlined
                ></v-text-field>
                <p>{{$t('auth.autoFillField')}}</p>
                <v-text-field
                  name="password"
                  :label="$t('auth.password')"
                  id="password"
                  type="password"
                  placeholder="*********"
                  append-icon="fa-eye"
                  outlined
                ></v-text-field>
                <v-text-field
                  name="confirmPassword"
                  :label="$t('auth.confirmPassword')"
                  id="confirmPassword"
                  type="password"
                  placeholder="*********"
                  append-icon="fa-eye"
                  outlined
                ></v-text-field>
              </div>
              <div class="text-center">
                <v-btn color="primary">{{$t('auth.register')}}</v-btn>
              </div>
              <div class="text-center mt-3 mb-3">
                <router-link to="/auth/login">{{$t('auth.yourHaveAccount')}}</router-link>
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
  data() {
    return {
      materialImage: require("@/assets/images/MaterialData.png")
    };
  }
};
</script>