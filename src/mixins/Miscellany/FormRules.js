export default {
    data() {
        return {
            rules: {
                requiredInput: [
                    v => !!v || this.$t('forms.inputRequired')
                ],
                email: [
                    v => !!v || this.$t('forms.emailIsRequired'),
                    v => /.+@.+\..+/.test(v) || this.$t('forms.invalidEmail'),
                ],
                minLength8:[
                    v => v.length > 7 || this.$t('forms.minLength8'),
                ],
                userName:[
                    v => /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(v) || this.$t('forms.userNameInformation'),
                ],
                tableColumns:[
                    v => /^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(v) || this.$t('settings.columnNameInformation'),
                ],
                tableName:[
                    v => /^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(v) || this.$t('settings.tableNameInformationInput'),
                ]
            }
        }
    }
}