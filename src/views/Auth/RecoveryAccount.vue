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
                {{$t('auth.recoveryAccountInformation')}}
              </p>
              <div class="mt-10 mb-3">
                <v-text-field
                  name="email"
                  :label="$t('auth.email')"
                  id="email"
                  type="email"
                  placeholder="jhondoe@domain.com"
                  outlined
                ></v-text-field>
              </div>
              <div class="text-center">
                <v-btn color="primary">{{$t('auth.recoveryAccount')}}</v-btn>
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