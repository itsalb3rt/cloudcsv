<template>
  <div>
    <p class="font-weight-bold">{{$t('settings.userManager')}}</p>
    <p>{{$t('settings.userManagerInformation')}}</p>
    <v-btn to="/settings/users" outlined color="primary">
      <v-icon class="mr-2">fa-user</v-icon>
      {{$t('settings.userManager')}}
    </v-btn>
    <v-switch
      color="primary"
      disabled
      :label="$t('settings.permitNewUserRegister')"
      v-model="permitNewUserRegister"
    ></v-switch>
  </div>
</template>
<script>
export default {
  data() {
    return {
      permitNewUserRegister: true
    };
  }
};
</script>